import type { RequestHandler } from './$types';
import type { Post } from '$lib/types/post';
import { localizeAndRemoveEndTrailingSlash } from '$lib/utils';

interface SitemapPage {
	url: string;
	changefreq: string;
	priority: string;
	lastmod?: string;
	alternateUrls?: { lang: string; url: string }[];
}

export const GET: RequestHandler = async ({ url, fetch }) => {
	// Get the base URL (protocol + domain)
	const baseUrl = url.protocol + '//' + url.host;

	// Static pages with language alternatives
	const staticPages: SitemapPage[] = [
		{
			url: baseUrl,
			changefreq: 'weekly',
			priority: '1.0',
			alternateUrls: [
				{
					lang: 'x-default',
					url: baseUrl + localizeAndRemoveEndTrailingSlash('/', { locale: 'en' })
				},
				{ lang: 'vi', url: baseUrl + localizeAndRemoveEndTrailingSlash('/', { locale: 'vi' }) },
				{ lang: 'en', url: baseUrl + localizeAndRemoveEndTrailingSlash('/', { locale: 'en' }) }
			]
		},
		{
			url: `${baseUrl}/blogs`,
			changefreq: 'weekly',
			priority: '0.9',
			alternateUrls: [
				{
					lang: 'x-default',
					url: baseUrl + localizeAndRemoveEndTrailingSlash('/blogs', { locale: 'en' })
				},
				{
					lang: 'vi',
					url: baseUrl + localizeAndRemoveEndTrailingSlash('/blogs', { locale: 'vi' })
				},
				{ lang: 'en', url: baseUrl + localizeAndRemoveEndTrailingSlash('/blogs', { locale: 'en' }) }
			]
		},
		{
			url: `${baseUrl}/contact`,
			changefreq: 'monthly',
			priority: '0.8',
			alternateUrls: [
				{
					lang: 'x-default',
					url: baseUrl + localizeAndRemoveEndTrailingSlash('/contact', { locale: 'en' })
				},
				{
					lang: 'vi',
					url: baseUrl + localizeAndRemoveEndTrailingSlash('/contact', { locale: 'vi' })
				},
				{
					lang: 'en',
					url: baseUrl + localizeAndRemoveEndTrailingSlash('/contact', { locale: 'en' })
				}
			]
		}
	];

	// Fetch posts from the existing API endpoint
	const response = await fetch(`${baseUrl}/api/posts`);
	const posts: Post[] = await response.json();

	// Add blog posts to the sitemap with translation support
	const blogPages: SitemapPage[] = posts.map((post) => {
		const alternateUrls: { lang: string; url: string }[] = [];

		// API returns Vietnamese posts by default
		// Main post is always Vietnamese (no language prefix)
		alternateUrls.push({
			lang: 'vi',
			url: baseUrl + localizeAndRemoveEndTrailingSlash(`/blogs/${post.slug}`, { locale: 'vi' })
		});

		// Find English translation for x-default
		let englishSlug: string | null = null;

		// Add all translations
		if (post.translations) {
			for (const translation of post.translations) {
				Object.entries(translation).forEach(([lang, slug]) => {
					alternateUrls.push({
						lang,
						url: baseUrl + localizeAndRemoveEndTrailingSlash(`/blogs/${slug}`, { locale: lang })
					});
					if (lang === 'en') {
						englishSlug = slug;
					}
				});
			}
		}

		// Add x-default (English if available, otherwise Vietnamese)
		if (englishSlug) {
			alternateUrls.push({
				lang: 'x-default',
				url: baseUrl + localizeAndRemoveEndTrailingSlash(`/blogs/${englishSlug}`, { locale: 'en' })
			});
		} else {
			alternateUrls.push({
				lang: 'x-default',
				url: baseUrl + localizeAndRemoveEndTrailingSlash(`/blogs/${post.slug}`, { locale: 'vi' })
			});
		}

		return {
			url: baseUrl + localizeAndRemoveEndTrailingSlash(`/blogs/${post.slug}`, { locale: 'vi' }), // Main URL is always Vietnamese
			changefreq: 'monthly',
			priority: '0.7',
			lastmod: new Date(post.updated || post.created || '').toISOString().split('T')[0],
			alternateUrls
		};
	});

	// Combine all pages
	const pages = [...staticPages, ...blogPages];

	// Generate XML with hreflang support
	const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
	${pages
		.map(
			(page) => `
	<url>
		<loc>${page.url}</loc>
		${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
		<changefreq>${page.changefreq}</changefreq>
		<priority>${page.priority}</priority>${
			page.alternateUrls
				? page.alternateUrls
						.map(
							(alt) =>
								`
		<xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.url}"/>`
						)
						.join('')
				: ''
		}
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
