import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AdminAuthService} from "../auth/admin-auth.service";


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router,
              private adminAuthService: AdminAuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.adminAuthService.isLoggedIn()) {
      return true;

    } else {
      // not logged in. Redirect to login page, with the return url
      this.router.navigate(['admins', 'login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
