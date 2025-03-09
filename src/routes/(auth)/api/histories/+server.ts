// src/routes/api/histories/+server.ts
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

// GET handler to fetch all transaction histories
export const GET: RequestHandler = async ({ url }) => {
	const token = url.searchParams.get('Authorization');
	try {
		validateToken(token);
	} catch {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
	const days = Number(url.searchParams.get('days')) || 30;
	try {
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
		const histories = await getHistories(token!, accountId, deviceId, username, password, days);
		return json(histories);
	} catch (error) {
		return json(
			{ error: error instanceof Error ? error.message : 'Unknown error' },
			{ status: 500 }
		);
	}
};
