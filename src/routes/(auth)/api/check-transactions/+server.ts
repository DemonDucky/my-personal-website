// src/routes/api/check-transactions/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import {
	validateEnv,
	handleLogin,
	getHistories,
	getTokenFromPocketBase,
	updateTokenInPocketBase
} from '$lib/tpbank';
import { validateToken } from '$lib/utils';

// Type definitions for input/output
interface CheckInput {
	number: string;
	description: string;
}

interface CheckOutput {
	status: boolean;
	id: string;
}

// POST handler to check transactions
export const POST: RequestHandler = async ({ request }) => {
	const token = request.headers.get('Authorization');
	try {
		validateToken(token);
	} catch {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
	try {
		const body = (await request.json()) as { checks: CheckInput[] };
		const checks = body.checks;

		// Type guard to validate input
		if (!Array.isArray(checks) || checks.length === 0 || !checks.every(isValidCheckInput)) {
			return json({ error: 'Invalid or empty checks array' }, { status: 400 });
		}

		const { username, password, deviceId, accountId } = validateEnv();

		// Fetch token from PocketBase
		const tokenData = await getTokenFromPocketBase(username);
		let token: string | null = tokenData?.token ?? null;
		const expiry: number | null = tokenData?.expiry ?? null;

		// Check if token is expired or will expire in next 5 seconds
		if (!token || (expiry && Date.now() >= expiry - 5000)) {
			const loginResponse = await handleLogin(username, password, deviceId);
			token = loginResponse.access_token;
			await updateTokenInPocketBase(username, token, loginResponse.expires_in);
		}

		// Fetch transaction history
		const histories = await getHistories(token!, accountId, deviceId, username, password);
		const transactions = histories.transactionInfos || [];

		// Match checks against transactions
		const results: CheckOutput[] = checks.map((check) => {
			const amount = parseFloat(check.number).toFixed(2);
			const description = check.description.trim().toLowerCase();

			const match = transactions.find((tx) => {
				const txAmount = parseFloat(tx.amount).toFixed(2);
				const txDescription = tx.description.trim().toLowerCase();
				return txAmount === amount && txDescription.includes(description);
			});

			return {
				status: !!match,
				id: check.description
			};
		});

		return json(results);
	} catch (error) {
		return json(
			{ error: error instanceof Error ? error.message : 'Unknown error' },
			{ status: 500 }
		);
	}
};

// Helper function to validate CheckInput
function isValidCheckInput(input: unknown): input is CheckInput {
	return (
		typeof input === 'object' &&
		input !== null &&
		'number' in input &&
		typeof input.number === 'string' &&
		'description' in input &&
		typeof input.description === 'string'
	);
}
