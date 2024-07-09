import { cache } from '$lib/server/cache';
import { CARD_CACHE_NAME } from '$lib/constants';
import { handleJsonResponse } from '$lib/response';
import { logger } from '$lib/logger';
import type { PageServerLoad } from '../../.svelte-kit/types/src/routes/$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const cachedCardData = await cache.get(CARD_CACHE_NAME);

		if (cachedCardData) {
			logger.log({
				message: `Card "${cachedCardData.id}-${cachedCardData.blend_name}" is received from cache`
			});
			return {
				cards: [cachedCardData]
			};
		}

		const cardData = await fetch('/api/coffee').then(handleJsonResponse);

		return {
			cards: [cardData]
		};
	} catch (err) {
		logger.error(err as Error);
		return {
			cards: []
		};
	}
};
