import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

/**
 * The Error Interceptor intercepts http http-responses from the api to check if there were any errors. If there is a 401
 * Unauthorized response the user is automatically logged out of the application, all other errors are re-thrown up
 * to the calling service so an alert with the error can be displayed on the screen.
 * It's implemented using the HttpInterceptor class included in the HttpClientModule, by extending the
 * HttpInterceptor class you can create a custom interceptor to catch all error http-responses from the server in a
 * single location.
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authService.logout();

        location.reload();
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
