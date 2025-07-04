<script lang="ts">
	import { Button, type ButtonVariant } from '$lib/components/ui/button';
	import List from 'phosphor-svelte/lib/List';
	import X from 'phosphor-svelte/lib/X';
	import { onMount, tick } from 'svelte';
	import { ScrollSmoother } from 'gsap/ScrollSmoother';
	import DarkModeButton from './dark-mode-button.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

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
		skills: 'Kỹ năng',
		blogs: 'Blogs',
		home: 'Trang chủ'
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
		blogs: {
			href: '/blogs',
			label: messages.blogs,
			variant: 'ghost'
		},
		contact: {
			href: '#contact',
			label: messages.contact,
			variant: 'default'
		}
	};

	const nonHomepageNavLinks: Record<
		string,
		{ href: string; label: string; variant: ButtonVariant }
	> = {
		home: {
			href: '/',
			label: messages.home,
			variant: 'ghost'
		},
		blogs: {
			href: '/blogs',
			label: messages.blogs,
			variant: 'ghost'
		}
	};

	let scrollSmoother: ScrollSmoother | undefined = $state(undefined);

	onMount(async () => {
		await tick();
		scrollSmoother = ScrollSmoother.get();
	});
</script>

<header
	class="text-foreground border-border bg-background/50 fixed top-0 z-50 w-full border-b backdrop-blur-md"
>
	<div class="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
		<!-- Logo -->
		<a href="/" class="flex items-center gap-2">
			<img src="/imgs/logo.svg" alt="Logo" class="h-10 w-auto" />
			<span class="text-sm">Lương Tuấn Anh</span>
		</a>

		<!-- Desktop Navigation -->
		<nav class="hidden items-center gap-6 md:flex">
			{#if page.url.pathname === '/'}
				{#each Object.values(navLinks) as link}
					<Button
						variant={link.variant}
						class="cursor-pointer"
						href={link.href}
						onclick={(e) => {
							e.preventDefault();
							if (link.href.startsWith('#')) {
								navigate(link.href);
							} else {
								goto(link.href);
							}
						}}
					>
						{link.label}
					</Button>
				{/each}
			{/if}
			{#if page.url.pathname !== '/'}
				{#each Object.values(nonHomepageNavLinks) as link}
					<Button variant={link.variant} class="cursor-pointer" href={link.href}>
						{link.label}
					</Button>
				{/each}
			{/if}
			<DarkModeButton />
		</nav>

		<!-- Mobile Menu Button -->
		<div class="flex items-center gap-6 md:hidden">
			<DarkModeButton />
			<button
				onclick={(e) => {
					e.preventDefault();
					toggleMenu();
				}}
				class="relative z-10 cursor-pointer transition-transform duration-300"
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
			{#if page.url.pathname === '/'}
				{#each Object.values(navLinks) as link}
					<Button
						class="w-full cursor-pointer"
						variant={link.variant}
						href={link.href}
						onclick={(e) => {
							e.preventDefault();
							if (link.href.startsWith('#')) {
								navigate(link.href);
							} else {
								goto(link.href);
								toggleMenu();
							}
						}}
					>
						{link.label}
					</Button>
				{/each}
			{/if}
			{#if page.url.pathname !== '/'}
				{#each Object.values(nonHomepageNavLinks) as link}
					<Button
						variant={link.variant}
						onclick={() => toggleMenu()}
						class="w-full cursor-pointer"
						href={link.href}
					>
						{link.label}
					</Button>
				{/each}
			{/if}
		</nav>
	</div>
</header>
