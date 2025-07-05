import type { PageServerLoad } from './$types';
import type { Post } from '$lib/types/post';
import { getLocale } from '$lib/paraglide/runtime';
export const load: PageServerLoad = async ({ fetch }) => {
	const locale = getLocale();
	const response = await fetch(`/api/posts?locale=${locale}`);
	const posts: Post[] = await response.json();

	// Simple sidebar data using basic Post type
	const categories = Array.from(new Set(posts.flatMap((post) => post.categories)));
	const recentPosts = posts.slice(0, 5); // Just get the first 5 posts

	return {
		posts,
		categories,
		recentPosts
	};
};
