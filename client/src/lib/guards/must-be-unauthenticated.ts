import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "@/lib/services/auth.service";

export const mustBeUnauthenticated = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree  => {
    const authenticated = inject(AuthService).isLoggedIn;
    if (authenticated) {
      inject(Router).navigate(['/']);
      return false;
    }

    return true
}
