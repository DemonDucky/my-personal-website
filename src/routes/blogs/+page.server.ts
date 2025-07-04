import type { PageServerLoad } from './$types';
import type { Post } from '$lib/types/post';

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch('/api/posts');
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
