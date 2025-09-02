import MailcheckLibrary from '../src/mailcheck-library.js';
import { MailcheckConfig } from '../src/config.js';

// mailcheckのモック
jest.mock('mailcheck', () => ({
  run: jest.fn()
}));

describe('MailcheckLibrary', () => {
  let container;
  
  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('初期化時にデフォルトオプションが設定される', () => {
    const library = new MailcheckLibrary();
    
    expect(library.options.selector).toBe('.js-mailcheck-input');
    expect(library.options.suggestionClass).toBe('js-mailcheck-suggestion');
    expect(library.options.suggestionTemplate).toContain('もしかして');
  });

  test('カスタムオプションで初期化できる', () => {
    const customOptions = {
      selector: '.custom-input',
      suggestionClass: 'custom-suggestion'
    };
    
    const library = new MailcheckLibrary(customOptions);
    
    expect(library.options.selector).toBe('.custom-input');
    expect(library.options.suggestionClass).toBe('custom-suggestion');
  });

  test('対象の入力欄にイベントリスナーが追加される', () => {
    container.innerHTML = '<input type="email" class="js-mailcheck-input" />';
    const input = container.querySelector('.js-mailcheck-input');
    const addEventListenerSpy = jest.spyOn(input, 'addEventListener');
    
    new MailcheckLibrary();
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('blur', expect.any(Function));
  });

  test('スペーサー要素が作成される', () => {
    container.innerHTML = '<input type="email" class="js-mailcheck-input" />';
    
    new MailcheckLibrary();
    
    const spacer = container.querySelector('.js-mailcheck-suggestion-spacer');
    const suggestion = container.querySelector('.js-mailcheck-suggestion');
    
    expect(spacer).toBeInTheDocument();
    expect(suggestion).toBeInTheDocument();
    expect(spacer.style.display).toBe('none');
  });

  test('メール形式が正しくない場合は何も表示しない', () => {
    container.innerHTML = '<input type="email" class="js-mailcheck-input" />';
    const input = container.querySelector('.js-mailcheck-input');
    
    const library = new MailcheckLibrary();
    const suggestionElement = container.querySelector('.js-mailcheck-suggestion');
    
    input.value = 'invalid-email';
    library.checkEmail(input, suggestionElement);
    
    expect(suggestionElement.innerHTML).toBe('');
  });
});