import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./components/customer/home/home.component";
import { FeedComponent } from "./components/customer/feed/feed.component";
import { BookingsComponent } from "./components/customer/bookings/bookings.component";
import { ProfileComponent } from "./components/customer/profile/profile.component";
import { PageNotFoundComponent } from "./components/shared/page-not-found/page-not-found.component";

// populate app routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
