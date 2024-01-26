import { APP_INITIALIZER, enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import {  IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from '@/app/app.routes'
import { AppComponent } from '@/app/app.component';
import { environment } from '@/environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthService } from "@/lib/services/auth.service";
import { NetworkService } from "@/lib/services/network.service";
import { PendingRequestsInterceptor } from "@/lib/interceptors/pending-requests.interceptor";
import { ApiInterceptor } from "@/lib/interceptors/api.interceptor";
import { AuthTokenInterceptor } from "@/lib/interceptors/auth-token.interceptor";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({ mode: 'ios' }),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeAuth,
      deps: [AuthService]
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeNetwork,
      deps: [NetworkService]
    },
    { provide: HTTP_INTERCEPTORS, useClass: PendingRequestsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
  ],
});

function initializeAuth(auth: AuthService) {
  return (): Promise<any> => auth.initialize()
}

function initializeNetwork(network: NetworkService) {
  return (): Promise<any> => network.initialize()
}
