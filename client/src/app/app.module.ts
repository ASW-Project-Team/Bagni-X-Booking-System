import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/customer/home/home.component';
import { NewsComponent } from './modules/customer/news/news.component';
import { BookingsComponent } from './modules/customer/bookings/bookings.component';
import { ProfileComponent } from './modules/customer/profile/profile.component';
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
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { ImgLandscapeComponent } from './shared/components/img-landscape/img-landscape.component';
import { MatButtonModule } from '@angular/material/button';
import { FabComponent } from './shared/components/fab/fab.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SalableCardComponent } from './shared/components/salable-card/salable-card.component';
import { LoadingScreenComponent } from './shared/components/loading-screen/loading-screen.component';
import { NewsCardComponent } from './shared/components/news-card/news-card.component';
import {NewsDatePipe, NewsDatePipeExtended} from "./shared/pipes/news-date.pipe";
import { MatRippleModule } from '@angular/material/core';
import { NewsDetailsComponent } from './modules/customer/news-details/news-details.component';
import { CustomerMainAppbarComponent } from './shared/components/appbars/customer-main-appbar/customer-main-appbar.component';
import { NestedAppbarComponent } from './shared/components/appbars/nested-appbar/nested-appbar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BookingCardComponent } from './shared/components/booking-card/booking-card.component';
import { BookingStateComponent } from './shared/components/booking-state/booking-state.component';
import {BookingDatePipe, BookingDatePipeExtended} from "./shared/pipes/booking-date.pipe";
import { BookingDetailsComponent } from './modules/customer/booking-details/booking-details.component';
import { BookingStateExtendedComponent } from './shared/components/booking-state-extended/booking-state-extended.component';
import { BookingSummaryComponent } from './shared/components/booking-summary/booking-summary.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AlertDialogComponent } from './shared/components/alert-dialog/alert-dialog.component';
import { LoginComponent } from './modules/customer/login/login.component';
import { RegisterComponent } from './modules/customer/register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {JwtInterceptor} from "./core/interceptors/jwt.interceptor";
import {HttpErrorInterceptor} from "./core/interceptors/http-error.interceptor";
import { MatInputModule } from '@angular/material/input';
import {fakeBackendProvider} from "./core/interceptors/fake-backend.interceptor";
import { SettingsListItemComponent } from './shared/components/settings-list-item/settings-list-item.component';
import { PeriodStepComponent } from './modules/customer/new-booking/steps/period-step/period-step.component';
import { CustomizeStepComponent } from './modules/customer/new-booking/steps/customize-step/customize-step.component';
import { CheckoutStepComponent } from './modules/customer/new-booking/steps/checkout-step/checkout-step.component';
import { NewBookingComponent } from './modules/customer/new-booking/new-booking.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from '@angular/material/select';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { SalablePickerComponent } from './modules/customer/new-booking/steps/customize-step/salable-picker-card/salable-picker.component';
import { QuantitySelectorComponent } from './modules/customer/new-booking/steps/customize-step/salable-picker-card/quantity-selector/quantity-selector.component';
import { NewBookingAppbarComponent } from './modules/customer/new-booking/new-booking-appbar/new-booking-appbar.component';
import { CartComponent } from './modules/customer/new-booking/new-booking-appbar/cart/cart.component';
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
    SettingsListItemComponent,
    PeriodStepComponent,
    CustomizeStepComponent,
    CheckoutStepComponent,
    NewBookingComponent,
    BookingDatePipeExtended,
    SalablePickerComponent,
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
      domSanitizer.bypassSecurityTrustResourceUrl('assets/mdi.svg')
    );
  }
}
