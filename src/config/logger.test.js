const logger = require('./logger');

describe('Logger', () => {
  it('returns a logger instance', () => {
    expect(logger.debug).toBeDefined();
    expect(logger.info).toBeDefined();
    expect(logger.warn).toBeDefined();
    expect(logger.error).toBeDefined();
  });
});
