import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	console.log('tset');
	return {};
}) satisfies LayoutServerLoad;
