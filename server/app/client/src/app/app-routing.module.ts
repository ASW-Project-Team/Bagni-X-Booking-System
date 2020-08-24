import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./modules/customer/home/home.component";
import { FeedComponent } from "./modules/customer/news-feed/feed.component";
import { BookingsComponent } from "./modules/customer/bookings/bookings.component";
import { ProfileComponent } from "./modules/customer/profile/profile.component";
import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";
import {NewsComponent} from "./modules/customer/news/news.component";

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
