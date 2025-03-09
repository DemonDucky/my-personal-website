<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import type { HistoriesResponse, Transaction } from '$lib/tpbank';
	import { onMount } from 'svelte';

	// Props from loader (typed via SvelteKit)
	// export let data: { data?: HistoriesResponse; error?: string };
	const { data } = $props();

	// Reactive state with Svelte 5 runes
	let transactions = $state<Transaction[]>(data?.data?.transactionInfos || []);
	let searchTerm = $state('');
	let loading = $state(false);
	let error = $state(data?.error || null);

	// Refresh data function
	async function refreshData() {
		loading = true;
		try {
			const response = await fetch(
				'/api/histories?Authorization=' + localStorage.getItem('Authorization')
			);
			if (!response.ok) throw new Error('Failed to fetch transactions');
			const newData: HistoriesResponse = await response.json();
			console.log(newData);
			transactions = newData.transactionInfos || [];
			error = null;
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred';
		} finally {
			loading = false;
		}
	}

	// Derived values with Svelte 5 runes
	let filteredTransactions = $derived(
		searchTerm
			? transactions.filter((tx) => tx.description.toLowerCase().includes(searchTerm.toLowerCase()))
			: transactions
	);

	let currentBalance = $derived(
		transactions.length > 0 ? parseFloat(transactions[0].runningBalance) : 0
	);

	let totalCredits = $derived(
		transactions
			.filter((tx) => tx.creditDebitIndicator === 'CRDT')
			.reduce((sum, tx) => sum + parseFloat(tx.amount), 0)
	);

	let totalDebits = $derived(
		transactions
			.filter((tx) => tx.creditDebitIndicator === 'DBIT')
			.reduce((sum, tx) => sum + parseFloat(tx.amount), 0)
	);

	// Utility to format numbers
	function formatNumber(num: number): string {
		return num.toLocaleString('vi-VN', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		});
	}
</script>

<main class="mx-auto max-w-6xl p-6">
	<h1 class="mb-6 text-center text-3xl font-bold">Transaction Dashboard</h1>

	<!-- State Handling -->
	{#if loading}
		<p class="text-center text-gray-500">Loading transactions...</p>
	{:else if error}
		<p class="text-center text-red-500">{error}</p>
	{:else}
		<!-- Summary Section -->
		<div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
			<div class="rounded-lg bg-gray-100 p-4 text-center">
				<h3 class="text-lg font-semibold">Current Balance</h3>
				<p class="text-xl font-bold">{formatNumber(currentBalance)} VND</p>
			</div>
			<div class="rounded-lg bg-gray-100 p-4 text-center">
				<h3 class="text-lg font-semibold">Total Credits</h3>
				<p class="text-xl font-bold text-green-600">{formatNumber(totalCredits)} VND</p>
			</div>
			<div class="rounded-lg bg-gray-100 p-4 text-center">
				<h3 class="text-lg font-semibold">Total Debits</h3>
				<p class="text-xl font-bold text-red-600">{formatNumber(totalDebits)} VND</p>
			</div>
		</div>

		<!-- Search Bar -->
		<input
			type="text"
			placeholder="Search by description"
			bind:value={searchTerm}
			class="mb-4 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>

		<!-- Transaction Table -->
		{#if filteredTransactions.length === 0}
			<p class="text-center text-gray-500">
				{searchTerm ? 'No matching transactions' : 'No transactions available'}
			</p>
		{:else}
			<table class="w-full border-collapse">
				<thead>
					<tr class="bg-gray-200">
						<th class="p-2 text-left">Date</th>
						<th class="p-2 text-left">Description</th>
						<th class="p-2 text-right">Amount</th>
						<th class="p-2 text-right">Balance</th>
					</tr>
				</thead>
				<tbody>
					{#each filteredTransactions as tx}
						<tr class="border-b">
							<td class="p-2">{new Date(tx.bookingDate).toLocaleDateString('en-US')}</td>
							<td class="p-2">{tx.description}</td>
							<td
								class="p-2 text-right {tx.creditDebitIndicator === 'CRDT'
									? 'text-green-600'
									: 'text-red-600'}"
							>
								{tx.creditDebitIndicator === 'CRDT' ? '+' : '-'}
								{formatNumber(parseFloat(tx.amount))} VND
							</td>
							<td class="p-2 text-right">{formatNumber(parseFloat(tx.runningBalance))} VND</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	{/if}

	<!-- Refresh Button -->
	<button
		onclick={refreshData}
		disabled={loading}
		class="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
	>
		{loading ? 'Refreshing...' : 'Refresh'}
	</button>
</main>
