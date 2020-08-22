import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./components/customer/main/home/home.component";
import { FeedComponent } from "./components/customer/main/feed/feed.component";
import { BookingsComponent } from "./components/customer/main/bookings/bookings.component";
import { ProfileComponent } from "./components/customer/main/profile/profile.component";
import { PageNotFoundComponent } from "./components/shared/page-not-found/page-not-found.component";
import {NewsComponent} from "./components/customer/news/news.component";

// populate app routes
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'news/:id', component: NewsComponent },

  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
