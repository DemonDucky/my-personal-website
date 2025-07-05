export type Categories = 'sveltekit' | 'svelte';

export type Post = {
	title: string;
	slug: string;
	description: string;
	created: string;
	updated: string | null;
	categories: Categories[];
	wordCount: number;
	thumbnail: string | null;
	published: boolean;
};
