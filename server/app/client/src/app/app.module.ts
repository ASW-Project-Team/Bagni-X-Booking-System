import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/customer/home/home.component';
import { NewsComponent } from './pages/customer/news/news.component';
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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import { NewsDetailsComponent } from './pages/customer/news-details/news-details.component';
import { CustomerMainAppbarComponent } from './shared/components/appbars/customer-main-appbar/customer-main-appbar.component';
import { NestedAppbarComponent } from './shared/components/appbars/nested-appbar/nested-appbar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BookingCardComponent } from './shared/components/booking-card/booking-card.component';
import { BookingStateComponent } from './shared/components/booking-state/booking-state.component';
import {BookingDatePipe, BookingDatePipeExtended} from "./shared/pipes/booking-date.pipe";
import { BookingDetailsComponent } from './pages/customer/booking-details/booking-details.component';
import { BookingStateExtendedComponent } from './shared/components/booking-state-extended/booking-state-extended.component';
import { BookingSummaryComponent } from './shared/components/booking-summary/booking-summary.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AlertDialogComponent } from './shared/components/alert-dialog/alert-dialog.component';
import { LoginComponent } from './pages/customer/login/login.component';
import { RegisterComponent } from './pages/customer/register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {JwtInterceptor} from "./core/interceptors/jwt.interceptor";
import {HttpErrorInterceptor} from "./core/interceptors/http-error.interceptor";
import { MatInputModule } from '@angular/material/input';
import {fakeBackendProvider} from "./core/interceptors/fake-backend.interceptor";
import { OptionsItemComponent } from './shared/components/options-item/options-item.component';
import { NbPeriodComponent } from './pages/customer/nb-period/nb-period.component';
import { NbCustomizeComponent } from './pages/customer/nb-customize/nb-customize.component';
import { NbCheckoutComponent } from './pages/customer/nb-checkout/nb-checkout.component';
import { NewBookingComponent } from './pages/customer/new-booking/new-booking.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from '@angular/material/select';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { BookingSalableSelectorComponent } from './shared/components/booking-salable-selector/booking-salable-selector.component';
import { QuantitySelectorComponent } from './shared/components/quantity-selector/quantity-selector.component';
import { NewBookingAppbarComponent } from './shared/components/appbars/new-booking-appbar/new-booking-appbar.component';
import { CartComponent } from './shared/components/cart/cart.component';
import {MatBadgeModule} from '@angular/material/badge';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewsComponent,
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
    NewsDetailsComponent,
    CustomerMainAppbarComponent,
    NestedAppbarComponent,
    BookingCardComponent,
    BookingStateComponent,
    BookingDetailsComponent,
    BookingStateExtendedComponent,
    BookingSummaryComponent,
    AlertDialogComponent,
    LoginComponent,
    RegisterComponent,
    OptionsItemComponent,
    NbPeriodComponent,
    NbCustomizeComponent,
    NbCheckoutComponent,
    NewBookingComponent,
    BookingDatePipeExtended,
    BookingSalableSelectorComponent,
    QuantitySelectorComponent,
    NewBookingAppbarComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatBadgeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: "it" },
    fakeBackendProvider // todo remove in production
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    registerLocaleData(localeIt, 'it');
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg')
    );
  }
}
