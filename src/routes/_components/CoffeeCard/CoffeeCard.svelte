<script context="module" lang="ts">
	const notesColors: Record<string, { background: string; color: string }> = {};
</script>

<script lang="ts">
	import { getRandomColorRGB, getTextColorForBg } from '$lib';
	import type { CoffeeCardData } from '$lib/types';

	export let data: CoffeeCardData;

	function getNoteColor(note: string) {
		if (!notesColors[note]) {
			const rgb = getRandomColorRGB();
			notesColors[note] = {
				background: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
				color: getTextColorForBg(rgb)
			};
		}

		return notesColors[note];
	}

	$: notesList = data.notes?.split(', ') || [];
</script>

<div class="card {$$props.class}">
	<picture>
		<img src={data.image} alt={data.blend_name} />
	</picture>
	<div class="intensifier">{data.intensifier}</div>
	<div class="info">
		<div class="origin">{data.origin}</div>
		<h2 class="title">{data.blend_name}</h2>
		<p class="variety">{data.variety}</p>
		<ul class="notes">
			{#each notesList as note}
				<li
					style="background-color: {getNoteColor(note).background}; color: {getNoteColor(note)
						.color}"
				>
					{note}
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.card {
		position: relative;
		max-width: 500px;
		min-width: 200px;
		background-color: #ffffff;
		overflow: hidden;
	}

	.card picture {
		display: block;
		width: 100%;
		aspect-ratio: 1 / 1;
		background-color: #d3d3d3;
	}

	.card picture img {
		display: block;
		width: 100%;
		height: auto;
	}

	.intensifier {
		position: absolute;
		right: 20px;
		top: 20px;
		padding: 8px;
		font-size: 20px;
		color: #ffffff;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.info {
		padding: 20px;
	}

	.notes {
		padding: 0;
		list-style: none;
		white-space: nowrap;
		overflow-x: auto;
	}

	.notes li {
		display: inline-block;
		margin-right: 10px;
		padding: 8px;
	}

	.notes li:last-child {
		margin-right: 0;
	}
</style>
