import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./pages/customer/home/home.component";
import { NewsComponent } from "./pages/customer/news/news.component";
import { BookingsComponent } from "./pages/customer/bookings/bookings.component";
import { ProfileComponent } from "./pages/customer/profile/profile.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import {NewsDetailsComponent} from "./pages/customer/news-details/news-details.component";
import {BookingDetailsComponent} from "./pages/customer/booking-details/booking-details.component";

// populate app routes
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // customer
  { path: 'home', component: HomeComponent },
  { path: 'news', component: NewsComponent },
  { path: 'news/:id', component: NewsDetailsComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'bookings/:id', component: BookingDetailsComponent },
  { path: 'profile', component: ProfileComponent },

  // todo admin

  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
