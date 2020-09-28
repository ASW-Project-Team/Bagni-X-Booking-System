import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import {Observable, ObservableInput, of, throwError} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';
import {customersMock} from "../mocks/customer.mock";
import {CustomerModel} from "../../shared/models/customer.model";
import {newsFeedMock} from "../mocks/news.mock";
import {homeMock} from "../mocks/home.mock";
import {bookingsMock} from "../mocks/bookings.mock";
import {availabilityMock} from "../mocks/availability.mock";
import {environment} from "../../../environments/environment";
import {bathhouseMock} from "../mocks/bathhouse.mock";
import {AdminModel} from "../../shared/models/admin.model";
import {adminsMocks} from "../mocks/admins.mock";
import {rankUmbrellasMock} from "../mocks/rank-umbrellas.mock";
import {servicesMock} from "../mocks/services.mock";
import {homeCardsMock} from "../mocks/home-cards-model";
import {currentSeasonStatsMock, oldSeasonStatsMock} from "../mocks/stats.mock";

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  static fakeJwtToken: string = 'fake-jwt-token';

  constructor() {
  }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!environment.fakeBackend) {
      return next.handle(request);
    }

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(() => FakeBackendInterceptor.handleRoute(request, next)))
      // call materialize and dematerialize to ensure delay even if an error is thrown
      // (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }

  // route functions
  private static handleRoute(request: HttpRequest<unknown>, next: HttpHandler): ObservableInput<any> {
    const {url, method} = request;

    switch (true) {
      case url.endsWith('api/auth/customers/login') && method === 'POST':
        return FakeBackendInterceptor.authenticateCustomer(request);
      case url.endsWith('api/auth/admins/login') && method === 'POST':
        return FakeBackendInterceptor.authenticateAdmin(request);
      case url.endsWith('api/auth/customers/register') && method === 'POST':
        return FakeBackendInterceptor.registerCustomer(request);

      case url.endsWith('/api/stats/current') && method === 'GET':
        return FakeBackendInterceptor.createOkResponse(currentSeasonStatsMock);
      case  url.match(/\/api\/stats\/seasons\/?$/) && method === 'POST':
        return FakeBackendInterceptor.createOkResponse();
      case  url.match(/\/api\/stats\/seasons\/?$/) && method === 'GET':
        return FakeBackendInterceptor.createOkResponse(oldSeasonStatsMock);
      case url.match(/\/api\/stats\/seasons\/\d+$/) && method === 'GET':
        return FakeBackendInterceptor.createOkResponse(oldSeasonStatsMock);

      case url.endsWith('api/customers') && method === 'GET':
        return FakeBackendInterceptor.createOkResponse(customersMock);
      case url.match(/\/api\/customers\/\d+$/) && method === 'GET':
        return FakeBackendInterceptor.createOkResponse(customersMock[0]);
      case url.endsWith('api/customers') && method === 'POST':
        return FakeBackendInterceptor.createOkResponse();
      case url.match(/\/api\/customers\/\d+$/) && method === 'DELETE':
        return FakeBackendInterceptor.createOkResponse();

      case url.endsWith('api/home-cards') && method === 'GET':
        return FakeBackendInterceptor.createOkResponse(homeCardsMock);
      case url.match(/\/api\/home-cards\/\d+$/) && method === 'GET':
        return FakeBackendInterceptor.createOkResponse(homeCardsMock[0]);
      case url.match(/\/api\/customers\/\d+$/) && method === 'PUT':
        return FakeBackendInterceptor.createOkResponse();
      case url.match(/\/api\/home-cards\/\d+$/) && method === 'PUT':
        return FakeBackendInterceptor.createOkResponse();
      case url.endsWith('api/home') && method === 'GET':
        return FakeBackendInterceptor.createOkResponse(homeMock);

      case url.endsWith('api/bathhouse') && method === 'GET':
        return FakeBackendInterceptor.createOkResponse(bathhouseMock);
      case url.endsWith('api/bathhouse') && method === 'PUT':
        return FakeBackendInterceptor.createOkResponse();

      case url.endsWith('api/catalog/rank-umbrellas') && method === 'GET':
        return FakeBackendInterceptor.createOkResponse(rankUmbrellasMock);
      case url.endsWith('api/catalog/rank-umbrellas') && method === 'POST':
        return FakeBackendInterceptor.createOkResponse();
      case url.match(/\/api\/catalog\/rank-umbrellas\/\d+$/) && method === 'GET':
        return FakeBackendInterceptor.createOkResponse(rankUmbrellasMock[0]);
      case url.match(/\/api\/catalog\/rank-umbrellas\/\d+$/) && method === 'PUT':
        return FakeBackendInterceptor.createOkResponse();
      case url.match(/\/api\/catalog\/rank-umbrellas\/\d+$/) && method === 'DELETE':
        return FakeBackendInterceptor.createOkResponse();

      case url.endsWith('api/catalog/services') && method === 'GET':
        return FakeBackendInterceptor.createOkResponse(servicesMock);
      case url.endsWith('api/catalog/services') && method === 'POST':
        return FakeBackendInterceptor.createOkResponse();
      case url.match(/\/api\/catalog\/services\/\d+$/) && method === 'GET':
        return FakeBackendInterceptor.createOkResponse(servicesMock[0]);
      case url.match(/\/api\/catalog\/services\/\d+$/) && method === 'PUT':
        return FakeBackendInterceptor.createOkResponse();
      case url.match(/\/api\/catalog\/services\/\d+$/) && method === 'DELETE':
        return FakeBackendInterceptor.createOkResponse();

      case url.endsWith('api/news') && method === 'GET':
        return FakeBackendInterceptor.createOkResponse(newsFeedMock);
      case url.match(/\/api\/news\/\d+$/) && method === 'GET':
        return FakeBackendInterceptor.createOkResponse(newsFeedMock[0]);
      case url.match(/\/api\/news\/\d+$/) && method === 'PUT':
        return FakeBackendInterceptor.createOkResponse();
      case url.endsWith('api/news') && method === 'POST':
        return FakeBackendInterceptor.createOkResponse();
      case url.match(/\/api\/news\/\d+$/) && method === 'DELETE':
        return FakeBackendInterceptor.createOkResponse();

      case url.match(/\/api\/bookings\/customer\/\d+$/) && method === 'GET':
        return FakeBackendInterceptor.createOkResponse(bookingsMock);
      case url.endsWith('api/bookings') && method === 'GET':
        return FakeBackendInterceptor.createOkResponse(bookingsMock);
      case url.match(/\/api\/bookings\/\d+$/) && method === 'GET':
        return FakeBackendInterceptor.createOkResponse(bookingsMock[0]);
      case url.match(/\/api\/bookings\/\d+$/) && method === 'PUT':
        return FakeBackendInterceptor.createOkResponse();
      case url.match(/\/api\/bookings\/\d+$/) && method === 'DELETE':
        return FakeBackendInterceptor.createOkResponse();

      case url.endsWith('api/new-booking/season') && method === 'GET':
        return FakeBackendInterceptor.createOkResponse(bathhouseMock);
      case url.endsWith('api/new-booking/availability') && method === 'GET':
        return FakeBackendInterceptor.createOkResponse(availabilityMock);
      case url.endsWith('api/new-booking/checkout') && method === 'POST':
        return FakeBackendInterceptor.createOkResponse();

      default:
        // pass through any requests not handled above
        return next.handle(request);
    }
  }


  private static authenticateCustomer(request: HttpRequest<unknown>): ObservableInput<any> {
    const email = request.body['email'];
    const password = request.body['password'];

    if (email != 'test@test.it' || password != 'test') {
      return FakeBackendInterceptor.createError400('Email/password combination is not correct.');
    }

    const customer: CustomerModel = customersMock[0];
    customer.jwt = FakeBackendInterceptor.fakeJwtToken;
    return FakeBackendInterceptor.createOkResponse(customer);
  }

  private static authenticateAdmin(request: HttpRequest<unknown>): ObservableInput<any> {
    const username = request.body['username'];
    const password = request.body['password'];

    if (username == 'admin' && password == 'admin') {
      const admin: AdminModel = adminsMocks[0];
      admin.jwt = FakeBackendInterceptor.fakeJwtToken;
      return FakeBackendInterceptor.createOkResponse(admin);

    } else if (username == 'root' && password == 'root') {
      const admin: AdminModel = adminsMocks[1];
      admin.jwt = FakeBackendInterceptor.fakeJwtToken;
      return FakeBackendInterceptor.createOkResponse(admin);
    }

    return FakeBackendInterceptor.createError400('Username/password combination is not correct.');
  }


  private static registerCustomer(request: HttpRequest<unknown>): ObservableInput<any> {
    const newCustomer: unknown = request.body;

    if (customersMock.find(x => x.email === newCustomer['email'])) {
      return FakeBackendInterceptor.createError400('Email "' + newCustomer['email'] + '" is already taken')
    }

    // always return the same user
    const customer: CustomerModel = customersMock[0];
    customer.jwt = FakeBackendInterceptor.fakeJwtToken;
    return FakeBackendInterceptor.createOkResponse(customer);
  }


  // helper functions
  private static isCustomerLoggedIn(request: HttpRequest<unknown>): boolean {
    return request.headers.get('Authorization') === 'Bearer ' + FakeBackendInterceptor.fakeJwtToken;
  }

  private static isAdminLoggedIn(request: HttpRequest<unknown>): boolean {
    return request.headers.get('Authorization') === 'Bearer ' + FakeBackendInterceptor.fakeJwtToken;
  }

  private static idFromUrl(request: HttpRequest<unknown>): string {
    const urlParts = request.url.split('/');
    return urlParts[urlParts.length - 1];
  }

  private static createOkResponse(body?): ObservableInput<any> {
    return of(new HttpResponse({status: 200, body}))
  }

  private static createError400(message?): ObservableInput<any> {
    return throwError({status: 400, error: {description: message ? message : 'Error!'}});
  }

  private static createError404(message?): ObservableInput<any> {
    return throwError({status: 404, error: {description: message ? message : 'Item not found!'}});
  }

  private static createError401(message?): ObservableInput<any> {
    return throwError({status: 401, error: {description: message ? message : 'Unauthorized!'}});
  }
}
