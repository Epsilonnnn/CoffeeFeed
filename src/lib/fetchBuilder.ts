import fetchBuilder from 'fetch-retry';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getFetchWithRetries(fetch: (input: any, init?: any) => Promise<any>) {
	return fetchBuilder(fetch, {
		retries: 3,
		retryDelay: 500
	});
}
