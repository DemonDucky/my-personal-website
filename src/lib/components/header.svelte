<script lang="ts">
	import { Button, type ButtonVariant } from '$lib/components/ui/button';
	import List from 'phosphor-svelte/lib/List';
	import X from 'phosphor-svelte/lib/X';
	import DarkModeButton from './dark-mode-button.svelte';
	import { getLocale, setLocale } from '$lib/paraglide/runtime.js';
	import { page } from '$app/state';
	import type { Language, Translation } from '$lib/types/post';
	import { localizeAndRemoveEndTrailingSlash } from '$lib/utils';
	import { m } from '$lib/paraglide/messages';
	let isOpen = $state(false);
	let currentLocale = $state(getLocale());

	const toggleMenu = () => {
		isOpen = !isOpen;
	};

	const switchLanguage = () => {
		const newLocale: Language = currentLocale === 'en' ? 'vi' : 'en';
		const translations = page.data.translations as Translation[];

		const newHref = translations && translations.find((translation) => newLocale in translation);

		if (newHref) {
			const segments = page.url.pathname.split('/');
			segments[segments.length - 1] = newHref[newLocale];
			const localizedHref = localizeAndRemoveEndTrailingSlash(segments.join('/'), {
				locale: newLocale
			});
			window.location.href = localizedHref;
		} else {
			setLocale(newLocale);
			currentLocale = newLocale;
		}
	};

	const messages = {
		menu: m.yummy_next_finch_beam(),
		close: m.muddy_teal_salmon_embrace(),
		contact: m.mean_bland_mantis_build(),
		blogs: 'Blogs',
		home: m.basic_even_bison_find(),
		switchLanguage: m.agent_nice_toucan_dart(),
		name: 'Lương Tuấn Anh'
	};

	const languageConfig = {
		en: { flag: '🌐', name: 'English' },
		vi: { flag: '🇻🇳', name: 'Tiếng Việt' }
	};

	const navLinks: Record<string, { href: string; label: string; variant: ButtonVariant }> = {
		home: {
			href: '/',
			label: messages.home,
			variant: 'ghost'
		},
		blogs: {
			href: '/blogs',
			label: messages.blogs,
			variant: 'ghost'
		},
		contact: {
			href: '/contact',
			label: messages.contact,
			variant: 'default'
		}
	};
</script>

<header
	class="text-foreground border-border bg-background/50 fixed top-0 z-50 w-full border-b backdrop-blur-md"
>
	<div class="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
		<!-- Logo -->
		<Button variant="link" href="/" class="flex items-center gap-2 hover:no-underline">
			<img src="/imgs/logo.svg" alt="Logo" class="h-10 w-auto" />
			<span class="hidden text-sm sm:block">{messages.name}</span>
		</Button>

		<!-- Desktop Navigation -->
		<nav class="hidden items-center gap-6 md:flex">
			{#each Object.values(navLinks) as link}
				<Button variant={link.variant} class="cursor-pointer" href={link.href}>
					{link.label}
				</Button>
			{/each}
			<button
				onclick={switchLanguage}
				class="hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors"
				aria-label={messages.switchLanguage}
				title={languageConfig[currentLocale === 'en' ? 'vi' : 'en'].name}
			>
				<span class="text-lg">{languageConfig[currentLocale].flag}</span>
			</button>
			<DarkModeButton />
		</nav>

		<!-- Mobile Menu Button -->
		<div class="flex items-center gap-6 md:hidden">
			<button
				onclick={switchLanguage}
				class="hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors"
				aria-label={messages.switchLanguage}
				title={languageConfig[currentLocale === 'en' ? 'vi' : 'en'].name}
			>
				<span class="text-lg">{languageConfig[currentLocale].flag}</span>
			</button>
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
			{#each Object.values(navLinks) as link}
				<Button
					class="w-full cursor-pointer"
					variant={link.variant}
					href={link.href}
					onclick={() => toggleMenu()}
				>
					{link.label}
				</Button>
			{/each}
		</nav>
	</div>
</header>
