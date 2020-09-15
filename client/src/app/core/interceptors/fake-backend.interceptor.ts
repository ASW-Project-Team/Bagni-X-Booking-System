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
import {seasonMock} from "../mocks/bathhouse.mock";
import {AdminModel} from "../../shared/models/admin.model";
import {adminsMocks} from "../mocks/admins.mock";
import {rankUmbrellasMock} from "../mocks/rank-umbrellas.mock";

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  static fakeJwtToken: string = 'fake-jwt-token';

  constructor() { }

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
      case url.endsWith('api/home') && method === 'GET':
        return FakeBackendInterceptor.getHome();
      case url.endsWith('api/catalog/rank-umbrellas') && method === 'GET':
        return FakeBackendInterceptor.getRankUmbrellas();
      case url.endsWith('api/news') && method === 'GET':
        return FakeBackendInterceptor.getNewsFeed();
      case url.match(/\/api\/news\/\d+$/) && method === 'GET':
        return FakeBackendInterceptor.getNews(request);
      case url.match(/\/api\/bookings\/customer\/\d+$/) && method === 'GET':
        return FakeBackendInterceptor.getCustBookings(request);
      case url.endsWith('api/bookings') && method === 'GET':
        return FakeBackendInterceptor.getAllBookings(request);
      case url.match(/\/api\/bookings\/\d+$/) && method === 'GET':
        return FakeBackendInterceptor.getBooking(request);
      case url.match(/\/api\/bookings\/\d+$/) && method === 'DELETE':
        return FakeBackendInterceptor.deleteBooking(request);
      case url.match(/\/api\/customers\/\d+$/) && method === 'GET':
        return FakeBackendInterceptor.deleteCustomer();
      case url.endsWith('api/new-booking/season') && method === 'GET':
        return FakeBackendInterceptor.getSeason();
      case url.endsWith('api/new-booking/availability') && method === 'GET':
        return FakeBackendInterceptor.getAvailability();
      case url.endsWith('api/new-booking/checkout') && method === 'POST':
        return FakeBackendInterceptor.generateBooking();

      // todo ecc.

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


  private static getHome(): ObservableInput<any> {
    return FakeBackendInterceptor.createOkResponse(homeMock);
  }


  private static getNewsFeed(): ObservableInput<any> {
    return FakeBackendInterceptor.createOkResponse(newsFeedMock);
  }


  private static getNews(request: HttpRequest<unknown>): ObservableInput<any> {
    const news = newsFeedMock.find(x => x.id === FakeBackendInterceptor.idFromUrl(request))
    if (!news) {
      return FakeBackendInterceptor.createError404();
    }

    return FakeBackendInterceptor.createOkResponse(news);
  }


  private static getRankUmbrellas(): ObservableInput<any> {
    return FakeBackendInterceptor.createOkResponse(rankUmbrellasMock);
  }



  private static getCustBookings(request: HttpRequest<unknown>): ObservableInput<any> {
    if (!this.isCustomerLoggedIn(request)) {
      return FakeBackendInterceptor.createError401()
    }

    return FakeBackendInterceptor.createOkResponse(bookingsMock);
  }

  private static getAllBookings(request: HttpRequest<unknown>): ObservableInput<any> {
    if (!this.isAdminLoggedIn(request)) {
      return FakeBackendInterceptor.createError401()
    }

    return FakeBackendInterceptor.createOkResponse(bookingsMock);
  }


  private static getBooking(request: HttpRequest<unknown>): ObservableInput<any> {
    if (!this.isCustomerLoggedIn(request)) {
      return FakeBackendInterceptor.createError401()
    }

    const booking = bookingsMock.find(
      x => x.id === FakeBackendInterceptor.idFromUrl(request)
    );
    if (!booking) {
      return FakeBackendInterceptor.createError404();
    }

    return FakeBackendInterceptor.createOkResponse(booking);
  }

  private static deleteBooking(request: HttpRequest<unknown>): ObservableInput<any> {
    if (!this.isCustomerLoggedIn(request)) {
      return FakeBackendInterceptor.createError401()
    }

    const booking = bookingsMock.find(
      x => x.id === FakeBackendInterceptor.idFromUrl(request)
    );
    if (!booking) {
      return FakeBackendInterceptor.createError404();
    }

    return FakeBackendInterceptor.createOkResponse(booking);
  }


  private static deleteCustomer(): ObservableInput<any> {
    return FakeBackendInterceptor.createOkResponse();
  }

  private static getAvailability(): ObservableInput<any> {
    return FakeBackendInterceptor.createOkResponse(availabilityMock);
  }

  private static getSeason(): ObservableInput<any> {
    return FakeBackendInterceptor.createOkResponse(seasonMock);
  }

  private static generateBooking(): ObservableInput<any> {
    return FakeBackendInterceptor.createOkResponse();
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
