const config = require('./index');

describe('Config tests', () => {
  it('returns a valid config object', () => {
    expect(config).toHaveProperty('port', 3000);
    expect(config).toHaveProperty('env');
    expect(config).toHaveProperty('dbUri');
    expect(config).toHaveProperty('expires', 3600 * 3);
  });
});
