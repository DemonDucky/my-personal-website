<script lang="ts">
	import type { Post } from '$lib/types/post';
	import { getLocale } from '$lib/paraglide/runtime';
	import { localizeAndRemoveEndTrailingSlash } from '$lib/utils';
	interface Props {
		post: Post;
		readingTimeMinutes: number;
	}

	let { post, readingTimeMinutes }: Props = $props();

	const messages = {
		siteName: 'Lương Tuấn Anh Blog',
		authorName: 'Lương Tuấn Anh'
	};

	// SEO and social sharing data
	const siteUrl = 'https://luongtuananh.com';
	const siteName = messages.siteName;
	const authorName = messages.authorName;
	const authorUrl = 'https://luongtuananh.com';
	const imgs = post.thumbnail
		? 'https://luongtuananh.com' + post.thumbnail
		: 'https://luongtuananh.com/imgs/logo.svg';

	const formatDateISO = (dateString: string) => {
		const date = new Date(dateString);
		return date.toISOString();
	};

	const formatReadingTimeISO = (minutes: number) => {
		// ISO 8601 duration format: PT[n]M for minutes
		return `PT${minutes}M`;
	};

	// Generate structured data for the blog post
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title.slice(0, 110),
		description: post.description,
		image: imgs,
		datePublished: formatDateISO(post.created),
		dateModified: formatDateISO(post.updated || post.created),
		author: {
			'@type': 'Person',
			name: authorName,
			url: authorUrl
		},
		publisher: {
			'@type': 'Person',
			name: siteName,
			url: authorUrl
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${siteUrl}/blogs/${post.slug}`
		},
		articleSection: post.categories.join(', '),
		keywords: post.categories.join(', '),
		inLanguage: 'vi-VN',
		wordCount: post.wordCount,
		timeRequired: formatReadingTimeISO(readingTimeMinutes)
	};

	// Generate current URL
	const currentUrl = `${siteUrl}/blogs/${post.slug}`;

	// Generate enhanced meta description
	const metaDescription =
		post.description.length > 160 ? post.description.substring(0, 157) + '...' : post.description;

	const xDefault =
		post.translations && post.translations.some((translation) => 'en' in translation)
			? siteUrl +
				localizeAndRemoveEndTrailingSlash('/blogs/' + post.translations?.[0]?.en, { locale: 'en' })
			: siteUrl + localizeAndRemoveEndTrailingSlash('/blogs/' + post.slug, { locale: getLocale() });
</script>

<svelte:head>
	{#if post.translations}
		{#each post.translations as translation}
			{#each Object.entries(translation) as [lang, slug]}
				<link
					rel="alternate"
					href={siteUrl + localizeAndRemoveEndTrailingSlash('/blogs/' + slug, { locale: lang })}
					hreflang={lang}
				/>
			{/each}
		{/each}
	{/if}

	<!-- Alternate link for current locale -->
	<link
		rel="alternate"
		href={siteUrl +
			localizeAndRemoveEndTrailingSlash('/blogs/' + post.slug, { locale: getLocale() })}
		hreflang={getLocale()}
	/>

	<!-- Alternate link for x-default -->
	<link rel="alternate" href={xDefault} hreflang="x-default" />
	<!-- Primary Meta Tags -->
	<title>{post.title}</title>
	<meta name="title" content={post.title} />
	<meta name="description" content={metaDescription} />
	<meta name="keywords" content={post.categories.join(', ')} />
	<meta name="author" content={authorName} />
	<meta name="reading-time" content="{readingTimeMinutes} minutes" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="article" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:image" content="{siteUrl}/imgs/logo.png" />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:locale" content="vi_VN" />

	<!-- Article specific Open Graph tags -->
	<meta property="article:author" content={authorName} />
	<meta property="article:published_time" content={formatDateISO(post.created)} />
	<meta property="article:modified_time" content={formatDateISO(post.updated || post.created)} />
	<meta property="article:section" content={post.categories[0] || 'Blog'} />
	{#each post.categories as category}
		<meta property="article:tag" content={category} />
	{/each}

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={currentUrl} />
	<meta property="twitter:title" content={post.title} />
	<meta property="twitter:description" content={metaDescription} />
	<meta property="twitter:image" content={imgs} />
	<meta property="twitter:creator" content={authorName} />
	<meta property="twitter:site" content={siteName} />

	<!-- Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
</svelte:head>
