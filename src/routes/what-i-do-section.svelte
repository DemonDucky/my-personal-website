<script lang="ts">
	import { Card, CardContent, CardHeader } from '$lib/components/ui/card/index.js';
	import ThreeDash from '$lib/components/ui/decoration/three-dash.svelte';

	const messages = {
		sectionTitle: 'Vậy mình thực sự làm gì?',
		description: [
			'Mình hoạt động ở vùng giao thoa giữa lập trình và marketing – nơi ý tưởng được dựng nên thành trải nghiệm, và trải nghiệm được kể thành câu chuyện thương hiệu.'
		],
		devSide: {
			title: 'Dev Side',
			skills: [
				'Thiết kế và phát triển ứng dụng web fullstack hiện đại với SvelteKit & TypeScript',
				'Tối ưu hiệu suất, bảo mật, SEO và tuân thủ chuẩn accessibility (a11y)',
				'Tích hợp dịch vụ backend hiện đại như PocketBase, Supabase, RESTful & GraphQL APIs',
				'Xây dựng UI động, trải nghiệm mượt mà, quản lý state rõ ràng và dễ bảo trì'
			]
		},
		marketingSide: {
			title: 'Brand & Marketing Side',
			skills: [
				'Định vị thương hiệu, xây dựng ngôn ngữ & hình ảnh nhất quán',
				'Viết và tối ưu landing page để tăng chuyển đổi và trải nghiệm người dùng',
				'Phát triển concept truyền thông & nội dung gắn liền với giá trị sản phẩm',
				'Kết nối cảm xúc, tạo động lực mua hàng bằng storytelling và hiểu rõ insight khách hàng'
			]
		}
	};
</script>

<section class="container mx-auto px-6 py-20" id="skills">
	<!-- Section Header -->
	<div class="mb-12 text-center">
		<h2 class="text-foreground mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
			{messages.sectionTitle}
		</h2>
		<div class="mx-auto max-w-3xl space-y-4">
			{#each messages.description as paragraph}
				<p class="text-muted-foreground text-lg leading-relaxed md:text-xl">
					{paragraph}
				</p>
			{/each}
		</div>
	</div>

	<!-- Two Columns Layout -->
	<div class="mx-auto mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
		<!-- Dev Side Column -->
		<Card class="border-primary h-full border-l-4">
			<CardHeader>
				<h3 class="text-2xl font-semibold">
					{messages.devSide.title}
				</h3>
			</CardHeader>
			<CardContent class="space-y-6">
				<ul class="space-y-4">
					{#each messages.devSide.skills as skill}
						<li class="flex items-start space-x-3">
							<div class="text-primary flex-shrink-0 pt-1">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg
								>
							</div>
							<p>{skill}</p>
						</li>
					{/each}
				</ul>
			</CardContent>
		</Card>

		<!-- Marketing Side Column -->
		<Card class="border-primary h-full border-l-4">
			<CardHeader>
				<h3 class="text-2xl font-semibold">
					{messages.marketingSide.title}
				</h3>
			</CardHeader>
			<CardContent class="space-y-6">
				<ul class="space-y-4">
					{#each messages.marketingSide.skills as skill}
						<li class="flex items-start space-x-3">
							<div class="text-primary flex-shrink-0 pt-1">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg
								>
							</div>
							<p>{skill}</p>
						</li>
					{/each}
				</ul>
			</CardContent>
		</Card>
	</div>

	<!-- Decorative Elements -->
	<div class="relative mt-12">
		<!-- <div class="mx-auto flex w-fit space-x-4">
			<div class="bg-primary h-1 w-16 rounded-full"></div>
			<div class="bg-primary/60 h-1 w-12 rounded-full"></div>
			<div class="bg-primary/30 h-1 w-8 rounded-full"></div>
		</div> -->
		<ThreeDash />

		<!-- Floating Elements -->
		<div class="bg-primary/20 absolute -top-4 -right-4 h-8 w-8 animate-pulse rounded-full"></div>
		<div
			class="bg-primary/30 absolute top-1/4 -left-3 h-6 w-6 animate-pulse rounded-full delay-300"
		></div>
		<div
			class="bg-primary/40 absolute -right-2 bottom-1/4 h-4 w-4 animate-pulse rounded-full delay-700"
		></div>
	</div>
</section>
