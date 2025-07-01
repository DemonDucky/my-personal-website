<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import ThreeDash from '$lib/components/ui/decoration/three-dash.svelte';
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';

	const messages = {
		sectionTitle: 'Bạn có dự án cần phát triển?',
		description:
			'Hãy chia sẻ ý tưởng của bạn và mình sẽ liên hệ lại trong vòng 24 giờ để thảo luận thêm về cách chúng ta có thể hợp tác.',
		nameLabel: 'Tên của bạn',
		emailLabel: 'Email',
		projectLabel: 'Mô tả ngắn về dự án',
		submitText: 'Gửi yêu cầu',
		thankYouMessage: 'Cảm ơn bạn đã liên hệ! Mình sẽ phản hồi sớm nhất có thể.',
		privacyNote:
			'Mình tôn trọng quyền riêng tư của bạn và chỉ sử dụng thông tin này để liên hệ về dự án.'
	};

	let name = '';
	let email = '';
	let projectDescription = '';
</script>

<section class="container mx-auto px-6 py-20" id="contact">
	<!-- Section Header -->
	<div class="mb-12 text-center">
		<h2 class="text-foreground mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
			{messages.sectionTitle}
		</h2>
		<p class="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
			{messages.description}
		</p>
	</div>

	<!-- Form Card -->
	<div class="mx-auto max-w-2xl">
		<Card class="border-primary overflow-hidden">
			<CardHeader>
				<CardTitle class="text-2xl">Liên hệ với mình</CardTitle>
			</CardHeader>
			<CardContent class="space-y-6">
				<form class="space-y-6">
					<!-- Name Input -->
					<div class="space-y-2">
						<label for="name" class="text-sm font-medium">
							{messages.nameLabel}
						</label>
						<Input
							id="name"
							type="text"
							bind:value={name}
							placeholder="Nhập tên của bạn"
							required
						/>
					</div>

					<!-- Email Input -->
					<div class="space-y-2">
						<label for="email" class="text-sm font-medium">
							{messages.emailLabel}
						</label>
						<Input
							id="email"
							type="email"
							bind:value={email}
							placeholder="email@example.com"
							required
						/>
					</div>

					<!-- Project Description -->
					<div class="space-y-2">
						<label for="project" class="text-sm font-medium">
							{messages.projectLabel}
						</label>
						<div class="relative">
							<textarea
								id="project"
								bind:value={projectDescription}
								placeholder="Mô tả ngắn về dự án của bạn..."
								class="border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-28 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
								required
							></textarea>
							<div
								class="bg-primary/10 absolute -top-1 -right-1 h-6 w-6 animate-pulse rounded-full"
							></div>
							<div
								class="bg-primary/15 absolute bottom-1 -left-2 h-4 w-4 animate-pulse rounded-full delay-300"
							></div>
						</div>
					</div>

					<!-- Submit Button -->
					<Button type="submit" class="w-full" size="lg">
						<span>{messages.submitText}</span>
						<ArrowRight size={16} />
					</Button>
				</form>

				<!-- Privacy Note -->
				<p class="text-muted-foreground text-center text-xs">
					{messages.privacyNote}
				</p>
			</CardContent>
		</Card>
	</div>

	<!-- Decorative Elements -->
	<div class="relative mt-16">
		<div class="mx-auto flex w-fit">
			<ThreeDash />
		</div>

		<!-- Floating Elements -->
		<div class="bg-primary/20 absolute -top-12 -right-4 h-8 w-8 animate-pulse rounded-full"></div>
		<div
			class="bg-primary/30 absolute top-1/4 -left-3 h-6 w-6 animate-pulse rounded-full delay-300"
		></div>
		<div
			class="bg-primary/40 absolute -right-2 bottom-1/4 h-4 w-4 animate-pulse rounded-full delay-700"
		></div>
	</div>
</section>
