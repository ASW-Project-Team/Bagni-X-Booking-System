import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookingDetailsComponent} from "./booking-details/booking-details.component";
import {BookingsComponent} from "./bookings/bookings.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {NewsComponent} from "./news/news.component";
import {NewsDetailsComponent} from "./news-details/news-details.component";
import {ProfileComponent} from "./profile/profile.component";
import {RegisterComponent} from "./register/register.component";
import {SharedModule} from "../../shared/shared.module";
import {AppRoutingModule} from "../../app-routing.module";
import {NewBookingComponent} from "./new-booking/new-booking.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";


@NgModule({
  declarations: [
    BookingDetailsComponent,
    BookingsComponent,
    HomeComponent,
    LoginComponent,
    NewsComponent,
    NewsDetailsComponent,
    ProfileComponent,
    RegisterComponent,
    NewBookingComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
    BookingDetailsComponent,
    BookingsComponent,
    HomeComponent,
    LoginComponent,
    NewsComponent,
    NewsDetailsComponent,
    ProfileComponent,
    RegisterComponent,
    NewBookingComponent,
    PageNotFoundComponent
  ]
})
export class CustomerPagesModule { }
