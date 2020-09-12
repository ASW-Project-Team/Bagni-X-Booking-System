import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./modules/customer/home/home.component";
import { NewsComponent } from "./modules/customer/news/news.component";
import { BookingsComponent } from "./modules/customer/bookings/bookings.component";
import { ProfileComponent } from "./modules/customer/profile/profile.component";
import { PageNotFoundComponent } from "./modules/page-not-found/page-not-found.component";
import {NewsDetailsComponent} from "./modules/customer/news-details/news-details.component";
import {BookingDetailsComponent} from "./modules/customer/booking-details/booking-details.component";
import {UserAuthGuard} from "./core/guards/user-auth.guard";
import {LoginComponent} from "./modules/customer/login/login.component";
import {RegisterComponent} from "./modules/customer/register/register.component";
import {NewBookingComponent} from "./modules/customer/new-booking/new-booking.component";


// populate app routes
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // customer
  { path: 'home', component: HomeComponent },
  { path: 'news', component: NewsComponent },
  { path: 'news/:id', component: NewsDetailsComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [UserAuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'bookings', component: BookingsComponent, canActivate: [UserAuthGuard] },
  { path: 'bookings/:id', component: BookingDetailsComponent, canActivate: [UserAuthGuard] },
  { path: 'new-booking', component: NewBookingComponent, canActivate: [UserAuthGuard] },

  // todo admin

  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  // new native way to scroll on top on route change
  // https://blog.angular.io/angular-v6-1-now-available-typescript-2-9-scroll-positioning-and-more-9f1c03007bb6
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
