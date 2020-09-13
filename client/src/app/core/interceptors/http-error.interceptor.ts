import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

/**
 * The Error Interceptor intercepts http http-responses from the api to check if there were any errors.
 * If there is a 401 (Unauthorized) response, the customer, or admin, is automatically logged out of the
 * application. All other errors are re-thrown up to the calling service, so that they can be displayer to
 * the user. HttpInterceptor class you can create a custom interceptor to catch all error http-responses
 * from the server in a single location.
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this._authService.logout();
        location.reload();
      }

      const error = err.error.description || err.statusText;
      console.error(error);
      return throwError(error);
    }))
  }
}
