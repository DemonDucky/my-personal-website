<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import BreadcrumbContainer from '$lib/components/breadcrumb-container.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import type { PageData } from './$types';
	import BlogSidebar from './blog-sidebar.svelte';
	import Clock from 'phosphor-svelte/lib/Clock';
	import Calendar from 'phosphor-svelte/lib/Calendar';

	let { data }: { data: PageData } = $props();

	const messages = {
		title: 'Blog của Lương Tuấn Anh',
		subtitle: 'Quyển nhật ký của mình, nơi có thể có gì đó bạn cần.',
		breadcrumbHome: 'Trang chủ',
		breadcrumbBlogs: 'Blogs',
		seoTitle: 'Blog của Lương Tuấn Anh',
		seoDescription: 'Khám phá các bài viết về đa ngành với góc nhìn của mình.',
		seoKeywords:
			'blog lập trình, sveltekit, svelte, javascript, typescript, web development, front-end, programming, vietnamese tech blog, marketing, digital marketing, digital transformation',
		readingTime: 'phút đọc'
	};

	const navigateToPost = (slug: string) => {
		goto(`/blogs/${slug}`);
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('vi-VN', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
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

	// SEO and structured data
	const siteUrl = 'https://luongtuananh.com';
	const currentUrl = `${siteUrl}${page.url.pathname}`;
	const siteName = 'Lương Tuấn Anh';
	const authorName = 'Lương Tuấn Anh';

	// Generate structured data for blog listing
	const generateStructuredData = () => {
		const structuredData = {
			'@context': 'https://schema.org',
			'@type': 'Blog',
			name: messages.title,
			description: messages.seoDescription,
			url: currentUrl,
			author: {
				'@type': 'Person',
				name: authorName
			},
			publisher: {
				'@type': 'Person',
				name: authorName
			},
			inLanguage: 'vi-VN',
			blogPost: data.posts.map((post) => ({
				'@type': 'BlogPosting',
				headline: post.title,
				description: post.description,
				url: `${siteUrl}/blogs/${post.slug}`,
				datePublished: post.created,
				dateModified: post.updated || post.created,
				author: {
					'@type': 'Person',
					name: authorName
				},
				publisher: {
					'@type': 'Person',
					name: authorName
				},
				keywords: post.categories.join(', '),
				inLanguage: 'vi-VN',
				wordCount: post.wordCount,
				timeRequired: formatReadingTimeISO(calculateReadingTime(post.wordCount))
			}))
		};
		return JSON.stringify(structuredData);
	};

	// Generate breadcrumb structured data
	const generateBreadcrumbStructuredData = () => {
		const breadcrumbData = {
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: messages.breadcrumbHome,
					item: siteUrl
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: messages.breadcrumbBlogs,
					item: currentUrl
				}
			]
		};
		return JSON.stringify(breadcrumbData);
	};
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{messages.seoTitle}</title>
	<meta name="title" content={messages.seoTitle} />
	<meta name="description" content={messages.seoDescription} />
	<meta name="keywords" content={messages.seoKeywords} />
	<meta name="author" content={authorName} />
	<meta name="robots" content="index, follow" />
	<meta name="language" content="Vietnamese" />
	<meta name="revisit-after" content="7 days" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:title" content={messages.seoTitle} />
	<meta property="og:description" content={messages.seoDescription} />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:locale" content="vi_VN" />
	<meta property="og:image" content="{siteUrl}/imgs/logo.svg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={messages.title} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={currentUrl} />
	<meta property="twitter:title" content={messages.seoTitle} />
	<meta property="twitter:description" content={messages.seoDescription} />
	<meta property="twitter:image" content="{siteUrl}/imgs/logo.svg" />
	<meta property="twitter:image:alt" content={messages.title} />

	<!-- Article Meta -->
	<meta property="article:author" content={authorName} />
	<meta property="article:section" content="Technology" />
	<meta property="article:tag" content="Programming" />
	<meta property="article:tag" content="SvelteKit" />
	<meta property="article:tag" content="Svelte" />
	<meta property="article:tag" content="JavaScript" />
	<meta property="article:tag" content="Web Development" />

	<!-- Structured Data -->
	{@html `<script type="application/ld+json">${generateStructuredData()}</script>`}
	{@html `<script type="application/ld+json">${generateBreadcrumbStructuredData()}</script>`}
</svelte:head>

<!-- Breadcrumb Navigation -->
<BreadcrumbContainer
	breadcrumbNavigations={[
		{ href: '/', label: messages.breadcrumbHome },
		{ href: '/blogs', label: messages.breadcrumbBlogs }
	]}
/>

<div class="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<!-- Header -->
		<header class="mb-12 text-center">
			<h1 class="text-foreground mb-4 text-4xl font-bold">{messages.title}</h1>
			<p class="text-muted-foreground text-lg">{messages.subtitle}</p>
		</header>

		<div class="grid grid-cols-1 gap-12 lg:grid-cols-4">
			<!-- Sidebar - Shows first on mobile, last on desktop -->
			<aside class="order-1 hidden lg:order-2 lg:col-span-1 lg:block" aria-label="Blog sidebar">
				<BlogSidebar
					categories={data.categories}
					recentPosts={data.recentPosts}
					onNavigateToPost={navigateToPost}
				/>
			</aside>

			<!-- Main Content - Shows second on mobile, first on desktop -->
			<main class="order-2 lg:order-1 lg:col-span-3" aria-label="Blog posts">
				<div class="grid gap-6">
					{#each data.posts as post, index}
						<article>
							<Card
								class="cursor-pointer transition-shadow hover:shadow-lg"
								onclick={() => navigateToPost(post.slug)}
								role="button"
								tabindex={0}
								aria-label="Read blog post: {post.title}"
								onkeydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										navigateToPost(post.slug);
									}
								}}
							>
								<CardHeader>
									<div class="mb-2 flex flex-wrap gap-2">
										{#each post.categories as category}
											<Badge variant="secondary" aria-label="Category: {category}">{category}</Badge
											>
										{/each}
									</div>
									<CardTitle class="text-xl">
										<h2>{post.title}</h2>
									</CardTitle>
									<CardDescription class="text-muted-foreground text-sm">
										<div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
											<div class="flex items-center gap-1">
												<Calendar size={14} />
												<time
													datetime={post.updated || post.created}
													aria-label="Published on {formatDate(post.updated || post.created)}"
												>
													{formatDate(post.updated || post.created)}
												</time>
											</div>
											<div class="flex items-center gap-1">
												<Clock size={14} />
												<span>
													{calculateReadingTime(post.wordCount)}
													{messages.readingTime}
												</span>
											</div>
										</div>
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p class="text-muted-foreground">{post.description}</p>
								</CardContent>
							</Card>
						</article>
					{/each}
				</div>
			</main>
		</div>
	</div>
</div>
