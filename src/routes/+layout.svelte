<script lang="ts">
	import { logger } from '$lib/logger';

	function logError(event: Event) {
		let data: Record<string, unknown> = {};

		if ('message' in event && event.message) {
			data.message = event.message;
		}

		if ('reason' in event && event.reason) {
			if (typeof event.reason === 'string') {
				data.message = event.reason;
			} else {
				data = event.reason as Record<string, unknown>;
			}
		}

		logger.error(data.message ? data : { message: 'Unknown error occurred' });
	}
</script>

<svelte:window on:unhandledrejection={logError} on:error={logError} />

<slot></slot>

<style>
	:global(body) {
		min-height: 100vh;
		margin: 0;
		background-color: #000435;
	}
</style>
