<script lang="ts">
	import { Card, CardContent, CardHeader } from '$lib/components/ui/card/index.js';
	import ThreeDash from '$lib/components/ui/decoration/three-dash.svelte';
	import { m } from '$lib/paraglide/messages';
	import Check from 'phosphor-svelte/lib/Check';

	const messages = {
		sectionTitle: m.muddy_calm_dog_dig(),
		description: [m.watery_dull_racoon_clip()],
		devSide: {
			title: 'Dev Side',
			skills: [
				m.fancy_orange_husky_build(),
				m.smart_loved_panda_slurp(),
				m.frail_patchy_otter_launch(),
				m.keen_wacky_turtle_bake()
			]
		},
		marketingSide: {
			title: 'Brand & Marketing Side',
			skills: [
				m.key_formal_emu_type(),
				m.smart_inner_warthog_endure(),
				m.known_due_lobster_belong(),
				m.just_lower_gecko_hike()
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
								<Check size={18} />
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
								<Check size={18} />
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
