<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';

	let { breadcrumbNavigations }: { breadcrumbNavigations: { href: string; label: string }[] } =
		$props();
</script>

<!-- Breadcrumb Navigation -->
<div class="container mx-auto px-6 pt-8">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			{#each breadcrumbNavigations as navigation, index}
				<Breadcrumb.Item>
					{#if index === breadcrumbNavigations.length - 1}
						<Breadcrumb.Page>{navigation.label}</Breadcrumb.Page>
					{:else}
						<Breadcrumb.Link href={navigation.href}>{navigation.label}</Breadcrumb.Link>
					{/if}
				</Breadcrumb.Item>
				{#if index !== breadcrumbNavigations.length - 1}
					<Breadcrumb.Separator />
				{/if}
			{/each}
		</Breadcrumb.List>
	</Breadcrumb.Root>
</div>
