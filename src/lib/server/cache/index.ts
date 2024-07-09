import { env } from '$env/dynamic/private';
import { RedisCache } from './redis';
import { LocalCache } from './local';

export const cache = env.USE_REDIS ? new RedisCache() : new LocalCache();
