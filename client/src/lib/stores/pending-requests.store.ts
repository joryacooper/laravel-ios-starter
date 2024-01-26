import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class PendingRequestsStore {
  public get hasPendingRequests() {
    return !!this._numPendingRequests
  }

  // 2 - 100
  public get progressPercentage(): number|null {
    if (!this._recentMax) {
      return null
    }
    return Math.max(2, ((this._recentMax - this._numPendingRequests) / this._recentMax) * 100.0)
  }

  public increment() {
    this._set(this._numPendingRequests + 1)
  }

  public decrement() {
    this._set(this._numPendingRequests - 1)
  }

  private _numPendingRequests: number = 0
  private _recentMax: number = 0

  private _set(val: number) {
    this._numPendingRequests = val
    if (val > this._recentMax) {
      this._recentMax = val
    } else if (!val) {
      this._resetRecentMax()
    }
  }

  // persist 100% progress for 500ms before progress gets reset back to 0
  private _resetRecentMax() {
    setTimeout(() => {
      this._recentMax = 0
    }, 500)
  }
}
