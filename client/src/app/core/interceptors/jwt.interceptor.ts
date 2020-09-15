import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CustomerAuthService} from "../auth/customer-auth.service";
import {AdminAuthService} from "../auth/admin-auth.service";

/**
 * The JWT Interceptor intercepts http requests from the application to add a
 * JWT auth token to the Authorization header, if the user is logged in.
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private customerAuthService: CustomerAuthService,
              private adminAuthService: AdminAuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add authorization header with jwt token if available
    if (this.adminAuthService.isLoggedIn()) {
      let currentAdmin = this.adminAuthService.currentAdminValue();
      if (currentAdmin && currentAdmin.jwt) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentAdmin.jwt}`
          }
        });
      }

    } else if (this.customerAuthService.isLoggedIn()) {
      let currentCustomer = this.customerAuthService.currentCustomerValue();
      if (currentCustomer && currentCustomer.jwt) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentCustomer.jwt}`
          }
        });
      }
    }

    return next.handle(request);
  }
}
