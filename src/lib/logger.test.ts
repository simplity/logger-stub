import { expect, jest, test } from '@jest/globals';
import {
  LoggerStub,
  connectLogger,
  logger,
  nullLogger,
  resetToDefault,
} from './logger';

test('test usage of different loggers', () => {
  doTest(console);
  const testLogger: LoggerStub = {
    info() {},
    error() {},
    warn() {},
  };

  connectLogger(testLogger);

  doTest(testLogger);

  //const c = global.console;
  //@ts-ignore
  global.console = undefined;
  resetToDefault();
  doTest(nullLogger);
});

function doTest(obj: any) {
  let spy = jest.spyOn(obj, 'info');
  logger.info('one');
  expect(spy).toBeCalledWith(['one']);

  spy = jest.spyOn(obj, 'warn');
  logger.warn(2);
  expect(spy).toBeCalledWith([2]);

  spy = jest.spyOn(obj, 'error');
  logger.error('one', 'two');
  expect(spy).toBeCalledWith(['one', 'two']);
}
