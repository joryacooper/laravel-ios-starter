import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Preferences } from "@capacitor/preferences";
import { User } from "@/lib/models/user";
import { lastValueFrom } from "rxjs";
import { UserApi } from "@/lib/apis/user.api";

const PREFERENCES_AUTH_TOKEN_KEY = 'auth-token'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authToken: string|null
  public user: User|undefined|null

  get isLoggedIn() {
    return !!this.authToken
  }

  constructor(
    private _http: HttpClient,
    private _api: UserApi
  ) {
  }

  public async initialize() {
    this.authToken = (await Preferences.get({key: PREFERENCES_AUTH_TOKEN_KEY})).value
  }

  async register(email: string, password: string, accepted: boolean) {
    const response = await lastValueFrom(
      this._http.post<{ token: string, user: User }>('@api/register', {
        email,
        password,
        accepted,
      })
    )
    this._setAuthToken(response!.token)
    this.user = response.user
  }

  async pullUser() {
    this.user = await this._api.fetch()
    return this.user
  }

  async login(email: string, password: string) {
    const response = await lastValueFrom(
      this._http.post<{ token: string, user: User }>('@api/login', {
        email,
        password,
      })
    )
    this._setAuthToken(response!.token)
    this.user = response.user
  }

  async logout() {
    await this._clearAuthToken()
  }

  forgotPassword(email: string) {
    return this._api.forgotPassword(email)
  }

  updatePassword(data: {current_password: string, password: string, password_confirmation: string}) {
    return this._api.updatePassword(data)
  }

  updateProfile(data: {email: string}) {
    return this._api.updateProfile(data)
  }

  delete() {
    return this._api.delete()
  }

  private async _setAuthToken(value: string) {
    this.authToken = value
    await Preferences.set({key: PREFERENCES_AUTH_TOKEN_KEY, value})
  }

  private async _clearAuthToken() {
    this.authToken = null
    await Preferences.remove({key: PREFERENCES_AUTH_TOKEN_KEY})
  }


}
