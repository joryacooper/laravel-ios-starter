import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "@/environments/environment";
import { AuthService } from "@/lib/services/auth.service";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header if user is logged in and request is to the api url
    const isApiUrl = request.url.startsWith(environment.api);
    if (this._auth.isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this._auth.authToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
