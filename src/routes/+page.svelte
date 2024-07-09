<script context="module" lang="ts">
	const IDLE_TIME = 30 * 1000; // 30 sec
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import VirtualScroll from 'svelte-virtual-scroll-list';
	import { logger } from '$lib/logger';
	import { handleJsonResponse } from '$lib/response';
	import type { CoffeeCardData } from '$lib/types';
	import CoffeeCard from './_components/CoffeeCard/CoffeeCard.svelte';

	export let data: { cards: CoffeeCardData[] };

	const isLoading = writable(false);

	const cards = writable<CoffeeCardData[]>(data.cards);
	function addCard(card: CoffeeCardData) {
		cards.update((items) => [...items, card]);
	}

	async function loadCard() {
		if ($isLoading === true) {
			return;
		}

		isLoading.set(true);
		try {
			const cardData = await fetch('/api/coffee').then(handleJsonResponse);
			addCard(cardData as CoffeeCardData);
		} catch (err) {
			logger.error(err as Error);
		}
		isLoading.set(false);
	}

	let idleInterval: ReturnType<typeof setInterval>;

	function onIdleEnd() {
		clearInterval(idleInterval);
		idleInterval = setInterval(loadCard, IDLE_TIME);
	}

	onMount(() => {
		idleInterval = setInterval(loadCard, IDLE_TIME);
		return () => clearInterval(idleInterval);
	});
</script>

<svelte:body on:click={onIdleEnd} on:keydown={onIdleEnd} on:scroll={onIdleEnd} />

<div class="container">
	<VirtualScroll data={$cards} key="id" pageMode={true} estimateSize={700} keeps={5} let:data>
		<CoffeeCard {data} class="listCard" />
		<button slot="footer" class="button" on:click={loadCard} disabled={$isLoading}>
			{#if $isLoading}
				<span class="loader" />
			{:else}
				<span class="iconContainer" />
			{/if}
		</button>
	</VirtualScroll>
</div>

<style>
	.container {
		padding: 20px 5px;
	}

	.button {
		padding: 20px;
		background-color: #ff0000;
		border-radius: 100%;
		outline: none;
		border: none;
	}

	.button:hover {
		cursor: pointer;
		background-color: #8b0000;
	}

	.button:disabled,
	.button:disabled:hover {
		background-color: #808080;
		cursor: not-allowed;
	}

	.iconContainer {
		display: block;
		position: relative;
		height: 20px;
		width: 20px;
	}

	.iconContainer:before {
		display: block;
		position: absolute;
		content: '';
		top: 0;
		bottom: 0;
		width: 0;
		left: calc(50% - 1px);
		border-right: 2px solid #ffffff;
	}

	.iconContainer:after {
		display: block;
		position: absolute;
		content: '';
		left: 0;
		right: 0;
		top: calc(50% - 1px);
		height: 0;
		border-bottom: 2px solid #ffffff;
	}

	@keyframes spinner {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.loader {
		display: block;
		height: 20px;
		width: 20px;
		border-bottom: 3px solid #ffffff;
		border-left: 3px solid #ffffff;
		border-radius: 50%;
		animation: spinner 2s linear infinite;
	}

	:global(.listCard) {
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 30px;
	}

	[slot='footer'] {
		display: block;
		margin-left: auto;
		margin-right: auto;
	}
</style>
