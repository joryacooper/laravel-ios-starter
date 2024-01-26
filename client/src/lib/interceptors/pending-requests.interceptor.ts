import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
} from '@angular/common/http';
import { finalize, Observable } from "rxjs";
import { PendingRequestsStore } from "@/lib/stores/pending-requests.store";

export const DISABLE_PENDING_REQUEST_DETECTION = new HttpContextToken<boolean>(() => false)

@Injectable()
export class PendingRequestsInterceptor implements HttpInterceptor {
  constructor(private _store: PendingRequestsStore) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const doPendingRequestDetection = !request.context.get(DISABLE_PENDING_REQUEST_DETECTION)
    if (doPendingRequestDetection) {
      this._store.increment();
      return next
        .handle(request)
        .pipe(finalize(() => {
          this._store.decrement()
        }));
    } else {
      return next.handle(request)
    }
  }
}
