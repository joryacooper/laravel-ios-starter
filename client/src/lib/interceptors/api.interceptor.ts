import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "@/environments/environment";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (request.url.startsWith('@api')) {
      request = request.clone({
        url: request.url.replace('@api', environment.api)
      });
    }

    return next.handle(request);
  }
}
