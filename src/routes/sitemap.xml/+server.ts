import type { RequestHandler } from './$types';
import type { Post } from '$lib/types/post';

interface SitemapPage {
	url: string;
	changefreq: string;
	priority: string;
	lastmod?: string;
}

export const GET: RequestHandler = async ({ url, fetch }) => {
	// Get the base URL (protocol + domain)
	const baseUrl = url.protocol + '//' + url.host;

	// Static pages
	const staticPages: SitemapPage[] = [
		{
			url: baseUrl,
			changefreq: 'weekly',
			priority: '1.0'
		},
		{
			url: `${baseUrl}/blogs`,
			changefreq: 'weekly',
			priority: '0.9'
		}
	];

	// Fetch posts from the existing API endpoint
	const response = await fetch(`${baseUrl}/api/posts`);
	const posts: Post[] = await response.json();

	// Add blog posts to the sitemap
	const blogPages: SitemapPage[] = posts.map((post) => {
		return {
			url: `${baseUrl}/blogs/${post.slug}`,
			changefreq: 'monthly',
			priority: '0.7',
			lastmod: new Date(post.updated || post.created || '').toISOString().split('T')[0]
		};
	});

	// Combine all pages
	const pages = [...staticPages, ...blogPages];

	// Generate XML
	const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${pages
		.map(
			(page) => `
	<url>
		<loc>${page.url}</loc>
		${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
		<changefreq>${page.changefreq}</changefreq>
		<priority>${page.priority}</priority>
	</url>`
		)
		.join('')}
</urlset>`;

	// Return the XML
	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
