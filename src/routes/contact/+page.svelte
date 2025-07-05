<script lang="ts">
	import BreadcrumbContainer from '$lib/components/breadcrumb-container.svelte';
	import CtaFormSection from '$lib/components/cta-form-section.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const messages = {
		title: 'Liên hệ - Lương Tuấn Anh',
		contact: 'Liên hệ',
		description:
			'Liên hệ với mình để thảo luận về dự án web development, marketing digital, hay bất kỳ ý tưởng nào bạn muốn thực hiện. Phản hồi trong vòng 24 giờ.',
		breadcrumbHome: 'Trang chủ',
		breadcrumbContact: 'Liên hệ',
		suitableProjects: {
			title: 'Các Dự Án Phù Hợp',
			projectList: [
				'Thiết kế và lập trình website giới thiệu cho cá nhân/doanh nghiệp nhỏ',
				'Tạo landing page tập trung chuyển đổi cho sản phẩm hoặc dịch vụ',
				'Xây dựng blog cá nhân hỗ trợ viết nội dung, tối ưu SEO, đa ngôn ngữ',
				'Phát triển web app đơn giản: quản lý sự kiện, booking, form đăng ký,...',
				'Thiết kế trang tương tác như mini game, khảo sát, form marketing',
				'Tối ưu tốc độ, giao diện và trải nghiệm người dùng cho website hiện tại',
				'Viết nội dung, tối ưu SEO và triển khai các chiến dịch marketing nhỏ',
				'Tư vấn cấu trúc website, hành trình người dùng và định hướng nội dung',
				'Thiết lập hệ thống đo lường: Google Analytics, Tag Manager, Pixel,...',
				'Thiết kế giao diện đơn giản, dễ dùng, phù hợp với mục tiêu thương hiệu'
			]
		},
		keywords:
			'liên hệ, web developer, marketing executive, dự án web, phát triển website, thiết kế website, tối ưu SEO, triển khai marketing, hệ thống đo lường, giao diện đơn giản, dễ dùng, phù hợp với mục tiêu thương hiệu'
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
		<h1 class="text-foreground mb-8 text-3xl font-bold lg:text-5xl">
			{messages.suitableProjects.title}
		</h1>

		<ul class="space-y-4">
			{#each messages.suitableProjects.projectList as project}
				<li class="flex items-start">
					<span class="text-primary mt-1 mr-3">•</span>
					<span class="text-base leading-relaxed">{project}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- Contact Form Section -->
<CtaFormSection contactForm={data.contactForm} />
