<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';

	interface Team {
		id: number;
		name: string;
		score: number;
		currentBid: number;
	}

	interface Props {
		teams: Team[];
	}

	const messages = {
		title: 'Current Round Bidding',
		position: 'Rank',
		teamName: 'Team',
		bid: 'Bid',
		points: 'pts',
		noBids: 'No teams have placed bids yet'
	};

	let { teams }: Props = $props();

	// Filter teams that have bid and sort by bid amount (highest first)
	const biddingTeams = $derived(
		teams
			.filter((team) => team.currentBid > 0)
			.sort((a, b) => {
				if (b.currentBid !== a.currentBid) {
					return b.currentBid - a.currentBid;
				}
				return a.name.localeCompare(b.name);
			})
	);

	function getRankPosition(index: number, currentBid: number, teams: Team[]): number {
		if (index === 0) return 1;

		// Check if current team has same bid as previous team
		const prevBid = teams[index - 1].currentBid;
		if (currentBid === prevBid) {
			return getRankPosition(index - 1, prevBid, teams);
		}

		return index + 1;
	}

	function getBidStatusEmoji(position: number): string {
		switch (position) {
			case 1:
				return '👑';
			case 2:
				return '⭐';
			case 3:
				return '🔥';
			default:
				return '';
		}
	}
</script>

<Card class="w-full">
	<CardHeader>
		<CardTitle class="text-center">{messages.title}</CardTitle>
	</CardHeader>
	<CardContent>
		{#if biddingTeams.length === 0}
			<div class="text-muted-foreground py-8 text-center">
				<p>{messages.noBids}</p>
			</div>
		{:else}
			<div class="space-y-1">
				<!-- Header -->
				<div class="text-muted-foreground grid grid-cols-4 gap-2 border-b pb-2 text-sm font-medium">
					<div class="text-center">{messages.position}</div>
					<div class="col-span-2">{messages.teamName}</div>
					<div class="text-right">{messages.bid}</div>
				</div>

				<!-- Teams List -->
				{#each biddingTeams as team, index}
					{@const position = getRankPosition(index, team.currentBid, biddingTeams)}
					{@const emoji = getBidStatusEmoji(position)}
					{@const isHighest = position === 1}
					{@const isTied = biddingTeams.filter((t) => t.currentBid === team.currentBid).length > 1}

					<div
						class="hover:bg-muted/50 grid grid-cols-4 gap-2 rounded px-1 py-2 transition-colors {isHighest &&
						!isTied
							? 'border border-yellow-300 bg-yellow-100 dark:bg-yellow-900/20'
							: ''} {isHighest && isTied
							? 'border border-orange-300 bg-orange-100 dark:bg-orange-900/20'
							: ''}"
					>
						<div class="flex items-center justify-center text-center font-semibold">
							{#if emoji}
								<span class="mr-1">{emoji}</span>
							{/if}
							#{position}
							{#if isTied && isHighest}
								<span class="ml-1 text-xs text-orange-600">TIE</span>
							{/if}
						</div>
						<div
							class="col-span-2 font-medium {isHighest && !isTied
								? 'text-yellow-700 dark:text-yellow-400'
								: ''} {isHighest && isTied ? 'text-orange-700 dark:text-orange-400' : ''}"
						>
							{team.name}
						</div>
						<div
							class="text-right font-bold {isHighest && !isTied
								? 'text-yellow-700 dark:text-yellow-400'
								: ''} {isHighest && isTied ? 'text-orange-700 dark:text-orange-400' : ''}"
						>
							{team.currentBid}
							{messages.points}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</CardContent>
</Card>
