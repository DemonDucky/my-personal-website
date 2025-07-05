<script lang="ts">
	import type { Post } from '$lib/types/post';
	import { Badge } from '$lib/components/ui/badge';
	import Calendar from 'phosphor-svelte/lib/Calendar';
	import Clock from 'phosphor-svelte/lib/Clock';

	interface Props {
		post: Post;
	}

	let { post }: Props = $props();

	const messages = {
		publishedOn: 'Xuất bản vào',
		updatedOn: 'Cập nhật lần cuối',
		readingTime: 'phút đọc'
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
</script>

<!-- Post Header -->
<section class="mb-8 space-y-6">
	<!-- Categories -->
	<div class="flex flex-wrap gap-2">
		{#each post.categories as category}
			<Badge variant="secondary">{category}</Badge>
		{/each}
	</div>

	<!-- Title -->
	<h1 class="text-foreground text-3xl font-bold lg:text-4xl">
		{post.title}
	</h1>

	<!-- Description -->
	<p class="text-muted-foreground text-lg leading-relaxed">
		{post.description}
	</p>

	<!-- Date and Reading Time -->
	<div
		class="text-muted-foreground flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-4"
	>
		<div class="flex items-center gap-2">
			<Calendar size={16} />
			<span>
				{messages.publishedOn}
				{formatDate(post.created)}
			</span>
		</div>

		<div class="flex items-center gap-2">
			<Clock size={16} />
			<span>
				{calculateReadingTime(post.wordCount)}
				{messages.readingTime}
			</span>
		</div>
	</div>

	<!-- Updated Date -->
	{#if post.updated}
		<div class="text-muted-foreground flex items-center gap-2 text-xs">
			<Calendar size={16} />
			<span>
				{messages.updatedOn}
				{formatDate(post.updated)}
			</span>
		</div>
	{/if}

	<!-- Divider -->
	<div class="bg-border h-px"></div>
</section>
