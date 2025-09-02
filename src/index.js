import MailcheckLibrary from './mailcheck-library.js';
import { defaultConfig, MailcheckConfig } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.js-mailcheck-input')) {
    new MailcheckLibrary();
  }
});

export { MailcheckLibrary, defaultConfig, MailcheckConfig };