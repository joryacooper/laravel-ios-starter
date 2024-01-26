import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { lastValueFrom, map } from "rxjs";
import { User } from "@/lib/models/user";

@Injectable({
  providedIn: 'root',
})
export class ProSubscriptionApi {
  constructor(
    private _http: HttpClient
  ) {
  }

  async markAsPro() {
    return lastValueFrom(
      this._http.post<{ data: User }>('@api/user/pro-subscription', null).pipe(map(res => res.data))
    )
  }

  async markAsNotPro() {
    return lastValueFrom(
      this._http.delete<{ data: User }>('@api/user/pro-subscription').pipe(map(res => res.data))
    )
  }
}
