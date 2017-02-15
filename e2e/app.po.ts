import { browser, element, by } from 'protractor';

export class ReactiveFormsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('rf-root h1')).getText();
  }
}
