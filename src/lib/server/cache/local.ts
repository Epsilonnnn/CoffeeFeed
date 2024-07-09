import type { ICache } from '$lib/server/cache/base';
import { logger } from '$lib/logger';

const STORAGE: Record<string, Record<string, unknown>> = {};

export class LocalCache implements ICache {
	constructor() {
		logger.log({ message: 'Local cache running' });
	}

	public async get(key: string): Promise<Record<string, unknown> | undefined> {
		return Promise.resolve(STORAGE[key]);
	}

	public async set(key: string, value: Record<string, unknown>) {
		STORAGE[key] = value;
	}
}
