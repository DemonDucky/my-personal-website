import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Post } from '$lib/types/post';

type SortField = keyof Post;
type SortOrder = 'asc' | 'desc';

async function getPosts(sortBy: SortField = 'created', order: SortOrder = 'desc'): Promise<Post[]> {
	const paths = import.meta.glob('/src/posts/*.svx', { eager: true });

	const posts = Object.entries(paths)
		.map(([path, file]) => {
			const slug = path.split('/').at(-1)?.replace('.svx', '');

			if (!slug || !file || typeof file !== 'object' || !('metadata' in file)) {
				return null;
			}

			const metadata = file.metadata as Omit<Post, 'slug'>;
			return { ...metadata, slug } satisfies Post;
		})
		.filter((post): post is Post => post !== null && post.published)
		.sort((a, b) => {
			const aValue = a[sortBy];
			const bValue = b[sortBy];

			// Handle date sorting
			if (sortBy === 'created') {
				const aTime = new Date(aValue as string).getTime();
				const bTime = new Date(bValue as string).getTime();
				return order === 'desc' ? bTime - aTime : aTime - bTime;
			}

			// Handle string sorting
			if (typeof aValue === 'string' && typeof bValue === 'string') {
				const comparison = aValue.localeCompare(bValue);
				return order === 'desc' ? -comparison : comparison;
			}

			return 0;
		});

	return posts;
}

export const GET: RequestHandler = async () => {
	// const sortBy = (url.searchParams.get('sortBy') as SortField) ?? 'created';
	// const order = (url.searchParams.get('order') as SortOrder) ?? 'desc';

	const posts = await getPosts('created', 'desc');
	return json(posts);
};
