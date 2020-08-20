import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/customer/home/home.component';
import { FeedComponent } from './components/customer/feed/feed.component';
import { BookingsComponent } from './components/customer/bookings/bookings.component';
import { ProfileComponent } from './components/customer/profile/profile.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { ImgLandscapeComponent } from './components/shared/utils/img-landscape/img-landscape.component';
import {MatButtonModule} from '@angular/material/button';
import { FabComponent } from './components/shared/fab/fab.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SalableCardComponent } from './components/shared/salable-card/salable-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedComponent,
    BookingsComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    ImgLandscapeComponent,
    FabComponent,
    SalableCardComponent,
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
    MatProgressSpinnerModule
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
