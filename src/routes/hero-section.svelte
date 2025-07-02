<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { onMount, tick } from 'svelte';
	import { ScrollSmoother } from 'gsap/ScrollSmoother';

	const messages = {
		greeting: 'Xin chào, mình là',
		name: 'Tuấn Anh Lương',
		tagline:
			'Mình không chỉ code, mình xây dựng trải nghiệm - nơi ý tưởng trở thành sản phẩm có mục đích',
		description:
			'Với mình, sản phẩm không đơn thuần là công cụ, mà là cầu nối cảm xúc, định hình hành vi và tạo dấu ấn khó quên với người dùng.',
		ctaText: 'Liên hệ trao đổi',
		role: ['Marketing Executive', 'Developer']
	};

	let scrollSmoother = $state<ScrollSmoother | undefined>(undefined);

	onMount(async () => {
		await tick();
		scrollSmoother = ScrollSmoother.get();
	});
</script>

<section class="container mx-auto px-6">
	<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
		<!-- Content -->
		<div class="max-w-2xl space-y-8">
			<!-- Greeting & Name -->
			<div class="space-y-2">
				<p class="text-muted-foreground text-lg font-medium">{messages.greeting}</p>
				<h1 class="text-foreground text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
					{messages.name}
				</h1>
				<div class="mt-4 flex flex-wrap gap-2">
					{#each messages.role as role}
						<Badge class="text-sm font-medium tracking-wider uppercase">
							{role}
						</Badge>
					{/each}
				</div>
			</div>

			<!-- Main Tagline -->
			<div class="space-y-4">
				<h2 class="text-2xl leading-relaxed font-semibold md:text-3xl lg:text-4xl">
					{messages.tagline}
				</h2>
			</div>

			<!-- Description -->
			<p class="text-muted-foreground max-w-xl text-lg leading-relaxed md:text-xl">
				{messages.description}
			</p>

			<!-- CTA -->
			<div class="pt-4">
				<Button
					size="lg"
					class="cursor-pointer"
					onclick={() => scrollSmoother?.scrollTo('#contact', true)}
				>
					{messages.ctaText}
				</Button>
			</div>

			<!-- Decorative Elements -->
			<div class="flex space-x-4 pt-8">
				<div class="bg-primary h-1 w-12 rounded-full"></div>
				<div class="bg-primary/60 h-1 w-8 rounded-full"></div>
				<div class="bg-primary/30 h-1 w-4 rounded-full"></div>
			</div>
		</div>

		<!-- Visual/Image Area -->
		<div class="order-first lg:order-last">
			<div class="relative">
				<!-- Logo Image -->
				<div class="flex aspect-square items-center justify-center rounded-2xl lg:aspect-[4/5]">
					<img
						src="/imgs/logo.svg"
						alt="Tuấn Anh Lương Logo"
						class="h-full w-full rounded-2xl object-contain"
					/>
				</div>

				<!-- Floating Elements -->
				<div
					class="bg-primary/20 absolute -top-4 -right-4 h-8 w-8 animate-pulse rounded-full"
				></div>
				<div
					class="bg-primary/30 absolute top-1/4 -left-3 h-6 w-6 animate-pulse rounded-full delay-300"
				></div>
				<div
					class="bg-primary/40 absolute -right-2 bottom-1/4 h-4 w-4 animate-pulse rounded-full delay-700"
				></div>
			</div>
		</div>
	</div>
</section>
