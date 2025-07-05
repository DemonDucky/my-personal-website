<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Card, CardContent } from '$lib/components/ui/card/index.js';
	import { m } from '$lib/paraglide/messages';

	const messages = {
		sectionTitle: m.swift_safe_gopher_tap(),
		intro: m.raw_cuddly_gecko_roar(),
		motivation: m.gray_big_panda_radiate(),
		background: m.direct_yummy_goldfish_adore(),
		firstProject: {
			title: m.due_novel_loris_fade(),
			description: m.upper_mad_skate_lend(),
			impact: m.whole_lofty_larva_fall()
		},
		lessons: [
			m.known_equal_termite_talk(),
			m.free_still_rooster_bless(),
			m.plain_few_midge_bubble()
		],
		currentFocus: m.icy_last_dingo_slurp(),
		focusAreas: [m.born_spry_midge_aid(), m.mushy_wise_shad_evoke(), m.ok_trite_maggot_talk()]
	};
</script>

<section class="container mx-auto px-6 py-20" id="about">
	<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
		<!-- Content -->
		<div class="max-w-2xl space-y-8">
			<!-- Section Title -->
			<div class="space-y-6">
				<h2 class="text-foreground text-3xl font-bold md:text-4xl lg:text-5xl">
					{messages.sectionTitle}
				</h2>

				<!-- <div class="flex flex-wrap gap-2">
					{#each messages.specialties as specialty}
						<Badge variant="secondary" class="text-sm font-medium">
							{specialty}
						</Badge>
					{/each}
				</div> -->
			</div>

			<!-- Story Introduction -->
			<div class="space-y-6">
				<p class="text-muted-foreground text-lg leading-relaxed md:text-xl">
					{messages.intro}
				</p>
				<blockquote class="border-primary border-l-4 pl-6">
					<p class="text-xl leading-relaxed font-medium italic md:text-2xl">
						"{messages.motivation}"
					</p>
				</blockquote>
			</div>

			<!-- Background -->
			<p class="text-muted-foreground text-lg leading-relaxed md:text-xl">
				{messages.background}
			</p>

			<!-- Decorative Elements -->
			<div class="flex space-x-4 pt-4">
				<div class="bg-primary h-1 w-12 rounded-full"></div>
				<div class="bg-primary/60 h-1 w-8 rounded-full"></div>
				<div class="bg-primary/30 h-1 w-4 rounded-full"></div>
			</div>
		</div>

		<!-- First Project & Lessons -->
		<div class="">
			<div class="space-y-6">
				<!-- First Project Card -->
				<Card class="border-primary border-l-4">
					<CardContent class="p-6">
						<h3 class="mb-4 text-xl font-semibold">{messages.firstProject.title}</h3>
						<p class="text-muted-foreground mb-4 leading-relaxed">
							{messages.firstProject.description}
						</p>
						<p class="text-sm font-medium">{messages.firstProject.impact}</p>
					</CardContent>
				</Card>

				<!-- Lessons Learned -->
				<div class="space-y-4">
					{#each messages.lessons as lesson, index}
						<div class="flex items-center space-x-4">
							<div
								class="bg-primary text-primary-foreground flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold"
							>
								{index + 1}
							</div>
							<p class="leading-relaxed">
								{lesson}
							</p>
						</div>
					{/each}
				</div>

				<!-- Current Focus -->
				<div class="">
					<p class="text-muted-foreground mb-4 leading-relaxed">
						{messages.currentFocus}
					</p>
					<div class="flex flex-wrap gap-2">
						{#each messages.focusAreas as area}
							<Badge class="text-sm">
								{area}
							</Badge>
						{/each}
					</div>
				</div>

				<!-- Floating Decorative Elements -->
				<div class="relative">
					<div
						class="bg-primary/20 absolute -top-4 -right-4 h-6 w-6 animate-pulse rounded-full"
					></div>
					<div
						class="bg-primary/30 absolute top-1/4 -left-3 h-4 w-4 animate-pulse rounded-full delay-300"
					></div>
					<div
						class="bg-primary/40 absolute -right-2 bottom-1/4 h-3 w-3 animate-pulse rounded-full delay-700"
					></div>
				</div>
			</div>
		</div>
	</div>
</section>
