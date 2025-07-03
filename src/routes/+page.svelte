<script lang="ts">
	import AboutMeSection from './about-me-section.svelte';
	import CtaFormSection from './cta-form-section.svelte';
	import FeaturedProjectSection from './featured-project-section.svelte';
	import HeroSection from './hero-section.svelte';
	import WhatIDoSection from './what-i-do-section.svelte';

	const messages = {
		title: 'Lương Tuấn Anh - Web Developer & Marketing Executive',
		description:
			'Một nhà phát triển web với tư duy marketing - mình xây dựng sản phẩm từ giao diện đến chiến lược, kết hợp trải nghiệm người dùng với định vị thương hiệu.'
	};

	let { data } = $props();
</script>

<svelte:head>
	<title>{messages.title}</title>
	<meta name="description" content={messages.description} />
	<meta property="og:title" content={messages.title} />
	<meta property="og:description" content={messages.description} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={messages.title} />
	<meta name="twitter:description" content={messages.description} />
</svelte:head>

<HeroSection />
<AboutMeSection />
<WhatIDoSection />
<FeaturedProjectSection />
<CtaFormSection contactForm={data.contactForm} />
