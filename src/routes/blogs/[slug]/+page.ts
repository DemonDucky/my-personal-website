import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Post } from '$lib/types/post';
import { getLocale } from '$lib/paraglide/runtime';

export const load: PageLoad = async ({ params }) => {
	const locale = getLocale();
	try {
		// Dynamically import the post file
		const post = await import(`../../../posts/${locale}/${params.slug}.svx`);

		if (!post) {
			throw error(404, 'Post not found');
		}

		// Extract metadata and content
		const metadata = post.metadata as Omit<Post, 'slug'>;
		const Content = post.default;

		// Check if post is published
		if (!metadata.published) {
			throw error(404, 'Post not found');
		}

		return {
			post: {
				...metadata,
				slug: params.slug
			} as Post,
			Content
		};
	} catch {
		throw error(404, 'Post not found');
	}
};
