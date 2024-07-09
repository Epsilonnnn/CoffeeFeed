import { createClient } from 'redis';
import { logger } from '$lib/logger';
import type { ICache } from './base';

let client: ReturnType<typeof createClient>;

export class RedisCache implements ICache {
	private client: ReturnType<typeof createClient>;

	constructor() {
		logger.log({ message: 'Redis cache running' });

		if (!client) {
			client = createClient()
				// @ts-expect-error bad typing
				.on('error', (err) => logger.error(err))
				.connect();
		}

		this.client = client;
	}

	public async get(key: string): Promise<Record<string, unknown> | undefined> {
		const connectedClient = await this.client;
		const val = await connectedClient.get(key);

		if (val) {
			return JSON.parse(val);
		}

		return undefined;
	}

	public async set(key: string, value: Record<string, unknown>) {
		const connectedClient = await this.client;
		connectedClient.set(key, JSON.stringify(value));
	}
}
