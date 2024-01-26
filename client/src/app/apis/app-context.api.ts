import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { lastValueFrom, map } from "rxjs";
import { Article } from "../models/article";

interface AppContext {
  articles: Article[],
}

@Injectable({
  providedIn: 'root',
})
export class AppContextApi {
  constructor(
    private _http: HttpClient
  ) {
  }

  async fetch() {
    return lastValueFrom(
      this._http.get<{ data: AppContext }>('@api/app').pipe(map(res => res.data))
    )
  }
}
