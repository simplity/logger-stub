/**
 * Logger that provides the three basic logging utilities
 */
export type LoggerStub = {
  /**
   * log some information
   * @param args
   */
  info(...args: any[]): void;
  /**
   * log some error
   * @param args
   */
  error(...args: any[]): void;
  /**
   * log some warning
   * @param args
   */
  warn(...args: any[]): void;
};
/**
 * no output. Use this to suppress all logging..
 */
export const nullLogger: LoggerStub = {
  info(): void {},
  error(): void {},
  warn(): void {},
};

declare const console: LoggerStub;

/**
 * default is to use console or null
 */

let worker: LoggerStub = console || nullLogger;

/**
 * connect the stub to a real logger
 * @param logger connect the stub to app-specific logger
 */
export function connectLogger(logger: LoggerStub): void {
  worker = logger;
}

/**
 *
 * disconnect any logger and reset it to the default logger
 */
export function resetToDefault(): void {
  worker = console || nullLogger;
}

/**
 * logger that uses a stub that cn be connected to actual logger used by the app that uses this library
 */
export const logger: LoggerStub = {
  error(...args) {
    worker.error(args);
  },
  warn(...args) {
    worker.warn(args);
  },
  info(...args) {
    worker.info(args);
  },
};
