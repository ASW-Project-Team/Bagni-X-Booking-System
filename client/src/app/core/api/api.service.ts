import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Booking} from "../../shared/models/booking.model";


/**
 * Service whose aim is to retrive data from the bagniX API.
 */

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getHome(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/home`);
  }

  public getBathhouse(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/bathhouse`);
  }

  public editBathhouse(newData: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/bathhouse`, newData);
  }

  public getHomeCards(page: number = 0): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/home-cards`,{ params: {'page-id': page.toString()} });
  }

  public editHomeCard(homeCardId: string,newData: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/home-cards/${homeCardId}`, newData);
  }


  public getHomeCard(homeCardId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/home-cards/${homeCardId}`);
  }

  public getAllNews(page: number = 0): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/news`,{ params: {'page-id': page.toString()} });
  }

  public getNews(newsId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/news/${newsId}`);
  }

  public editNews(newsId: string, modifiedData: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/news/${newsId}`, modifiedData);
  }

  public deleteNews(newsId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/news/${newsId}`);
  }

  public createNews(newData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/news`, newData);
  }

  public getAllBookings(page: number = 0): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/bookings`,{ params: {'page-id': page.toString()} });
  }

  public getCustomerBookings(customerId: string, page: number = 0): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/bookings/customer/${customerId}`,{ params: {'page-id': page.toString()} });
  }

  public getBooking(bookingId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/bookings/${bookingId}`);
  }

  public deleteBooking(bookingId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/bookings/${bookingId}`);
  }

  public getSeason(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/new-booking/season`,);
  }

  public getAvailability(dateFrom: Date, dateTo: Date): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/new-booking/availability`,
      {params: {
        'date-from': dateFrom.toISOString(),
        'date-to': dateTo.toISOString()
      }});
  }

  public generateBooking(booking: Booking): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/new-booking/checkout`, booking);
  }

  public getRankUmbrellas(page: number = 0): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/catalog/rank-umbrellas`,{ params: {'page-id': page.toString()} });
  }

  public getRankUmbrella(rankId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/catalog/rank-umbrellas/${rankId}`);
  }

  public createRankUmbrella(values: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/catalog/rank-umbrellas`, values);
  }

  public editRankUmbrella(rankId: string, modifiedFields: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/catalog/rank-umbrellas/${rankId}`, modifiedFields);
  }

  public deleteRankUmbrella(rankId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/catalog/rank-umbrellas/${rankId}`);
  }

  public getServices(page: number = 0): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/catalog/services`,{ params: {'page-id': page.toString()} });
  }

  public createService(values: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/catalog/services`, values);
  }

  public getService(serviceId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/catalog/services/${serviceId}`);
  }

  public editService(serviceId: string, modifiedFields: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/catalog/services/${serviceId}`, modifiedFields);
  }

  public deleteService(serviceId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/catalog/services/${serviceId}`);
  }

  public editBooking(bookingId: string, modifiedFields: Object): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/bookings/${bookingId}`, modifiedFields);
  }

  public getCustomers(page: number = 0): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/customers`,{ params: {'page-id': page.toString()} });
  }

  public getCustomer(customerId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/customers/${customerId}`);
  }

  public deleteUnregisteredCustomer(customerId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/customers/${customerId}`);
  }

  public editUnregisteredCustomer(customerId: string, modifiedData: Object): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/customers/${customerId}`, modifiedData);
  }

  public createUnregisteredCustomer(newData: Object): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/customers`, newData);
  }

  public getCurrentSeasonStats() : Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/stats/current-season`);
  }
}
