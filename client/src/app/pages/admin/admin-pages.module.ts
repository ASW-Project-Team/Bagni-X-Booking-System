import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {AppRoutingModule} from "../../app-routing.module";
import { AdminBookingsComponent } from './admin-bookings/admin-bookings.component';
import { AdminStatsComponent } from './admin-stats/admin-stats.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { AdminRanksComponent } from './admin-ranks/admin-ranks.component';
import { AdminServicesComponent } from './admin-services/admin-services.component';
import { AdminHomeCustomizeComponent } from './admin-home-customize/admin-home-customize.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminContactsComponent } from './admin-contacts/admin-contacts.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminBookingDetailsComponent } from './admin-booking-details/admin-booking-details.component';
import { AdminNewsDetailsComponent } from './admin-news-details/admin-news-details.component';
import { AdminServiceDetailsComponent } from './admin-service-details/admin-service-details.component';
import { AdminContactDetailsComponent } from './admin-contact-details/admin-contact-details.component';
import {AdminRankDetailsModule} from "./admin-rank-details/admin-rank-details.module";
import { AdminContactEditComponent } from './admin-contact-edit/admin-contact-edit.component';


@NgModule({
  declarations: [
    AdminBookingsComponent,
    AdminStatsComponent,
    AdminNewsComponent,
    AdminRanksComponent,
    AdminServicesComponent,
    AdminHomeCustomizeComponent,
    AdminProfileComponent,
    AdminContactsComponent,
    AdminLoginComponent,
    AdminBookingDetailsComponent,
    AdminNewsDetailsComponent,
    AdminServiceDetailsComponent,
    AdminContactDetailsComponent,
    AdminContactEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    AdminRankDetailsModule
  ],
  exports: [
    AdminBookingsComponent,
    AdminStatsComponent,
    AdminNewsComponent,
    AdminRanksComponent,
    AdminServicesComponent,
    AdminHomeCustomizeComponent,
    AdminProfileComponent,
    AdminContactsComponent,
    AdminLoginComponent,
    AdminBookingDetailsComponent,
    AdminNewsDetailsComponent,
    AdminServiceDetailsComponent,
    AdminContactDetailsComponent,
    AdminRankDetailsModule,
    AdminContactEditComponent
  ]
})
export class AdminPagesModule { }
