import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./pages/customer/home/home.component";
import { NewsComponent } from "./pages/customer/news/news.component";
import { BookingsComponent } from "./pages/customer/bookings/bookings.component";
import { ProfileComponent } from "./pages/customer/profile/profile.component";
import { PageNotFoundComponent } from "./pages/customer/page-not-found/page-not-found.component";
import {NewsDetailsComponent} from "./pages/customer/news-details/news-details.component";
import {BookingDetailsComponent} from "./pages/customer/booking-details/booking-details.component";
import {CustomerAuthGuard} from "./core/guards/customer-auth.guard";
import {LoginComponent} from "./pages/customer/login/login.component";
import {RegisterComponent} from "./pages/customer/register/register.component";
import {NewBookingComponent} from "./pages/customer/new-booking/new-booking.component";
import {AdminLoginComponent} from "./pages/admin/admin-login/admin-login.component";
import {AdminBookingsComponent} from "./pages/admin/admin-bookings/admin-bookings.component";
import {AdminAuthGuard} from "./core/guards/admin-auth.guard";
import {AdminContactsComponent} from "./pages/admin/admin-contacts/admin-contacts.component";
import {AdminHomeCustomizeComponent} from "./pages/admin/admin-home-customize/admin-home-customize.component";
import {AdminNewsComponent} from "./pages/admin/admin-news/admin-news.component";
import {AdminProfileComponent} from "./pages/admin/admin-profile/admin-profile.component";
import {AdminRanksComponent} from "./pages/admin/admin-ranks/admin-ranks.component";
import {AdminServicesComponent} from "./pages/admin/admin-services/admin-services.component";
import {AdminStatsComponent} from "./pages/admin/admin-stats/admin-stats.component";
import {AdminBookingDetailsComponent} from "./pages/admin/admin-booking-details/admin-booking-details.component";
import {AdminNewsDetailsComponent} from "./pages/admin/admin-news-details/admin-news-details.component";
import {AdminServiceDetailsComponent} from "./pages/admin/admin-service-details/admin-service-details.component";
import {AdminContactDetailsComponent} from "./pages/admin/admin-contact-details/admin-contact-details.component";
import {AdminRankDetailsComponent} from "./pages/admin/admin-rank-details/admin-rank-details.component";
import {AdminContactCreateComponent} from "./pages/admin/admin-contact-create/admin-contact-create.component";
import {AdminHomeCardDetailsComponent} from "./pages/admin/admin-home-card-details/admin-home-card-details.component";
import {AdminBookingCreateComponent} from "./pages/admin/admin-booking-create/admin-booking-create.component";


// populate app routes
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // customer
  { path: 'home', component: HomeComponent },
  { path: 'news', component: NewsComponent },
  { path: 'news/:id', component: NewsDetailsComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [CustomerAuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'bookings', component: BookingsComponent, canActivate: [CustomerAuthGuard] },
  { path: 'bookings/:id', component: BookingDetailsComponent, canActivate: [CustomerAuthGuard] },
  { path: 'new-booking', component: NewBookingComponent, canActivate: [CustomerAuthGuard] },

  { path: 'admin', redirectTo: 'admin/login' },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/bookings', component: AdminBookingsComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/bookings/:id', component: AdminBookingDetailsComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/new-booking', component: AdminBookingCreateComponent, canActivate: [AdminAuthGuard] },

  { path: 'admin/contacts', component: AdminContactsComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/contacts/:id', component: AdminContactDetailsComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/contacts/edit/:id', component: AdminContactCreateComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/new-contact', component: AdminContactCreateComponent, canActivate: [AdminAuthGuard] },

  { path: 'admin/home-customize', component: AdminHomeCustomizeComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/home-cards/:id', component: AdminHomeCardDetailsComponent, canActivate: [AdminAuthGuard] },

  { path: 'admin/news', component: AdminNewsComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/new-news', component: AdminNewsDetailsComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/news/:id', component: AdminNewsDetailsComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/profile', component: AdminProfileComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/rank-umbrellas', component: AdminRanksComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/rank-umbrellas/:id', component: AdminRankDetailsComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/new-rank-umbrella', component: AdminRankDetailsComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/services', component: AdminServicesComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/services/:id', component: AdminServiceDetailsComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/new-service', component: AdminServiceDetailsComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/stats', component: AdminStatsComponent, canActivate: [AdminAuthGuard] },

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
