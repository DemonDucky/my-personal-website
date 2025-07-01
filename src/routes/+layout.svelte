<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/header.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollSmoother } from 'gsap/ScrollSmoother';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	let { children } = $props();

	onMount(() => {
		// Register both plugins as required
		gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

		// Create the ScrollSmoother before any ScrollTriggers
		ScrollSmoother.create({
			wrapper: '#smooth-wrapper',
			content: '#smooth-content',
			smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
			effects: true, // looks for data-speed and data-lag attributes on elements
			smoothTouch: 0.1 // much shorter smoothing time on touch devices
		});
	});
</script>

<!-- The proper structure as per ScrollSmoother docs -->
<Header />

<div id="smooth-wrapper" class="mt-16">
	<div id="smooth-content">
		<!-- ALL YOUR CONTENT HERE -->

		<main class="bg-background text-foreground flex min-h-screen flex-col">
			{@render children()}
		</main>
	</div>
</div>

<!-- position: fixed elements can go outside if needed -->

<style>
	/* The wrapper serves as the viewport */
	#smooth-wrapper {
		overflow: hidden;
		position: fixed;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
	}
</style>
