import { domains } from './data/domains.js';
import { secondLevelDomains } from './data/second-level-domains.js';
import { topLevelDomains } from './data/top-level-domains.js';

export class MailcheckConfig {
  constructor() {
    this.domains = [...domains];
    this.secondLevelDomains = [...secondLevelDomains];
    this.topLevelDomains = [...topLevelDomains];
  }

  getDomains() {
    return this.domains;
  }

  getSecondLevelDomains() {
    return this.secondLevelDomains;
  }

  getTopLevelDomains() {
    return this.topLevelDomains;
  }

  addDomain(domain) {
    if (!this.domains.includes(domain)) {
      this.domains.push(domain);
    }
  }

  addSecondLevelDomain(domain) {
    if (!this.secondLevelDomains.includes(domain)) {
      this.secondLevelDomains.push(domain);
    }
  }

  addTopLevelDomain(domain) {
    if (!this.topLevelDomains.includes(domain)) {
      this.topLevelDomains.push(domain);
    }
  }
}

export const defaultConfig = new MailcheckConfig();