import { VALIDATE_TOKEN } from '$env/static/private';

export function validateToken(token: string | null) {
	if (token === VALIDATE_TOKEN) return true;

	throw new Error('Invalid token');
}
