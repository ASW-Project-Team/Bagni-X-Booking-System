import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {CustomerAuthService} from "../auth/customer-auth.service";
import {Booking} from "../../shared/models/booking.model";


/**
 * Service whose aim is to retrive data from the bagniX API.
 */

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient,
              private authService: CustomerAuthService) { }

  public getHome(): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/home`);
  }

  public getAllNews(): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/news`);
  }

  public getNews(newsId: string): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/news/${newsId}`);
  }

  public editNews(newsId: string, modifiedData: FormData): Observable<any> {
    return this._http.put(`${environment.apiUrl}/api/news/${newsId}`, modifiedData);
  }

  public deleteNews(newsId: string): Observable<any> {
    return this._http.delete(`${environment.apiUrl}/api/news/${newsId}`);
  }

  public createNews(newData: FormData): Observable<any> {
    return this._http.post(`${environment.apiUrl}/api/news`, newData);
  }

  public getAllBookings(): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/bookings`);
  }

  public getCustomerBookings(): Observable<any> {
    const userId: string = this.authService.currentCustomerValue().id;
    return this._http.get(`${environment.apiUrl}/api/bookings/customer/${userId}`);
  }

  public getBooking(bookingId: string): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/bookings/${bookingId}`);
  }

  public deleteBooking(bookingId: string): Observable<any> {
    return this._http.delete(`${environment.apiUrl}/api/bookings/${bookingId}`);
  }

  public getSeason(): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/new-booking/season`,);
  }

  public getAvailability(dateFrom: Date, dateTo: Date): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/new-booking/availability`,
      {params: {
        'date-from': dateFrom.toISOString(),
        'date-to': dateTo.toISOString()
      }});
  }

  public generateBooking(booking: Booking): Observable<any> {
    return this._http.post(`${environment.apiUrl}/api/new-booking/checkout`, booking);
  }

  public getRankUmbrellas(): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/catalog/rank-umbrellas`);
  }


  public getServices(): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/catalog/services`);
  }

  public editBooking(bookingId: string, modifiedFields: Object): Observable<any> {
    return this._http.put(`${environment.apiUrl}/api/bookings/${bookingId}`, modifiedFields);
  }

  public getCustomer(customerId: string): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/customers/${customerId}`);
  }
}
