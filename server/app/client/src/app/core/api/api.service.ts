import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {AuthService} from "../auth/auth.service";


/**
 * Service whose aim is to retrive data from the bagniX API.
 */

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  public getHome(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/home`);
  }

  public getAllNews(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/news`);
  }

  public getNews(newsId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/news/${newsId}`);
  }

  public getUserBookings(): Observable<any> {
    const userId: string = this.authService.currentCustomerValue().id;
    return this.http.get(`${environment.apiUrl}/api/bookings/user/${userId}`);
  }

  public getBooking(bookingId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/bookings/${bookingId}`);
  }

  public deleteBooking(bookingId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/bookings/${bookingId}`);
  }
}
