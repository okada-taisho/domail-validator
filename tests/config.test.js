import { MailcheckConfig, defaultConfig } from '../src/config.js';

describe('MailcheckConfig', () => {
  test('デフォルト設定が正しく読み込まれる', () => {
    expect(defaultConfig.getDomains()).toContain('gmail.com');
    expect(defaultConfig.getSecondLevelDomains()).toContain('yahoo');
    expect(defaultConfig.getTopLevelDomains()).toContain('com');
  });

  test('新しいドメインを追加できる', () => {
    const config = new MailcheckConfig();
    const initialLength = config.getDomains().length;
    
    config.addDomain('test.com');
    
    expect(config.getDomains()).toHaveLength(initialLength + 1);
    expect(config.getDomains()).toContain('test.com');
  });

  test('重複するドメインは追加されない', () => {
    const config = new MailcheckConfig();
    const initialLength = config.getDomains().length;
    
    config.addDomain('gmail.com');
    
    expect(config.getDomains()).toHaveLength(initialLength);
  });

  test('セカンドレベルドメインを追加できる', () => {
    const config = new MailcheckConfig();
    const initialLength = config.getSecondLevelDomains().length;
    
    config.addSecondLevelDomain('test');
    
    expect(config.getSecondLevelDomains()).toHaveLength(initialLength + 1);
    expect(config.getSecondLevelDomains()).toContain('test');
  });

  test('トップレベルドメインを追加できる', () => {
    const config = new MailcheckConfig();
    const initialLength = config.getTopLevelDomains().length;
    
    config.addTopLevelDomain('test');
    
    expect(config.getTopLevelDomains()).toHaveLength(initialLength + 1);
    expect(config.getTopLevelDomains()).toContain('test');
  });

});