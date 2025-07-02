<script lang="ts">
	import { Button, type ButtonVariant } from '$lib/components/ui/button';
	import List from 'phosphor-svelte/lib/List';
	import X from 'phosphor-svelte/lib/X';
	import { onMount, tick } from 'svelte';
	import { ScrollSmoother } from 'gsap/ScrollSmoother';

	let isOpen = $state(false);

	const toggleMenu = () => {
		isOpen = !isOpen;
	};

	const navigate = (href: string) => {
		toggleMenu();
		scrollSmoother?.scrollTo(href, true);
	};
	const messages = {
		menu: 'Menu',
		close: 'Đóng menu',
		contact: 'Liên hệ',
		about: 'Giới thiệu',
		projects: 'Dự án',
		skills: 'Kỹ năng'
	};

	const navLinks: Record<string, { href: string; label: string; variant: ButtonVariant }> = {
		about: {
			href: '#about',
			label: messages.about,
			variant: 'ghost'
		},
		skills: {
			href: '#skills',
			label: messages.skills,
			variant: 'ghost'
		},
		projects: {
			href: '#projects',
			label: messages.projects,
			variant: 'ghost'
		},
		contact: {
			href: '#contact',
			label: messages.contact,
			variant: 'default'
		}
	};

	let scrollSmoother: ScrollSmoother | undefined = $state(undefined);

	onMount(async () => {
		await tick();
		scrollSmoother = ScrollSmoother.get();
	});
</script>

<header
	class="text-foreground border-border bg-background/50 sticky top-0 z-50 w-full border-b backdrop-blur-md"
>
	<div class="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
		<!-- Logo -->
		<a href="/" class="flex items-center gap-2">
			<img src="/imgs/logo.svg" alt="Logo" class="h-10 w-auto" />
		</a>

		<!-- Desktop Navigation -->
		<nav class="hidden items-center gap-6 md:flex">
			{#each Object.values(navLinks) as link}
				<Button variant={link.variant} class="cursor-pointer" onclick={() => navigate(link.href)}>
					{link.label}
				</Button>
			{/each}
		</nav>

		<!-- Mobile Menu Button -->
		<button
			onclick={(e) => {
				e.preventDefault();
				toggleMenu();
			}}
			class="relative z-10 cursor-pointer transition-transform duration-300 md:hidden"
			aria-label={isOpen ? messages.close : messages.menu}
			aria-expanded={isOpen}
		>
			{#if isOpen}
				<X size={24} />
			{:else}
				<List size={24} />
			{/if}
		</button>
	</div>

	<!-- Mobile Navigation -->
	<div
		class="container mx-auto overflow-hidden px-4 py-4 transition-all duration-300 ease-in-out md:hidden"
		style:max-height={isOpen ? '300px' : '0'}
		style:opacity={isOpen ? '1' : '0'}
		style:padding-top={isOpen ? '1rem' : '0'}
		style:padding-bottom={isOpen ? '1rem' : '0'}
	>
		<nav class="flex flex-col space-y-4">
			{#each Object.values(navLinks) as link}
				<Button
					class="w-full cursor-pointer"
					variant={link.variant}
					onclick={() => navigate(link.href)}
				>
					{link.label}
				</Button>
			{/each}
		</nav>
	</div>
</header>
