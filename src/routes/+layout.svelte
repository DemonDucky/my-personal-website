<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/header.svelte';
	import { onMount, tick } from 'svelte';
	import gsap from 'gsap';
	import { ScrollSmoother } from 'gsap/ScrollSmoother';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { localizeAndRemoveEndTrailingSlash } from '$lib/utils';
	import { locales } from '$lib/paraglide/runtime';
	import { page } from '$app/state';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { ModeWatcher } from 'mode-watcher';
	import { afterNavigate, disableScrollHandling } from '$app/navigation';
	let { children } = $props();

	onMount(() => {
		// Register both plugins as required
		gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

		// Create the ScrollSmoother before any ScrollTriggers
		ScrollSmoother.create({
			wrapper: '#smooth-wrapper',
			content: '#smooth-content',
			normalizeScroll: true,
			smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
			effects: true, // looks for data-speed and data-lag attributes on elements
			smoothTouch: 0.1 // much shorter smoothing time on touch devices,
		});
	});

	const siteUrl = 'https://luongtuananh.com';
</script>

<svelte:head>
	{#each locales as locale}
		<link
			rel="alternate"
			href={siteUrl + localizeAndRemoveEndTrailingSlash(page.url.pathname, { locale })}
			hreflang={locale}
		/>
	{/each}
	<link
		rel="alternate"
		href={siteUrl + localizeAndRemoveEndTrailingSlash(page.url.pathname, { locale: 'en' })}
		hreflang="x-default"
	/>
	<link rel="canonical" href={siteUrl + localizeAndRemoveEndTrailingSlash(page.url.pathname)} />

	<meta property="og:locale" content="vi_VN" />
	<meta property="og:locale:alternate" content="en_US" />
</svelte:head>

<!-- The proper structure as per ScrollSmoother docs -->
<Header />

<div style="display:none">
	{#each locales as locale}
		<a href={localizeAndRemoveEndTrailingSlash(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>

<div id="smooth-wrapper">
	<div id="smooth-content">
		<!-- ALL YOUR CONTENT HERE -->
		<main class="bg-background text-foreground min-h-screen pt-16">
			{@render children()}
		</main>
	</div>
</div>
<ModeWatcher defaultMode="light" />
<Toaster />

<!-- position: fixed elements can go outside if needed -->
