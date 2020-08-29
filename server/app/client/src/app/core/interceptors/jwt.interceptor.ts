import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../auth/auth.service";

/**
 * The JWT Interceptor intercepts http requests from the application to add a JWT auth token to the Authorization
 * header if the user is logged in.
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add authorization header with jwt token if available
    //let currentUser = this.authService.currentUserValue;
    //if (currentUser && currentUser.token) {
    //  request = request.clone({
    //    setHeaders: {
    //      Authorization: `Bearer ${currentUser.token}`
    //    }
    //  });
    //}

    return next.handle(request);
  }
}
