import type { RequestHandler } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';
import { CARD_CACHE_NAME } from '$lib/constants';
import { handleJsonResponse } from '$lib/response';
import { logger } from '$lib/logger';
import { getFetchWithRetries } from '$lib/fetchBuilder';
import { cache } from '$lib/server/cache';

export const GET: RequestHandler = async () => {
	try {
		const customFetch = getFetchWithRetries(fetch);

		const [cardData, imgData] = await Promise.all([
			customFetch('https://random-data-api.com/api/coffee/random_coffee').then(handleJsonResponse),
			customFetch('https://loremflickr.com/json/500/500/coffee,bean').then(handleJsonResponse)
		]);

		const resultData = {
			...cardData,
			image: imgData.file
		};

		cache.set(CARD_CACHE_NAME, resultData);

		return json(resultData);
	} catch (err) {
		const currentError = err as Record<string, unknown>;

		logger.error(currentError);

		error((currentError.status as number) ?? 500, {
			message: currentError.message as string
		});
	}
};
