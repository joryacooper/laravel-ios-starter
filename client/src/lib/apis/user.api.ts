import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { lastValueFrom, map } from "rxjs";
import { User } from "@/lib/models/user";

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  constructor(
    private _http: HttpClient
  ) {
  }

  fetch() {
    return lastValueFrom(
      this._http.get<{ data: User }>('@api/user').pipe(map(res => res.data))
    )
  }

  forgotPassword(email: string) {
    return lastValueFrom(
      this._http.post<{ message: string }>('@api/forgot-password', {email})
    )
  }

  updatePassword(data: {current_password: string, password: string, password_confirmation: string}) {
    return lastValueFrom(
      this._http.put<{ message: string }>('@api/user/password', data)
    )
  }

  updateProfile(data: {email: string}) {
    return lastValueFrom(
      this._http.put<{ message: string }>('@api/user/profile-information', data)
    )
  }

  delete() {
    return lastValueFrom(
      this._http.delete('@api/user')
    )
  }
}
