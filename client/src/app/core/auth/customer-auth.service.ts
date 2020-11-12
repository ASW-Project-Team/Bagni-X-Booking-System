import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Customer, CustomerModel} from "../../shared/models/customer.model";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

/**
 * The authentication service is used to login and logout from the app. It notifies other
 * components when the customer logs in or out, and allows the access to the currently
 * logged in customer.
 */
@Injectable({
  providedIn: 'root'
})
export class CustomerAuthService {
  // The RxJS BehaviorSubject is a special type of Subject that keeps hold of the
  // current value and emits it to any new subscribers as soon as they subscribe.
  // Regular Subjects don't store the current value, and only emit values that
  // are published after a subscription is created
  private currentCustomerSubject: BehaviorSubject<CustomerModel>;
  private currentCustomer: Observable<CustomerModel>;
  private readonly customerCookieName: string = 'currentCustomer';


  constructor(private httpClient: HttpClient) {
    this.currentCustomerSubject = new BehaviorSubject<CustomerModel>(JSON.parse(localStorage.getItem(this.customerCookieName)));
    this.currentCustomer = this.currentCustomerSubject.asObservable();
  }

  public currentCustomerValue(): CustomerModel {
    return this.currentCustomerSubject.value;
  }

  public login(credentials: {email: string, password: string}): Observable<CustomerModel> {
    return this.httpClient.post<CustomerModel>(`${environment.apiUrl}/api/auth/customers/login`, credentials)
      .pipe(map(customer => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem(this.customerCookieName, JSON.stringify(customer));
        this.currentCustomerSubject.next(customer);
        return customer;
      }));
  }

  // updates only customer basic information, without updating jwt
  public updateCustomerInfo(customer: Customer) {
    customer.jwt = this.currentCustomerValue().jwt
    localStorage.setItem(this.customerCookieName, JSON.stringify(customer));
    this.currentCustomerSubject.next(customer);
  }

  public register(customer: CustomerModel): Observable<CustomerModel> {
    return this.httpClient.post<CustomerModel>(`${environment.apiUrl}/api/auth/customers/register`, customer)
      .pipe(map(customer => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem(this.customerCookieName, JSON.stringify(customer));
        this.currentCustomerSubject.next(customer);
        return customer;
      }));
  }

  public logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem(this.customerCookieName);
    this.currentCustomerSubject.next(null);
  }


  public deleteCustomer(): Observable<any> {
    localStorage.removeItem(this.customerCookieName);
    this.currentCustomerSubject.next(null);
    return this.httpClient.delete(`${environment.apiUrl}/api/customers/${this.currentCustomerSubject.value.id}`);
  }


  public isLoggedIn() {
    let currentCustomer = this.currentCustomerValue();
    return currentCustomer && currentCustomer.jwt;
  }


  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }
}
