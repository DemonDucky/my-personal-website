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
		title: 'Score Ranking',
		position: 'Position',
		teamName: 'Team',
		score: 'Score',
		points: 'pts'
	};

	let { teams }: Props = $props();

	// Sort teams by score (highest first), then by name for ties
	const rankedTeams = $derived(
		[...teams].sort((a, b) => {
			if (b.score !== a.score) {
				return b.score - a.score;
			}
			return a.name.localeCompare(b.name);
		})
	);

	function getRankPosition(index: number, currentScore: number, teams: Team[]): number {
		if (index === 0) return 1;

		// Check if current team has same score as previous team
		const prevScore = teams[index - 1].score;
		if (currentScore === prevScore) {
			return getRankPosition(index - 1, prevScore, teams);
		}

		return index + 1;
	}

	function getMedalEmoji(position: number): string {
		switch (position) {
			case 1:
				return '🥇';
			case 2:
				return '🥈';
			case 3:
				return '🥉';
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
		<div class="space-y-1">
			<!-- Header -->
			<div class="text-muted-foreground grid grid-cols-4 gap-2 border-b pb-2 text-sm font-medium">
				<div class="text-center">{messages.position}</div>
				<div class="col-span-2">{messages.teamName}</div>
				<div class="text-right">{messages.score}</div>
			</div>

			<!-- Teams List -->
			{#each rankedTeams as team, index}
				{@const position = getRankPosition(index, team.score, rankedTeams)}
				{@const medal = getMedalEmoji(position)}
				{@const isLeader = position === 1}

				<div
					class="hover:bg-muted/50 grid grid-cols-4 gap-2 rounded px-1 py-2 transition-colors {isLeader
						? 'bg-primary/10 border-primary/20 border'
						: ''}"
				>
					<div class="flex items-center justify-center text-center font-semibold">
						{#if medal}
							<span class="mr-1">{medal}</span>
						{/if}
						#{position}
					</div>
					<div class="col-span-2 font-medium {isLeader ? 'text-primary' : ''}">
						{team.name}
					</div>
					<div class="text-right font-bold {isLeader ? 'text-primary' : ''}">
						{team.score}
						{messages.points}
					</div>
				</div>
			{/each}
		</div>
	</CardContent>
</Card>
