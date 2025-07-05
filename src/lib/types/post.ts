export type Categories = 'sveltekit' | 'svelte';

export type Post = {
	title: string;
	slug: string;
	description: string;
	created: string;
	updated: string | null;
	categories: Categories[];
	wordCount: number;
	translations: Translation[] | null;
	thumbnail: string | null;
	published: boolean;
};

export type Language = 'en' | 'vi';

export type Translation = Record<Language, string>;
