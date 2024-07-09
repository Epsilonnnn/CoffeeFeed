export interface ILoggerTransport {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	log(value: any): void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error(value: any): void;
}

export class Logger {
	private transport: ILoggerTransport;

	constructor(transport: ILoggerTransport) {
		this.transport = transport;
	}

	log(value: Record<string, unknown>) {
		this.transport.log(value);
	}

	error(value: Record<string, unknown> | Error) {
		if (value instanceof Error) {
			this.transport.error({ stack: value.stack, message: value.message });
			return;
		}

		const stack = new Error().stack;
		this.transport.error({ stack, ...value });
	}
}

export const logger = new Logger(console);
