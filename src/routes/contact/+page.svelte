<script lang="ts">
	import BreadcrumbContainer from '$lib/components/breadcrumb-container.svelte';
	import CtaFormSection from '$lib/components/cta-form-section.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const messages = {
		title: m.any_curly_fireant_empower(),
		contact: m.lower_bad_albatross_hush(),
		description: m.honest_tired_albatross_treasure(),
		breadcrumbHome: m.agent_odd_orangutan_nudge(),
		breadcrumbContact: m.lower_bad_albatross_hush(),
		suitableProjects: {
			title: m.teal_plain_felix_adore(),
			projectList: [
				m.zesty_close_cuckoo_cure(),
				m.elegant_home_earthworm_sail(),
				m.house_vexed_swallow_trip(),
				m.odd_game_toad_aid(),
				m.green_calm_mantis_sprout(),
				m.kind_watery_cockroach_drum(),
				m.raw_patient_piranha_hint(),
				m.awful_cozy_sloth_list(),
				m.weird_happy_pig_twist(),
				m.round_happy_niklas_amaze()
			]
		},
		keywords: m.teal_bright_marmot_pop()
	};

	// Structured data for contact page
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		name: messages.contact,
		description: messages.description,
		url: 'https://luongtuananh.com/contact',
		mainEntity: {
			'@type': 'Person',
			name: 'Lương Tuấn Anh',
			jobTitle: 'Web Developer & Marketing Executive',
			email: 'contact@luongtuananh.com',
			url: 'https://luongtuananh.com',
			sameAs: ['https://github.com/demonducky', 'https://facebook.com/tuananh.luonggg']
		}
	};
</script>

<svelte:head>
	<title>{messages.title}</title>
	<meta name="description" content={messages.description} />

	<!-- Open Graph Tags -->
	<meta property="og:title" content={messages.title} />
	<meta property="og:description" content={messages.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://luongtuananh.com/contact" />
	<meta property="og:site_name" content="Lương Tuấn Anh" />

	<!-- Twitter Card Tags -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={messages.title} />
	<meta name="twitter:description" content={messages.description} />

	<!-- Additional SEO Meta Tags -->
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Lương Tuấn Anh" />
	<meta name="keywords" content={messages.keywords} />

	<!-- Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
</svelte:head>

<!-- Breadcrumb Navigation -->
<BreadcrumbContainer
	breadcrumbNavigations={[
		{ href: '/', label: messages.breadcrumbHome },
		{ href: '/contact', label: messages.breadcrumbContact }
	]}
/>

<!-- Suitable Projects Section -->
<section class="container mx-auto px-6 py-8" aria-label="Suitable Projects">
	<div class="mx-auto max-w-4xl">
		<h1 class="text-foreground mb-8 text-center text-3xl font-bold lg:text-5xl">
			{messages.suitableProjects.title}
		</h1>

		<ul class="space-y-4">
			{#each messages.suitableProjects.projectList as project}
				<li class="flex w-full items-center">
					<span class="text-primary mt-1 mr-3">•</span>
					<span class="text-base leading-relaxed">{project}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- Contact Form Section -->
<CtaFormSection contactForm={data.contactForm} />
