import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  public getStartedPage(): HTMLElement {
    return this._getElement('app-get-started');
  }

  public articleIndexPage(): HTMLElement {
    return this._getElement('app-article-index')
  }

  public articleDetailPage(): HTMLElement {
    return this._getElement('app-article-detail')
  }

  private _getElement(selector: string) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(selector + ' element not found')
    }
    return element as HTMLElement
  }
}
