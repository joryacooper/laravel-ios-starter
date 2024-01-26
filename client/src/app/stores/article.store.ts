import { Injectable } from "@angular/core";
import { ListStore } from "@/lib/stores/list.store";
import { Article, ArticleCreateDraft, ArticleUpdateDraft } from "@/app/models/article";
import { ArticleApi } from "@/app/apis/article-api.service";

@Injectable({
  providedIn: 'root',
})
export class ArticleStore extends ListStore<Article> {
  constructor(
    private _api: ArticleApi
  ) {
    super();
  }

  async pull() {
    return this.setItems(await this._api.fetch())
  }

  async pullById(id: Article['id']) {
    return this.upsert(await this._api.fetchById(id))
  }

  create(
    data: ArticleCreateDraft,
    onOptimisticItemCreated: null|((optimistic: Article) => void) = null,
    onAcutalized: null|((actual: Article) => void) = null,
    onActualizedError: null|((error: any) => void) = null
  ) {
     this._performOptimisticCreate(data, () => this._api.create(data), onOptimisticItemCreated, onAcutalized, onActualizedError)
  }

  update(
    id: Article['id'],
    data: ArticleUpdateDraft,
    onActualized: null|((actual: Article) => void) = null,
    onError: null|((error: any) => void) = null
  ) {
    this._performOptimisticUpdate(id, data, () => this._api.update(id, data), onActualized, onError)
  }


  delete(id: Article['id'], onError: null|((error: any) => Promise<void>) = null) {
    this._performOptimisticDelete(id, () => this._api.delete(id), null, onError)
  }
}
