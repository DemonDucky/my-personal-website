// import type { EntryGenerator } from './$types';

// function getPosts(): Promise<string[]> {
// 	const paths = import.meta.glob('/src/posts/*.svx', { eager: true });

// 	const slugs = Object.keys(paths)
// 		.map((path) => {
// 			return path.split('/').at(-1)?.replace('.svx', '') || '';
// 		})
// 		.filter((slug) => slug !== '');

// 	return Promise.resolve(slugs);
// }

// export const entries: EntryGenerator = async () => {
// 	const slugs = await getPosts();
// 	return slugs.map((slug) => ({ slug }));
// };
