// src/lib/tpbank.ts
import {
	TPBANK_USERNAME,
	TPBANK_PASSWORD,
	TPBANK_DEVICE_ID,
	TPBANK_ACCOUNT_ID
} from '$env/static/private';
import { initPBSuper } from './pbSuper';

// Common headers for TPBank API requests
const commonHeaders: Record<string, string> = {
	APP_VERSION: '2024.07.12',
	Accept: 'application/json, text/plain, */*',
	'Accept-Language': 'vi',
	Connection: 'keep-alive',
	'Content-Type': 'application/json',
	DEVICE_NAME: 'Chrome',
	Origin: 'https://ebank.tpb.vn',
	PLATFORM_NAME: 'WEB',
	PLATFORM_VERSION: '127',
	Referer: 'https://ebank.tpb.vn/retail/vX/',
	SOURCE_APP: 'HYDRO',
	'User-Agent':
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
	'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
	'sec-ch-ua-mobile': '?0',
	'sec-ch-ua-platform': '"macOS"'
};

// Type definitions
export interface LoginResponse {
	access_token: string;
	expires_in: number;
}

export interface Transaction {
	id: string;
	arrangementId: string;
	reference: string;
	description: string;
	bookingDate: string;
	valueDate: string;
	amount: string;
	currency: string;
	creditDebitIndicator: 'CRDT' | 'DBIT';
	runningBalance: string;
}

export interface HistoriesResponse {
	transactionInfos: Transaction[];
}

interface TokenRecord {
	id: string;
	key: string;
	value: string;
	created: string;
	updated: string;
}

// Validate environment variables
export function validateEnv(): {
	username: string;
	password: string;
	deviceId: string;
	accountId: string;
} {
	const username = TPBANK_USERNAME;
	const password = TPBANK_PASSWORD;
	const deviceId = TPBANK_DEVICE_ID;
	const accountId = TPBANK_ACCOUNT_ID;

	if (!username || !password || !deviceId || !accountId) {
		throw new Error('Missing required environment variables');
	}

	return { username, password, deviceId, accountId };
}

// Login to TPBank API
export async function handleLogin(
	username: string,
	password: string,
	deviceId: string
): Promise<LoginResponse> {
	const data = { username, password, deviceId, transactionId: '' };
	const response = await fetch('https://ebank.tpb.vn/gateway/api/auth/login/v3', {
		method: 'POST',
		headers: {
			...commonHeaders,
			Authorization: 'Bearer',
			DEVICE_ID: deviceId
		},
		body: JSON.stringify(data)
	});

	if (!response.ok) throw new Error(`Login failed: ${response.statusText}`);
	return (await response.json()) as LoginResponse;
}

// Fetch transaction history from TPBank
export async function getHistories(
	token: string,
	accountId: string,
	deviceId: string,
	username: string,
	password: string,
	days: number = 30
): Promise<HistoriesResponse> {
	const now = new Date();
	const fromDate = new Date(now.setDate(now.getDate() - days))
		.toISOString()
		.slice(0, 10)
		.replace(/-/g, '');
	const toDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

	const data = {
		pageNumber: 1,
		pageSize: 400,
		accountNo: accountId,
		currency: 'VND',
		maxAcentrysrno: '',
		fromDate,
		toDate,
		keyword: ''
	};

	const response = await fetch(
		'https://ebank.tpb.vn/gateway/api/smart-search-presentation-service/v2/account-transactions/find',
		{
			method: 'POST',
			headers: {
				...commonHeaders,
				Authorization: `Bearer ${token}`,
				DEVICE_ID: deviceId,
				'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8'
			},
			body: JSON.stringify(data)
		}
	);

	if (!response.ok) {
		if (response.status === 401) {
			const loginResponse = await handleLogin(username, password, deviceId);
			const newToken = loginResponse.access_token;
			await updateTokenInPocketBase(username, newToken, loginResponse.expires_in);
			return await getHistories(newToken, accountId, deviceId, username, password, days);
		}
		throw new Error(`Failed to fetch histories: ${response.statusText}`);
	}

	return (await response.json()) as HistoriesResponse;
}

// Fetch token and expiry from PocketBase
export async function getTokenFromPocketBase(
	username: string
): Promise<{ token: string; expiry: number } | null> {
	const pbSuper = await initPBSuper();
	try {
		const tokenRecord = (await pbSuper
			.collection('token_storage')
			.getFirstListItem(`key="access_token_${username}"`)) as TokenRecord;
		const expiryRecord = (await pbSuper
			.collection('token_storage')
			.getFirstListItem(`key="expiry_${username}"`)) as TokenRecord;
		return { token: tokenRecord.value, expiry: Number(expiryRecord.value) };
	} catch {
		return null;
	}
}

// Update token and expiry in PocketBase
export async function updateTokenInPocketBase(
	username: string,
	token: string,
	expiresIn: number
): Promise<void> {
	const expiry = Date.now() + (expiresIn - 10) * 1000;
	const pbSuper = await initPBSuper();
	try {
		const existingToken = (await pbSuper
			.collection('token_storage')
			.getFirstListItem(`key="access_token_${username}"`)) as TokenRecord;
		await pbSuper.collection('token_storage').update(existingToken.id, { value: token });
	} catch {
		await pbSuper
			.collection('token_storage')
			.create({ key: `access_token_${username}`, value: token });
	}

	try {
		const existingExpiry = (await pbSuper
			.collection('token_storage')
			.getFirstListItem(`key="expiry_${username}"`)) as TokenRecord;
		await pbSuper
			.collection('token_storage')
			.update(existingExpiry.id, { value: expiry.toString() });
	} catch {
		await pbSuper
			.collection('token_storage')
			.create({ key: `expiry_${username}`, value: expiry.toString() });
	}
}
