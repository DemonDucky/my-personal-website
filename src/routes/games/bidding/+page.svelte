<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import RandomWheel from './RandomWheel.svelte';
	import ScoreRanking from './ScoreRanking.svelte';
	import BiddingRanking from './BiddingRanking.svelte';

	type GamePhase = 'prepare' | 'playing';

	interface Team {
		id: number;
		name: string;
		score: number;
		currentBid: number;
	}

	interface HighestBidder {
		team: Team;
		amount: number;
		hasTie: boolean;
		tiedTeams?: Team[];
	}

	const messages = {
		title: 'Bidding Game',
		teamNamesLabel: 'Team Names/Numbers',
		teamNamesPlaceholder:
			'Enter team names or numbers, one per line\nExample:\n1\n3\n6\n\nOr:\nRed Team\nBlue Team\nGreen Team',
		baseScoreLabel: 'Base Score',
		baseScorePlaceholder: 'Enter base score',
		startGameButton: 'Start Game',
		stopBiddingButton: 'Stop Bidding',
		teamPrefix: 'Team',
		currentScoreLabel: 'Current Score',
		currentBidLabel: 'Current Bid',
		bidPlaceholder: 'Enter bid amount',
		highestBidderTitle: 'Highest Bidder',
		highestBidderDescription: 'won the round with a bid of',
		correctButton: 'Right',
		wrongButton: 'Wrong',
		newRoundButton: 'New Round',
		backToSetupButton: 'Back to Setup',
		confirmBackToSetupTitle: 'Confirm Back to Setup',
		confirmBackToSetupDescription:
			'Are you sure you want to go back to setup? This will reset all current game progress and scores.',
		confirmYes: 'Yes, Go Back',
		confirmNo: 'No, Continue Game'
	};

	let gamePhase = $state<GamePhase>('prepare');
	let teamNamesInput = $state<string>('');
	let baseScore = $state<number>();
	let teams = $state<Team[]>([]);
	let showBiddingResult = $state(false);
	let showRandomWheel = $state(false);
	let showBackToSetupDialog = $state(false);
	let highestBidder = $state<HighestBidder | null>(null);

	// Derived value to check if we have valid team names
	let hasValidTeams = $derived(() => {
		const teamNames = teamNamesInput
			.trim()
			.split('\n')
			.filter((name) => name.trim() !== '');
		return teamNames.length > 0;
	});

	function startGame() {
		const teamNames = teamNamesInput
			.trim()
			.split('\n')
			.filter((name) => name.trim() !== '')
			.map((name) => name.trim());

		if (teamNames.length === 0 || baseScore === undefined || baseScore < 0) {
			return;
		}

		// Create local variable after type guard to ensure TypeScript knows it's a number
		const initialScore = baseScore;

		teams = teamNames.map((name, index) => {
			// If the input is a number, add "Team" prefix, otherwise use as-is
			const isNumber = /^\d+$/.test(name);
			const teamName = isNumber ? `${messages.teamPrefix} ${name}` : name;

			return {
				id: index + 1,
				name: teamName,
				score: initialScore,
				currentBid: 0
			};
		});

		gamePhase = 'playing';
	}

	function stopBidding() {
		const teamsWithBids = teams.filter((team) => team.currentBid > 0);

		if (teamsWithBids.length === 0) {
			return;
		}

		const maxBid = Math.max(...teamsWithBids.map((team) => team.currentBid));
		const tiedTeams = teamsWithBids.filter((team) => team.currentBid === maxBid);

		if (tiedTeams.length > 1) {
			// Multiple teams tied - show random wheel
			highestBidder = {
				team: tiedTeams[0], // placeholder
				amount: maxBid,
				hasTie: true,
				tiedTeams: tiedTeams
			};
			showRandomWheel = true;
		} else if (tiedTeams.length === 1) {
			// Single winner
			highestBidder = {
				team: tiedTeams[0],
				amount: maxBid,
				hasTie: false
			};
			showBiddingResult = true;
		}
	}

	function handleWheelSelection(selectedTeam: Team) {
		if (!highestBidder) return;

		// Update the highestBidder with the wheel selection
		highestBidder = {
			...highestBidder,
			team: selectedTeam,
			hasTie: false
		};

		// Close wheel and show result dialog
		showRandomWheel = false;
		showBiddingResult = true;
	}

	function handleBiddingResult(isCorrect: boolean) {
		if (!highestBidder) return;

		// Create local reference after null check
		const bidder = highestBidder;
		const teamIndex = teams.findIndex((team) => team.id === bidder.team.id);
		if (teamIndex !== -1) {
			if (isCorrect) {
				teams[teamIndex].score += bidder.amount;
			} else {
				teams[teamIndex].score -= bidder.amount;
			}
		}

		// Reset for next round
		teams.forEach((team) => (team.currentBid = 0));
		showBiddingResult = false;
		showRandomWheel = false;
		highestBidder = null;
	}

	function confirmBackToSetup() {
		showBackToSetupDialog = true;
	}

	function backToSetup() {
		gamePhase = 'prepare';
		teams = [];
		teamNamesInput = '';
		baseScore = undefined;
		showBiddingResult = false;
		showRandomWheel = false;
		showBackToSetupDialog = false;
		highestBidder = null;
	}
</script>

<div class="container mx-auto max-w-6xl p-6">
	<h1 class="mb-8 text-center text-3xl font-bold">{messages.title}</h1>

	{#if gamePhase === 'prepare'}
		<div class="mx-auto mb-8 flex max-w-2xl flex-col gap-6">
			<div class="space-y-2">
				<label for="team-names" class="text-sm font-medium">
					{messages.teamNamesLabel}
				</label>
				<Textarea
					id="team-names"
					placeholder={messages.teamNamesPlaceholder}
					bind:value={teamNamesInput}
					rows={6}
					class="min-h-[150px] resize-y"
				/>
			</div>

			<div class="space-y-2">
				<label for="base-score" class="text-sm font-medium">
					{messages.baseScoreLabel}
				</label>
				<Input
					id="base-score"
					type="number"
					min="0"
					placeholder={messages.baseScorePlaceholder}
					bind:value={baseScore}
				/>
			</div>

			<div class="flex justify-center">
				<Button
					onclick={startGame}
					disabled={!hasValidTeams || baseScore === undefined || baseScore < 0}
					class="px-8"
				>
					{messages.startGameButton}
				</Button>
			</div>
		</div>
	{:else if gamePhase === 'playing'}
		<div class="space-y-6">
			<div class="flex justify-center gap-4">
				<Button
					onclick={stopBidding}
					variant="destructive"
					disabled={teams.every((team) => team.currentBid <= 0)}
				>
					{messages.stopBiddingButton}
				</Button>
				<Button onclick={confirmBackToSetup} variant="outline">
					{messages.backToSetupButton}
				</Button>
			</div>

			<!-- Scoreboards Section -->
			<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<ScoreRanking {teams} />
				<BiddingRanking {teams} />
			</div>

			<!-- Teams Bidding Cards -->
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each teams as team (team.id)}
					<Card>
						<CardHeader>
							<CardTitle>{team.name}</CardTitle>
						</CardHeader>
						<CardContent class="space-y-4">
							<div class="text-center">
								<p class="text-muted-foreground mb-1 text-sm">
									{messages.currentScoreLabel}
								</p>
								<p class="text-primary text-2xl font-bold">
									{team.score}
								</p>
							</div>

							<div class="space-y-2">
								<label for="bid-{team.id}" class="text-sm font-medium">
									{messages.currentBidLabel}
								</label>
								<Input
									id="bid-{team.id}"
									type="number"
									min="0"
									max={team.score}
									placeholder={messages.bidPlaceholder}
									bind:value={team.currentBid}
									oninput={(e) => {
										const target = e.target as HTMLInputElement;
										const value = parseInt(target.value) || 0;
										if (value > team.score) {
											team.currentBid = team.score;
										}
									}}
									class={team.currentBid > team.score ? 'border-red-500 focus:border-red-500' : ''}
								/>
								{#if team.currentBid > team.score}
									<p class="text-xs text-red-500">Bid cannot exceed current score ({team.score})</p>
								{/if}
							</div>
						</CardContent>
					</Card>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Random Wheel for Ties -->
	{#if showRandomWheel && highestBidder?.tiedTeams}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div class="bg-background mx-4 w-full max-w-lg rounded-lg p-6">
				<RandomWheel teams={highestBidder.tiedTeams} onSelect={handleWheelSelection} />
			</div>
		</div>
	{/if}

	<!-- Bidding Result Alert Dialog -->
	<AlertDialog.Root bind:open={showBiddingResult}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>{messages.highestBidderTitle}</AlertDialog.Title>
				<AlertDialog.Description>
					{#if highestBidder}
						{highestBidder.team.name}
						{messages.highestBidderDescription}
						{highestBidder.amount} points.
					{/if}
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel onclick={() => handleBiddingResult(false)}>
					{messages.wrongButton}
				</AlertDialog.Cancel>
				<AlertDialog.Action onclick={() => handleBiddingResult(true)}>
					{messages.correctButton}
				</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>

	<!-- Back to Setup Confirmation Dialog -->
	<AlertDialog.Root bind:open={showBackToSetupDialog}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>{messages.confirmBackToSetupTitle}</AlertDialog.Title>
				<AlertDialog.Description>
					{messages.confirmBackToSetupDescription}
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel onclick={() => (showBackToSetupDialog = false)}>
					{messages.confirmNo}
				</AlertDialog.Cancel>
				<AlertDialog.Action onclick={backToSetup}>
					{messages.confirmYes}
				</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
</div>
