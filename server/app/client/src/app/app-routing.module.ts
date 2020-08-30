import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./pages/customer/home/home.component";
import { NewsComponent } from "./pages/customer/news/news.component";
import { BookingsComponent } from "./pages/customer/bookings/bookings.component";
import { ProfileComponent } from "./pages/customer/profile/profile.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import {NewsDetailsComponent} from "./pages/customer/news-details/news-details.component";
import {BookingDetailsComponent} from "./pages/customer/booking-details/booking-details.component";
import {UserAuthGuard} from "./core/guards/user-auth.guard";
import {LoginComponent} from "./pages/customer/login/login.component";
import {RegisterComponent} from "./pages/customer/register/register.component";

// populate app routes
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // customer
  { path: 'home', component: HomeComponent },
  { path: 'news', component: NewsComponent },
  { path: 'news/:id', component: NewsDetailsComponent },
  { path: 'bookings', component: BookingsComponent, canActivate: [UserAuthGuard] },
  { path: 'bookings/:id', component: BookingDetailsComponent, canActivate: [UserAuthGuard] },
  { path: 'new-booking', component: BookingsComponent, canActivate: [UserAuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [UserAuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


  // todo admin

  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
