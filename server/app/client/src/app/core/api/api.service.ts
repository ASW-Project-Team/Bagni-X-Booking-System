import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {newsFeedMock, newsMock} from "../mocks/news.mock";
import {MockGenerator} from "../mocks/mock-generator";
import {homeMock} from "../mocks/home.mock";
import {bookingMock, bookingsMock} from "../mocks/bookings.mock";


/**
 * Service whose aim is to retrive data from the bagniX API.
 */

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  mockGenerator: MockGenerator;

  constructor(private http: HttpClient) {
    this.mockGenerator = new MockGenerator();
  }

  public getHome(): Observable<any> {
    if(isDevMode()) {
      return this.mockGenerator.observableMock(homeMock);
    }

    return this.http.get('https://localhost:4200/api/home');
  }

  public getAllNews(): Observable<any> {
    if(isDevMode()) {
      return this.mockGenerator.observableMock(newsFeedMock);
    }

    return this.http.get('https://localhost:4200/api/news-feed');
  }

  public getNews(id: string): Observable<any> {
    if (isDevMode()) {
      return this.mockGenerator.observableMock(newsMock);
    }

    return this.http.get('https://localhost:4200/api/news/' + id);
  }


  public getUserBookings(): Observable<any> {
    if (isDevMode()) {
      return this.mockGenerator.observableMock(bookingsMock);
    }

    return this.http.get('https://localhost:4200/api/bookings/' /*userid come queryparam*/);
  }

  public getBooking(bookingId: string): Observable<any> {
    if (isDevMode()) {
      return this.mockGenerator.observableMock(bookingMock);
    }

    return this.http.get('https://localhost:4200/api/bookings/' + bookingId);
  }

  public deleteBooking(bookingId: string): Observable<any> {
    if (isDevMode()) {
      return this.mockGenerator.observableMock({});
    }

    return this.http.delete('https://localhost:4200/api/bookings/' + bookingId);
  }
}
