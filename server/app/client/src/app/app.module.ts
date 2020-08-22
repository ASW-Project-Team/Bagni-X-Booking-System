import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/customer/main/home/home.component';
import { FeedComponent } from './components/customer/main/feed/feed.component';
import { BookingsComponent } from './components/customer/main/bookings/bookings.component';
import { ProfileComponent } from './components/customer/main/profile/profile.component';
import { MainAppbarComponent } from './components/shared/appbars/main-appbar/main-appbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { ImgLandscapeComponent } from './components/shared/img-landscape/img-landscape.component';
import { MatButtonModule } from '@angular/material/button';
import { FabComponent } from './components/shared/fab/fab.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SalableCardComponent } from './components/shared/salable-card/salable-card.component';
import { LoadingScreenComponent } from './components/shared/loading-screen/loading-screen.component';
import { NewsCardComponent } from './components/shared/news-card/news-card.component';
import { NewsDatePipe } from "./utils/news.datepipe";
import { MatRippleModule } from '@angular/material/core';
import { NewsComponent } from './components/customer/news/news.component';
import { CustomerMainAppbarComponent } from './components/shared/appbars/customer-main-appbar/customer-main-appbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedComponent,
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
    NewsComponent,
    CustomerMainAppbarComponent,
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
    MatRippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
    );
  }
}
