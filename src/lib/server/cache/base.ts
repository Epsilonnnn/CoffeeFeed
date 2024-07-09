export interface ICache {
	get(key: string): Promise<Record<string, unknown> | undefined>;
	set(key: string, value: Record<string, unknown>): Promise<void>;
}
