<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import type { Post, Categories } from '$lib/types/post';
	import Tag from 'phosphor-svelte/lib/Tag';
	import Article from 'phosphor-svelte/lib/Article';
	import { m } from '$lib/paraglide/messages';

	interface Props {
		categories: Categories[];
		recentPosts: Post[];
	}

	let { categories, recentPosts }: Props = $props();

	const messages = {
		categories: m.fuzzy_cozy_rabbit_relish(),
		recentPosts: m.game_funny_tapir_mend()
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('vi-VN', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	};
</script>

<aside class="grid grid-cols-2 gap-4 lg:col-span-1 lg:grid-cols-1 lg:space-y-8">
	<!-- Categories Card -->
	<Card>
		<CardHeader>
			<CardTitle class="flex items-center gap-2">
				<Tag size={20} />
				{messages.categories}
			</CardTitle>
		</CardHeader>
		<CardContent>
			<div class="flex flex-wrap gap-2">
				{#each categories as category}
					<Badge variant="secondary" class="hover:bg-accent cursor-pointer">
						{category}
					</Badge>
				{/each}
			</div>
		</CardContent>
	</Card>

	<!-- Recent Posts -->
	<!-- <Card>
		<CardHeader>
			<CardTitle class="flex items-center gap-2">
				<Article size={20} />
				{messages.recentPosts}
			</CardTitle>
		</CardHeader>
		<CardContent class="space-y-4">
			{#each recentPosts as post}
				<a
					href="/blogs/{post.slug}"
					class="hover:bg-accent text-foreground hover:text-primary line-clamp-2 block cursor-pointer space-y-2 rounded-lg px-4 py-2 text-left text-sm leading-tight font-medium transition-colors"
				>
					{post.title}
					<div class="text-muted-foreground text-xs">
						{formatDate(post.updated || post.created)}
					</div>
				</a>
			{/each}
		</CardContent>
	</Card> -->
</aside>
