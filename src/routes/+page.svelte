<script lang="ts">
	import AboutMeSection from './about-me-section.svelte';
	import CtaFormSection from '$lib/components/cta-form-section.svelte';
	import FeaturedProjectSection from './featured-project-section.svelte';
	import HeroSection from './hero-section.svelte';
	import WhatIDoSection from './what-i-do-section.svelte';

	const messages = {
		title: 'Lương Tuấn Anh - Web Developer & Marketing Executive',
		description:
			'Một nhà phát triển web với tư duy marketing - mình xây dựng sản phẩm từ giao diện đến chiến lược, kết hợp trải nghiệm người dùng với định vị thương hiệu.',
		keywords:
			'web developer, marketing executive, frontend developer, backend developer, SvelteKit, React, Vue.js, UX/UI design, digital marketing, product development',
		author: 'Lương Tuấn Anh',
		siteName: 'Lương Tuấn Anh Portfolio',
		imageUrl: '/imgs/logo.svg',
		type: 'website',
		locale: 'vi_VN'
	};

	let { data } = $props();

	// Site URL
	const siteUrl = 'https://luongtuananh.com';
	const imageUrl = `${siteUrl}/imgs/logo.svg`;

	// Structured data for SEO
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Lương Tuấn Anh',
		jobTitle: ['Web Developer', 'Marketing Executive'],
		description: messages.description,
		url: siteUrl,
		image: imageUrl,
		sameAs: [
			// Add your social media profiles here
			'https://github.com/demonducky',
			'https://facebook.com/tuananh.luonggg'
		],
		knowsAbout: [
			'Web Development',
			'Marketing Strategy',
			'Frontend Development',
			'Backend Development',
			'User Experience Design',
			'Digital Marketing'
		],
		worksFor: {
			'@type': 'Organization',
			name: 'Freelance'
		}
	};

	// Website structured data
	const websiteStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: messages.siteName,
		url: siteUrl,
		description: messages.description,
		author: {
			'@type': 'Person',
			name: messages.author
		},
		inLanguage: 'vi-VN'
	};
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{messages.title}</title>
	<meta name="title" content={messages.title} />
	<meta name="description" content={messages.description} />
	<meta name="keywords" content={messages.keywords} />
	<meta name="author" content={messages.author} />
	<meta name="robots" content="index, follow" />
	<meta name="language" content="Vietnamese" />
	<meta name="revisit-after" content="7 days" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={messages.type} />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:title" content={messages.title} />
	<meta property="og:description" content={messages.description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:alt" content="Lương Tuấn Anh - Web Developer & Marketing Executive" />
	<meta property="og:site_name" content={messages.siteName} />
	<meta property="og:locale" content={messages.locale} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={siteUrl} />
	<meta name="twitter:title" content={messages.title} />
	<meta name="twitter:description" content={messages.description} />
	<meta name="twitter:image" content={imageUrl} />
	<meta name="twitter:image:alt" content="Lương Tuấn Anh - Web Developer & Marketing Executive" />

	<!-- Additional Meta Tags -->
	<!-- <meta name="theme-color" content="#000000" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" /> -->

	<!-- Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(websiteStructuredData)}</script>`}
</svelte:head>

<main>
	<HeroSection />
	<AboutMeSection />
	<WhatIDoSection />
	<FeaturedProjectSection />
	<CtaFormSection contactForm={data.contactForm} />
</main>
