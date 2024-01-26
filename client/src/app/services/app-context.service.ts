import { Injectable } from '@angular/core';
import { AppContextApi } from "@/app/apis/app-context.api";
import { ArticleStore } from "@/app/stores/article.store";

@Injectable({
  providedIn: 'root'
})
export class AppContextService {
  public isLoaded = false
  public isError = false
  private _isPulling = false

  constructor(
    private _articles: ArticleStore,
    private _appContextApi: AppContextApi,
    ) {
  }

  public async pull() {
    if (this._isPulling) {
      return
    }

    this._isPulling = true
    this.isError = false
    try {
      const appContext = await this._appContextApi.fetch()
      this._articles.setItems(appContext.articles)
      this._isPulling = false
      this.isLoaded = true
    } catch (e) {
      this._isPulling = false
      this.isError = true
      throw e
    }
  }
}
