<script lang="ts">
	import type { PageData } from './$types';
	import BreadcrumbContainer from '$lib/components/breadcrumb-container.svelte';
	import BlogPostSeo from './blog-post-seo.svelte';
	import BlogPostHeader from './blog-post-header.svelte';
	import BlogPostOutdatedWarning from './blog-post-outdated-warning.svelte';
	import BlogPostAuthorCard from './blog-post-author-card.svelte';

	let { data }: { data: PageData } = $props();

	const messages = {
		breadcrumbHome: 'Trang chủ',
		breadcrumbBlogs: 'Blogs'
	};

	const formatDateISO = (dateString: string) => {
		const date = new Date(dateString);
		return date.toISOString();
	};

	const calculateReadingTime = (wordCount: number) => {
		const wordsPerMinute = 200; // Average reading speed
		const minutes = Math.ceil(wordCount / wordsPerMinute);
		return minutes;
	};

	const formatReadingTimeISO = (minutes: number) => {
		// ISO 8601 duration format: PT[n]M for minutes
		return `PT${minutes}M`;
	};

	const siteName = 'Lương Tuấn Anh Blog';
	const authorName = 'Lương Tuấn Anh';
	const readingTimeMinutes = calculateReadingTime(data.post.wordCount);
</script>

<BlogPostSeo post={data.post} {readingTimeMinutes} />

<BreadcrumbContainer
	breadcrumbNavigations={[
		{ href: '/', label: messages.breadcrumbHome },
		{ href: '/blogs', label: messages.breadcrumbBlogs },
		{ href: `/blogs/${data.post.slug}`, label: data.post.title.slice(0, 20) + '...' }
	]}
/>

<div class="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-4xl">
		<BlogPostHeader post={data.post} />

		<BlogPostOutdatedWarning post={data.post} />

		<article
			class="prose lg:prose-lg dark:prose-invert prose-zinc !max-w-none"
			itemscope
			itemtype="https://schema.org/BlogPosting"
		>
			<meta itemprop="headline" content={data.post.title} />
			<meta itemprop="description" content={data.post.description} />
			<meta itemprop="datePublished" content={formatDateISO(data.post.created)} />
			<meta
				itemprop="dateModified"
				content={formatDateISO(data.post.updated || data.post.created)}
			/>
			<meta itemprop="author" content={authorName} />
			<meta itemprop="publisher" content={siteName} />
			<meta itemprop="wordCount" content={data.post.wordCount.toString()} />
			<meta itemprop="timeRequired" content={formatReadingTimeISO(readingTimeMinutes)} />
			<div itemprop="articleBody">
				<data.Content />
			</div>
		</article>

		<BlogPostAuthorCard />
	</div>
</div>
