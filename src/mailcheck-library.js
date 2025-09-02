import { defaultConfig } from './config.js';
import Mailcheck from 'mailcheck';

class MailcheckLibrary {
  constructor(options = {}) {
    this.options = Object.assign({
      selector: '.js-mailcheck-input',
      suggestionClass: 'js-mailcheck-suggestion',
      domains: defaultConfig.getDomains(),
      secondLevelDomains: defaultConfig.getSecondLevelDomains(),
      topLevelDomains: defaultConfig.getTopLevelDomains(),
      suggestionTemplate: 'もしかして、「<a href="#" class="js-mailcheck-suggested">{suggestion}</a>」でしょうか？'
    }, options);

    this.init();
  }

  init() {
    const inputs = document.querySelectorAll(this.options.selector);
    inputs.forEach(input => this.attachToInput(input));
  }

  attachToInput(input) {
    const suggestionElement = this.createSuggestionElement(input);
    
    input.addEventListener('blur', () => {
      this.checkEmail(input, suggestionElement);
    });
  }

  createSuggestionElement(input) {
    const existing = input.parentNode.querySelector('.' + this.options.suggestionClass);
    if (existing) {
      return existing;
    }

    // input要素をrelativeポジションに設定
    if (getComputedStyle(input.parentNode).position === 'static') {
      input.parentNode.style.position = 'relative';
    }

    // スペーサー要素（提案を表示するエリア）
    const spacer = document.createElement('div');
    spacer.className = this.options.suggestionClass + '-spacer';
    spacer.style.height = '35px';
    spacer.style.position = 'relative';
    spacer.style.marginTop = '8px';
    spacer.style.display = 'none';
    
    // suggestion要素（スペーサー内に配置）
    const suggestionDiv = document.createElement('div');
    suggestionDiv.className = this.options.suggestionClass;
    suggestionDiv.style.position = 'absolute';
    suggestionDiv.style.top = '0';
    suggestionDiv.style.left = '0';
    suggestionDiv.style.width = '100%';
    suggestionDiv.style.height = '100%';
    suggestionDiv.style.color = '#666';
    suggestionDiv.style.fontSize = 'clamp(11px, 2.5vw, 13px)';
    suggestionDiv.style.display = 'flex';
    suggestionDiv.style.alignItems = 'center';
    suggestionDiv.style.backgroundColor = '#f8f9fa';
    suggestionDiv.style.border = '1px solid #e9ecef';
    suggestionDiv.style.borderRadius = '4px';
    suggestionDiv.style.padding = '0 clamp(8px, 3vw, 12px)';
    suggestionDiv.style.boxSizing = 'border-box';
    suggestionDiv.style.transition = 'all 0.2s ease';
    suggestionDiv.style.wordBreak = 'break-all';
    suggestionDiv.style.overflow = 'hidden';
    
    spacer.appendChild(suggestionDiv);
    input.parentNode.insertBefore(spacer, input.nextSibling);
    
    return suggestionDiv;
  }

  checkEmail(input, suggestionElement) {
    const email = input.value.trim();
    const spacer = input.parentNode.querySelector('.' + this.options.suggestionClass + '-spacer');
    
    if (!email || !email.includes('@')) {
      suggestionElement.innerHTML = '';
      if (spacer) spacer.style.display = 'none';
      return;
    }

    Mailcheck.run({
        email: email,
        domains: this.options.domains,
        secondLevelDomains: this.options.secondLevelDomains,
        topLevelDomains: this.options.topLevelDomains,
        suggested: (suggestion) => {
          this.showSuggestion(input, suggestionElement, suggestion);
          if (spacer) spacer.style.display = 'block';
        },
        empty: () => {
          suggestionElement.innerHTML = '';
          if (spacer) spacer.style.display = 'none';
        }
      });
  }

  showSuggestion(input, suggestionElement, suggestion) {
    const html = this.options.suggestionTemplate.replace('{suggestion}', suggestion.full);
    suggestionElement.innerHTML = html;
    
    const suggestionLink = suggestionElement.querySelector('.js-mailcheck-suggested');
    if (suggestionLink) {
      // リンクのスタイル設定
      suggestionLink.style.color = '#007bff';
      suggestionLink.style.textDecoration = 'none';
      suggestionLink.style.fontWeight = '500';
      suggestionLink.style.padding = 'clamp(2px, 1vw, 4px) clamp(4px, 1.5vw, 6px)';
      suggestionLink.style.borderRadius = '3px';
      suggestionLink.style.backgroundColor = '#e3f2fd';
      suggestionLink.style.transition = 'all 0.15s ease';
      suggestionLink.style.fontSize = 'clamp(11px, 2.5vw, 13px)';
      
      // ホバー効果
      suggestionLink.addEventListener('mouseenter', () => {
        suggestionLink.style.backgroundColor = '#bbdefb';
        suggestionLink.style.transform = 'translateY(-1px)';
      });
      
      suggestionLink.addEventListener('mouseleave', () => {
        suggestionLink.style.backgroundColor = '#e3f2fd';
        suggestionLink.style.transform = 'translateY(0)';
      });
      
      suggestionLink.addEventListener('click', (e) => {
        e.preventDefault();
        input.value = suggestion.full;
        suggestionElement.innerHTML = '';
        const spacer = input.parentNode.querySelector('.' + this.options.suggestionClass + '-spacer');
        if (spacer) spacer.style.display = 'none';
        input.focus();
      });
    }
  }


}

export default MailcheckLibrary;