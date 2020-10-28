import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomerAuthService } from "../auth/customer-auth.service";
import {AdminAuthService} from "../auth/admin-auth.service";
import {Router} from "@angular/router";
import {MatUtilsService} from "../mat-utils/mat-utils.service";

/**
 * The Error Interceptor intercepts http http-responses from the api to check if there were any errors.
 * If there is a 401 (Unauthorized) response, the customer, or admin, is automatically logged out of the
 * application. All other errors are re-thrown up to the calling service, so that they can be displayer to
 * the user. HttpInterceptor class you can create a custom interceptor to catch all error http-responses
 * from the server in a single location.
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private customerAuthService: CustomerAuthService,
              private adminAuthService: AdminAuthService,
              private router: Router,
              private matUtils: MatUtilsService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {

        // auto logout if 401 response returned from api
        if (this.adminAuthService.isLoggedIn()) {
          this.adminAuthService.logout();
        }

        if (this.customerAuthService.isLoggedIn()) {
          this.customerAuthService.logout();
        }

        this.router.navigate(['/home']).then(() => {
          this.matUtils.createSnackBar("Non autorizzato! Logout completato.");
        })

        const error = err.error.description || err.statusText;
        return throwError(error);

      } else if (err.error == undefined) {
        return throwError(err);

      } else {
        const error = err.error.description || err.statusText;
        return throwError(error);
      }
    }))
  }
}
