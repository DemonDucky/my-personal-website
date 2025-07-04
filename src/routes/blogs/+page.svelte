<script lang="ts">
	import type { PageData } from './$types';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { goto } from '$app/navigation';
	import BlogSidebar from './blog-sidebar.svelte';

	let { data }: { data: PageData } = $props();

	const messages = {
		title: 'Blog của Lương Tuấn Anh',
		subtitle: 'Quyển nhật ký của mình, nơi có thể có gì đó bạn cần.'
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
</script>

<svelte:head>
	<title>{messages.title}</title>
	<meta name="description" content={messages.subtitle} />
</svelte:head>

<div class="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<!-- Header -->
		<section class="mb-12 text-center">
			<h1 class="text-foreground mb-4 text-4xl font-bold">{messages.title}</h1>
			<p class="text-muted-foreground text-lg">{messages.subtitle}</p>
		</section>

		<div class=" grid grid-cols-1 gap-12 lg:grid-cols-4">
			<!-- Sidebar - Shows first on mobile, last on desktop -->
			<div class="order-1 hidden lg:order-2 lg:col-span-1 lg:block">
				<BlogSidebar
					categories={data.categories}
					recentPosts={data.recentPosts}
					onNavigateToPost={navigateToPost}
				/>
			</div>

			<!-- Main Content - Shows second on mobile, first on desktop -->
			<main class="order-2 lg:order-1 lg:col-span-3">
				<div class="grid gap-6">
					{#each data.posts as post}
						<Card
							class="cursor-pointer transition-shadow hover:shadow-lg"
							onclick={() => navigateToPost(post.slug)}
						>
							<CardHeader>
								<div class="mb-2 flex flex-wrap gap-2">
									{#each post.categories as category}
										<Badge variant="secondary">{category}</Badge>
									{/each}
								</div>
								<CardTitle class="text-xl">{post.title}</CardTitle>
								<CardDescription class="text-muted-foreground text-sm">
									{formatDate(post.updated || post.created)}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p class="text-muted-foreground">{post.description}</p>
							</CardContent>
						</Card>
					{/each}
				</div>
			</main>
		</div>
	</div>
</div>
