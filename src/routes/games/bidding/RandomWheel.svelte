<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';

	interface Team {
		id: number;
		name: string;
		score: number;
		currentBid: number;
	}

	interface Props {
		teams: Team[];
		onSelect: (team: Team) => void;
	}

	const messages = {
		title: 'Team Selection',
		subtitle: 'Multiple teams tied! Rolling to reveal the winner...',
		rollButton: 'Roll!',
		result: 'Winner:'
	};

	let { teams, onSelect }: Props = $props();

	let isRolling = $state(false);
	let selectedTeam = $state<Team | null>(null);
	let highlightedTeamId = $state<number | null>(null);
	let showResult = $state(false);

	function rollForWinner() {
		isRolling = true;
		selectedTeam = null;
		showResult = false;
		highlightedTeamId = null;

		// Select random winner
		const randomIndex = Math.floor(Math.random() * teams.length);
		const winner = teams[randomIndex];

		// Animation parameters
		let animationSpeed = 80 + Math.floor(Math.random() * 40); // Start fast with some randomness (80-120ms)
		const slowDownFactor = 1.15 + Math.random() * 0.1; // Random slowdown factor (1.15-1.25)
		const totalCycles = 25 + Math.floor(Math.random() * 20); // Much longer animation (25-44 cycles)
		let cycleCount = 0;

		function animateHighlight() {
			// Highlight random team (but bias towards winner in final cycles)
			let randomTeamIndex;
			if (cycleCount > totalCycles - 5) {
				// In final 5 cycles, occasionally show the winner to build suspense
				randomTeamIndex =
					Math.random() < 0.4 ? randomIndex : Math.floor(Math.random() * teams.length);
			} else {
				// Pure random selection
				randomTeamIndex = Math.floor(Math.random() * teams.length);
			}

			highlightedTeamId = teams[randomTeamIndex].id;

			cycleCount++;

			// Gradually slow down
			if (cycleCount > totalCycles - 8) {
				animationSpeed *= slowDownFactor;
			}

			if (cycleCount < totalCycles) {
				setTimeout(animateHighlight, animationSpeed);
			} else {
				// Stop at winner
				highlightedTeamId = winner.id;
				selectedTeam = winner;

				setTimeout(() => {
					showResult = true;
					isRolling = false;
				}, 500);

				setTimeout(() => {
					onSelect(winner);
				}, 2000);
			}
		}

		// Start animation
		setTimeout(animateHighlight, animationSpeed);
	}
</script>

<div class="flex flex-col items-center space-y-6">
	<Card class="w-full max-w-lg">
		<CardHeader class="text-center">
			<CardTitle>{messages.title}</CardTitle>
			<p class="text-muted-foreground text-sm">{messages.subtitle}</p>
		</CardHeader>
		<CardContent class="flex flex-col items-center space-y-6">
			<!-- Teams Grid -->
			<div class="w-full">
				<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
					{#each teams as team}
						<div
							class="flex h-16 items-center justify-center rounded-lg border-2 px-3 py-2 text-center text-sm font-medium transition-all duration-200 {highlightedTeamId ===
							team.id
								? 'border-primary bg-primary text-primary-foreground scale-105 shadow-lg'
								: 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'}"
						>
							{team.name}
						</div>
					{/each}
				</div>
			</div>

			<!-- Winner Result -->
			{#if selectedTeam && showResult}
				<div class="space-y-2 text-center">
					<div class="text-2xl">🎉</div>
					<p class="text-primary text-lg font-semibold">
						{messages.result}
						{selectedTeam.name}!
					</p>
					<div class="text-2xl">🎊</div>
				</div>
			{/if}

			<!-- Controls -->
			{#if !showResult}
				<Button onclick={rollForWinner} disabled={isRolling} class="px-8">
					{isRolling ? 'Rolling...' : messages.rollButton}
				</Button>
			{/if}
		</CardContent>
	</Card>
</div>

<style>
	@keyframes bounce {
		0%,
		20%,
		53%,
		80%,
		100% {
			transform: translate(0, 0);
		}
		40%,
		43% {
			transform: translate(0, -15px);
		}
		70% {
			transform: translate(0, -7px);
		}
	}
</style>
