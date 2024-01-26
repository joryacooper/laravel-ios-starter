import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { lastValueFrom, map } from "rxjs";
import { Article, ArticleCreateDraft, ArticleUpdateDraft } from "../models/article";

@Injectable({
  providedIn: 'root',
})
export class ArticleApi {
  constructor(
    private _http: HttpClient
  ) {
  }

  async fetch() {
    return lastValueFrom(
      this._http.get<{ data: Article[] }>('@api/articles').pipe(map(res => res.data))
    )
  }

  async fetchById(id: Article['id']) {
    return lastValueFrom(
      this._http.get<{ data: Article }>(`@api/articles/${id}`).pipe(map(res => res.data))
    )
  }

  async create(data: ArticleCreateDraft) {
    return lastValueFrom(
      this._http.post<{ data: Article }>('@api/articles', data).pipe(map(res => res.data))
    )
  }

  async update(id: Article['id'], data: ArticleUpdateDraft) {
    return lastValueFrom(
      this._http.patch<{ data: Article }>(`@api/articles/${id}`, data).pipe(map(res => res.data))
    )
  }

  async delete(id: Article['id']) {
    return lastValueFrom(
      this._http.delete<void>(`@api/articles/${id}`)
    )
  }
}
