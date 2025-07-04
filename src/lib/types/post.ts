export type Categories = 'sveltekit' | 'svelte';

export type Post = {
	title: string;
	slug: string;
	description: string;
	created: string;
	updated: string | null;
	categories: Categories[];
	published: boolean;
};
