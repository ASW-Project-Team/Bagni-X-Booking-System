import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Customer} from "../../shared/models/customer";
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
  private _currentCustomerSubject: BehaviorSubject<Customer>;
  private _currentCustomer: Observable<Customer>;

  constructor(private _http: HttpClient) {
    this._currentCustomerSubject = new BehaviorSubject<Customer>(JSON.parse(localStorage.getItem('currentCustomer')));
    this._currentCustomer = this._currentCustomerSubject.asObservable();
  }

  public currentCustomerValue(): Customer {
    return this._currentCustomerSubject.value;
  }

  public login(email: string, password: string ): Observable<Customer> {
    return this._http.post<Customer>(`${environment.apiUrl}/api/auth/customers/login`, { email, password })
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


  public isLoggedIn() {
    let currentCustomer = this.currentCustomerValue();
    return currentCustomer && currentCustomer.jwt;
  }


  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }
}
