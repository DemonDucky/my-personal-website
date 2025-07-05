<script lang="ts">
	import type { Post } from '$lib/types/post';
	import * as Alert from '$lib/components/ui/alert';
	import WarningCircle from 'phosphor-svelte/lib/WarningCircle';
	import { m } from '$lib/paraglide/messages';

	interface Props {
		post: Post;
	}

	let { post }: Props = $props();

	const messages = {
		outdatedWarning: m.actual_tired_grebe_gaze(),
		outdatedDescription: m.dull_ok_elk_walk()
	};

	const isPostOlderThanTwoYears = () => {
		const now = new Date();

		// Check updated date first, if not available, check created date
		const dateToCheck = post.updated || post.created;
		const postDate = new Date(dateToCheck);

		// Calculate the difference in milliseconds
		const timeDifference = now.getTime() - postDate.getTime();

		// Convert to years (365.25 days to account for leap years)
		const yearsDifference = timeDifference / (1000 * 60 * 60 * 24 * 365.25);

		return yearsDifference > 2;
	};
</script>

{#if isPostOlderThanTwoYears()}
	<Alert.Root variant="destructive" class="mb-6">
		<WarningCircle class="size-4" />
		<Alert.Title class="font-bold">{messages.outdatedWarning}</Alert.Title>
		<Alert.Description>
			{messages.outdatedDescription}
		</Alert.Description>
	</Alert.Root>
{/if}
