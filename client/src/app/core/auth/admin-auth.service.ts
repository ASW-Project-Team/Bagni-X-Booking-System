import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {Admin, AdminModel} from "../../shared/models/admin.model";
import {Customer} from "../../shared/models/customer.model";

/**
 * The authentication service is used to login and logout the admin from the app. It notifies other
 * components when the admin logs in or out, and allows the access to the currently
 * logged in admin.
 */
@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  // The RxJS BehaviorSubject is a special type of Subject that keeps hold of the
  // current value and emits it to any new subscribers as soon as they subscribe.
  // Regular Subjects don't store the current value, and only emit values that
  // are published after a subscription is created
  private currentAdminSubject: BehaviorSubject<AdminModel>;
  private currentAdmin: Observable<AdminModel>;
  private readonly adminCookieName: string = 'currentAdmin';

  constructor(private httpClient: HttpClient) {
    this.currentAdminSubject = new BehaviorSubject<AdminModel>(JSON.parse(localStorage.getItem(this.adminCookieName)));
    this.currentAdmin = this.currentAdminSubject.asObservable();
  }

  public currentAdminValue(): AdminModel {
    return this.currentAdminSubject.value;
  }

  // updates only customer basic information, without updating jwt
  public updateAdminInfo(admin: Admin) {
    admin.jwt = this.currentAdminValue().jwt
    localStorage.setItem(this.adminCookieName, JSON.stringify(admin));
    this.currentAdminSubject.next(admin);
  }

  public login(credentials: { username: string, password: string }): Observable<AdminModel> {
    return this.httpClient.post<AdminModel>(`${environment.apiUrl}/api/auth/admins/login`, credentials)
      .pipe(map(admin => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem(this.adminCookieName, JSON.stringify(admin));
        this.currentAdminSubject.next(admin);
        return admin;
      }));
  }

  public logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem(this.adminCookieName);
    this.currentAdminSubject.next(null);
  }


  public deleteAdmin(): Observable<any> {
    localStorage.removeItem(this.adminCookieName);
    this.currentAdminSubject.next(null);
    return this.httpClient.delete(`${environment.apiUrl}/api/admins/${this.currentAdminSubject.value.id}`);
  }


  public isLoggedIn() {
    let currentAdmin = this.currentAdminValue();
    return currentAdmin && currentAdmin.jwt;
  }


  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }
}
