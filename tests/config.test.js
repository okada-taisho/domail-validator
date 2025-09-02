import { MailcheckConfig, defaultConfig } from '../src/config.js';

describe('MailcheckConfig', () => {
  test('デフォルト設定が正しく読み込まれる', () => {
    expect(defaultConfig.getDomains()).toContain('gmail.com');
    expect(defaultConfig.getSecondLevelDomains()).toContain('yahoo');
    expect(defaultConfig.getTopLevelDomains()).toContain('com');
  });

});