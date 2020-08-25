import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/customer/home/home.component';
import { NewsFeedComponent } from './pages/customer/news-feed/news-feed.component';
import { BookingsComponent } from './pages/customer/bookings/bookings.component';
import { ProfileComponent } from './pages/customer/profile/profile.component';
import { MainAppbarComponent } from './shared/components/appbars/main-appbar/main-appbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ImgLandscapeComponent } from './shared/components/img-landscape/img-landscape.component';
import { MatButtonModule } from '@angular/material/button';
import { FabComponent } from './shared/components/fab/fab.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SalableCardComponent } from './shared/components/salable-card/salable-card.component';
import { LoadingScreenComponent } from './shared/components/loading-screen/loading-screen.component';
import { NewsCardComponent } from './shared/components/news-card/news-card.component';
import {NewsDatePipe, NewsDatePipeExtended} from "./shared/pipes/news-date.pipe";
import { MatRippleModule } from '@angular/material/core';
import { NewsComponent } from './pages/customer/news/news.component';
import { CustomerMainAppbarComponent } from './shared/components/appbars/customer-main-appbar/customer-main-appbar.component';
import { NestedAppbarComponent } from './shared/components/appbars/nested-appbar/nested-appbar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BookingCardComponent } from './shared/components/booking-card/booking-card.component';
import { BookingStateComponent } from './shared/components/booking-state/booking-state.component';
import {BookingDatePipe} from "./shared/pipes/booking-date.pipe";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewsFeedComponent,
    BookingsComponent,
    ProfileComponent,
    MainAppbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    ImgLandscapeComponent,
    FabComponent,
    SalableCardComponent,
    LoadingScreenComponent,
    NewsCardComponent,
    NewsDatePipe,
    BookingDatePipe,
    NewsDatePipeExtended,
    NewsComponent,
    CustomerMainAppbarComponent,
    NestedAppbarComponent,
    BookingCardComponent,
    BookingStateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSnackBarModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg')
    );
  }
}
