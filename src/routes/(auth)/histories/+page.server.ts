import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, url }) => {
	const days = Number(url.searchParams.get('days')) || 3;

	try {
		const response = await fetch(`/api/histories?days=${days}`); // Adjust URL as needed
		if (!response.ok) throw new Error('Failed to fetch transaction histories');
		const data = await response.json();
		return { data };
	} catch (error) {
		return { error: (error as Error).message };
	}
}) satisfies PageServerLoad;
