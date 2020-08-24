import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./pages/customer/home/home.component";
import { NewsFeedComponent } from "./pages/customer/news-feed/news-feed.component";
import { BookingsComponent } from "./pages/customer/bookings/bookings.component";
import { ProfileComponent } from "./pages/customer/profile/profile.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import {NewsComponent} from "./pages/customer/news/news.component";

// populate app routes
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // customer
  { path: 'home', component: HomeComponent },
  { path: 'news', component: NewsFeedComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'news/:id', component: NewsComponent },

  // todo admin

  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
