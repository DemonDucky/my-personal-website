<script lang="ts">
	import type { PageData } from './$types';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Alert from '$lib/components/ui/alert';
	import { goto } from '$app/navigation';
	import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
	import Calendar from 'phosphor-svelte/lib/Calendar';
	import WarningCircle from 'phosphor-svelte/lib/WarningCircle';
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo';
	import FacebookLogo from 'phosphor-svelte/lib/FacebookLogo';

	let { data }: { data: PageData } = $props();

	const messages = {
		backToBlog: 'Quay lại Blog',
		publishedOn: 'Xuất bản vào',
		updatedOn: 'Cập nhật lần cuối',
		outdatedWarning: 'Cảnh báo nội dung cũ',
		outdatedDescription:
			'Bài viết này đã được viết cách đây hơn 2 năm, một vài kỹ thuật có thể đã lỗi thời. Bạn nên kiểm tra kĩ trước khi áp dụng.',
		aboutAuthor: 'Về tác giả',
		authorName: 'Lương Tuấn Anh',
		authorBio:
			'Mình xuất phát từ marketing, nhưng thích tự tay xây cả sản phẩm lẫn thương hiệu. Blog này là nơi mình ghi lại những gì học được khi biến ý tưởng thành thứ có thể chạm được, thấy được.',
		followMe: 'Theo dõi tôi'
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('vi-VN', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	const isPostOlderThanTwoYears = () => {
		const now = new Date();

		// Check updated date first, if not available, check created date
		const dateToCheck = data.post.updated || data.post.created;
		const postDate = new Date(dateToCheck);

		// Calculate the difference in milliseconds
		const timeDifference = now.getTime() - postDate.getTime();

		// Convert to years (365.25 days to account for leap years)
		const yearsDifference = timeDifference / (1000 * 60 * 60 * 24 * 365.25);

		return yearsDifference > 2;
	};

	const goBack = () => {
		goto('/blogs');
	};
</script>

<svelte:head>
	<title>{data.post.title}</title>
	<meta name="description" content={data.post.description} />
</svelte:head>

<div class="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-4xl">
		<!-- Back Button -->
		<div class="mb-8">
			<Button variant="ghost" onclick={goBack} class="cursor-pointer gap-2">
				<ArrowLeft size={16} />
				{messages.backToBlog}
			</Button>
		</div>

		<!-- Post Header -->
		<section class="mb-8 space-y-6">
			<!-- Categories -->
			<div class="flex flex-wrap gap-2">
				{#each data.post.categories as category}
					<Badge variant="secondary">{category}</Badge>
				{/each}
			</div>

			<!-- Title -->
			<h1 class="text-foreground text-3xl font-bold lg:text-4xl">
				{data.post.title}
			</h1>

			<!-- Description -->
			<p class="text-muted-foreground text-lg leading-relaxed">
				{data.post.description}
			</p>

			<!-- Date -->
			<div class="text-muted-foreground flex items-center gap-2 text-xs">
				<Calendar size={16} />
				<span>
					{messages.publishedOn}
					{formatDate(data.post.created)}
				</span>
			</div>

			<!-- Updated Date -->
			{#if data.post.updated}
				<div class="text-muted-foreground flex items-center gap-2 text-xs">
					<Calendar size={16} />
					<span>
						{messages.updatedOn}
						{formatDate(data.post.updated)}
					</span>
				</div>
			{/if}

			<!-- Divider -->
			<div class="bg-border h-px"></div>
		</section>

		<!-- Post Content -->
		{#if isPostOlderThanTwoYears()}
			<Alert.Root variant="destructive" class="mb-6">
				<WarningCircle class="size-4" />
				<Alert.Title class="font-bold">{messages.outdatedWarning}</Alert.Title>
				<Alert.Description>
					{messages.outdatedDescription}
				</Alert.Description>
			</Alert.Root>
		{/if}

		<article class="prose lg:prose-lg dark:prose-invert prose-zinc !max-w-none">
			<data.Content />
		</article>

		<!-- Author Card -->
		<section class="border-border mt-12 border-t pt-8">
			<div class="bg-muted/30 rounded-lg p-6">
				<h3 class="text-foreground mb-4 text-xl font-semibold">{messages.aboutAuthor}</h3>

				<div class="flex flex-col gap-4 sm:flex-row sm:items-start">
					<!-- Author Avatar -->
					<div class="flex-shrink-0">
						<div
							class="bg-primary/10 text-primary flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold"
						>
							{messages.authorName.charAt(0)}
						</div>
					</div>

					<!-- Author Info -->
					<div class="flex-1 space-y-3">
						<div>
							<h4 class="text-foreground text-lg font-medium">{messages.authorName}</h4>
							<p class="text-muted-foreground text-sm leading-relaxed">
								{messages.authorBio}
							</p>
						</div>

						<!-- Social Links -->
						<div class="flex items-center gap-2">
							<span class="text-muted-foreground text-sm">{messages.followMe}:</span>
							<div class="flex gap-2">
								<Button
									variant="outline"
									href="https://github.com/demonducky"
									target="_blank"
									size="icon"
									class="h-8 w-8 p-0"
								>
									<GithubLogo size={16} />
									<span class="sr-only">GitHub</span>
								</Button>
								<Button
									variant="outline"
									href="https://www.facebook.com/tuananh.luonggg/"
									target="_blank"
									size="icon"
									class="h-8 w-8 p-0"
								>
									<FacebookLogo size={16} />
									<span class="sr-only">Facebook</span>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</div>
