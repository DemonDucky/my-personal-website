<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import ThreeDash from '$lib/components/ui/decoration/three-dash.svelte';
	import { m } from '$lib/paraglide/messages';

	const messages = {
		sectionTitle: m.inclusive_formal_martin_loop(),
		projectName: 'Amorees',
		tagline: m.salty_careful_kudu_twist(),
		description: m.last_lime_gadfly_spark(),
		features: [
			m.formal_long_parakeet_coax(),
			m.watery_such_turtle_grin(),
			m.due_funny_okapi_trust()
		],
		technologies: ['SvelteKit', 'TypeScript', 'TailwindCSS', 'PocketBase', 'NFC Technology'],
		ctaText: m.loved_spare_camel_hint(),
		featuresTitle: m.slow_any_turkey_file(),
		technologiesTitle: m.long_this_mayfly_drop()
	};
</script>

<section class="container mx-auto px-6 py-20" id="projects">
	<!-- Section Header -->
	<div class="mb-16 text-center">
		<h2 class="text-foreground mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
			{messages.sectionTitle}
		</h2>
	</div>

	<!-- Single Column Layout -->
	<div class="mx-auto max-w-4xl space-y-12">
		<!-- Project Info Card -->
		<Card class="border-primary border-l-4">
			<CardHeader>
				<!-- <div class="flex flex-wrap items-center justify-between gap-4"> -->
				<div class="space-y-8">
					<div class="flex items-center justify-center space-x-4">
						<img
							src="/amorees/logo.svg"
							alt="Amorees Logo"
							class="h-8 w-auto object-contain lg:h-12"
						/>
					</div>
					<ThreeDash />
				</div>

				<!-- <Badge variant="secondary" class="text-sm font-medium">
						{messages.status}
					</Badge> -->
				<!-- </div> -->
			</CardHeader>
			<CardContent class="space-y-6">
				<!-- Tagline -->
				<h3 class="text-xl font-semibold md:text-2xl">
					{messages.tagline}
				</h3>

				<!-- Description -->
				<p class="text-lg leading-relaxed">
					{messages.description}
				</p>

				<!-- Features -->
				<div class="space-y-4">
					<h4 class="text-lg font-semibold">{messages.featuresTitle}</h4>
					<div class="space-y-4">
						{#each messages.features as feature, index}
							<div class="flex items-center space-x-3">
								<div
									class="bg-primary text-primary-foreground flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold"
								>
									{index + 1}
								</div>
								<p class="text-sm leading-relaxed">
									{feature}
								</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Technologies -->
				<div class="space-y-4">
					<h4 class="text-lg font-semibold">{messages.technologiesTitle}</h4>
					<div class="flex flex-wrap gap-2">
						{#each messages.technologies as tech}
							<Badge class="text-sm" variant="outline">
								{tech}
							</Badge>
						{/each}
					</div>
				</div>

				<!-- CTA -->
				<div class="pt-4">
					<Button size="lg" class="w-full" href="https://amorees.com" target="_blank">
						{messages.ctaText}
					</Button>
				</div>
			</CardContent>
		</Card>

		<!-- Decorative Elements -->
		<div class="relative">
			<!-- <div class="mx-auto flex w-fit space-x-4">
				<div class="bg-primary h-1 w-16 rounded-full"></div>
				<div class="bg-primary/60 h-1 w-12 rounded-full"></div>
				<div class="bg-primary/30 h-1 w-8 rounded-full"></div>
			</div> -->

			<!-- Floating Elements -->
			<div class="bg-primary/20 absolute -top-4 -right-4 h-8 w-8 animate-pulse rounded-full"></div>
			<div
				class="bg-primary/30 absolute top-1/4 -left-3 h-6 w-6 animate-pulse rounded-full delay-300"
			></div>
			<div
				class="bg-primary/40 absolute -right-2 bottom-1/4 h-4 w-4 animate-pulse rounded-full delay-700"
			></div>
		</div>
	</div>
</section>
