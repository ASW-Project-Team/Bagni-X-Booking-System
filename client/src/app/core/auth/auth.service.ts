import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerModel} from "../../shared/models/customer.model";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

/**
 * The authentication service is used to login & logout of the Angular app, it notifies other components when the user
 * logs in & out, and allows access the currently logged in user.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // The RxJS BehaviorSubject is a special type of Subject that keeps hold of the current value and emits it to any
  // new subscribers as soon as they subscribe, while regular Subjects don't store the current value and only emit
  // values that are published after a subscription is created
  private _currentCustomerSubject: BehaviorSubject<CustomerModel>;
  private _currentCustomer: Observable<CustomerModel>;

  constructor(private _http: HttpClient) {
    this._currentCustomerSubject = new BehaviorSubject<CustomerModel>(JSON.parse(localStorage.getItem('currentCustomer')));
    this._currentCustomer = this._currentCustomerSubject.asObservable();
  }

  public currentCustomerValue(): CustomerModel {
    return this._currentCustomerSubject.value;
  }

  public login(email: string, password: string ): Observable<CustomerModel> {
    return this._http.post<CustomerModel>(`${environment.apiUrl}/api/auth/customers/login`, { email, password })
      .pipe(map(customer => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentCustomer', JSON.stringify(customer));
        this._currentCustomerSubject.next(customer);
        return customer;
      }));
  }

  public register(customer: CustomerModel): Observable<CustomerModel> {
    return this._http.post<CustomerModel>(`${environment.apiUrl}/api/auth/customers/register`, customer)
      .pipe(map(customer => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentCustomer', JSON.stringify(customer));
        this._currentCustomerSubject.next(customer);
        return customer;
      }));
  }

  public logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem("currentCustomer");
    this._currentCustomerSubject.next(null);
  }


  public deleteCustomer(): Observable<any> {
    localStorage.removeItem("currentCustomer");
    this._currentCustomerSubject.next(null);
    return this._http.delete(`${environment.apiUrl}/api/customers/${this._currentCustomerSubject.value.id}`);
  }


  public isLoggedIn() {
    let currentCustomer = this.currentCustomerValue();
    return currentCustomer && currentCustomer.jwt;
  }


  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }
}
