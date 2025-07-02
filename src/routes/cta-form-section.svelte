<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import ThreeDash from '$lib/components/ui/decoration/three-dash.svelte';
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import * as Form from '$lib/components/ui/form/index.js';
	import { contactFormSchema, type ContactFormSchema } from '$lib/schema';
	import { superForm, type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	const messages = {
		sectionTitle: 'Bạn có dự án cần phát triển?',
		description:
			'Hãy chia sẻ ý tưởng của bạn và mình sẽ liên hệ lại trong vòng 24 giờ để thảo luận thêm về cách chúng ta có thể hợp tác.',
		cardTitle: 'Liên hệ với mình',
		nameLabel: 'Tên của bạn',
		namePlaceholder: 'Nhập tên của bạn',
		emailLabel: 'Email',
		emailPlaceholder: 'email@example.com',
		projectNameLabel: 'Tên dự án',
		projectNamePlaceholder: 'Nhập tên dự án của bạn',
		projectLabel: 'Mô tả ngắn về dự án',
		projectPlaceholder: 'Mô tả ngắn về dự án của bạn...',
		submitText: 'Gửi yêu cầu',
		submitting: 'Đang gửi...',
		thankYouMessage: 'Gửi thành công. Cảm ơn bạn đã liên hệ! Mình sẽ phản hồi sớm nhất có thể.',
		privacyNote:
			'Mình luôn tôn trọng quyền riêng tư của bạn và chỉ sử dụng thông tin này để liên hệ về dự án.'
	};

	let { contactForm }: { contactForm: SuperValidated<Infer<ContactFormSchema>> } = $props();

	let submitted = $state(false);

	const form = superForm(contactForm, {
		validators: zodClient(contactFormSchema),
		taintedMessage: 'Vui lòng điền đầy đủ thông tin',
		multipleSubmits: 'prevent',
		onUpdated({ form }) {
			if (form.valid) {
				submitted = true;
				console.log(submitted);
				toast.success(messages.thankYouMessage, { position: 'top-center' });
			}
		}
	});

	const { form: formData, enhance, submitting } = form;
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
				<CardTitle class="text-2xl">{messages.cardTitle}</CardTitle>
			</CardHeader>
			<CardContent class="space-y-6">
				{#if submitted}
					<div class="py-8 text-center">
						<h3 class="mb-2 text-xl font-bold">{messages.thankYouMessage}</h3>
					</div>
				{:else}
					<form class="space-y-6" method="POST" action="?/contact" use:enhance>
						<!-- Name Input -->
						<Form.Field {form} name="name">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>{messages.nameLabel}</Form.Label>
									<Input
										type="text"
										placeholder={messages.namePlaceholder}
										{...props}
										bind:value={$formData.name}
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<!-- Email Input -->
						<Form.Field {form} name="email">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>{messages.emailLabel}</Form.Label>
									<Input
										type="email"
										placeholder={messages.emailPlaceholder}
										{...props}
										bind:value={$formData.email}
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<!-- Project Name Input -->
						<Form.Field {form} name="projectName">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>{messages.projectNameLabel}</Form.Label>
									<Input
										type="text"
										placeholder={messages.projectNamePlaceholder}
										{...props}
										bind:value={$formData.projectName}
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<!-- Project Description -->
						<Form.Field {form} name="projectDescription">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>{messages.projectLabel}</Form.Label>
									<div class="relative">
										<Textarea
											placeholder={messages.projectPlaceholder}
											class="min-h-28"
											{...props}
											bind:value={$formData.projectDescription}
										/>
										<div
											class="bg-primary/10 absolute -top-1 -right-1 h-6 w-6 animate-pulse rounded-full"
										></div>
										<div
											class="bg-primary/15 absolute bottom-1 -left-2 h-4 w-4 animate-pulse rounded-full delay-300"
										></div>
									</div>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<!-- Submit Button -->
						<Button type="submit" class="w-full" size="lg" disabled={$submitting}>
							<span>{$submitting ? messages.submitting : messages.submitText}</span>
							<ArrowRight size={16} />
						</Button>
					</form>
				{/if}

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
