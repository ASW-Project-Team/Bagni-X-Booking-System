import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainAppbarComponent} from "./appbars/main-appbar/main-appbar.component";
import {AlertDialogComponent} from "./alert-dialog/alert-dialog.component";
import {CustomerMainAppbarComponent} from "./appbars/customer-main-appbar/customer-main-appbar.component";
import {NestedAppbarComponent} from "./appbars/nested-appbar/nested-appbar.component";
import {BookingCardComponent} from "./booking-card/booking-card.component";
import {BookingStateComponent} from "./booking-state/booking-state.component";
import {BookingStateExtendedComponent} from "./booking-state-extended/booking-state-extended.component";
import {BookingSummaryComponent} from "./booking-summary/booking-summary.component";
import {FabComponent} from "./fab/fab.component";
import {FooterComponent} from "./footer/footer.component";
import {ImgLandscapeComponent} from "./img-landscape/img-landscape.component";
import {LoadingScreenComponent} from "./loading-screen/loading-screen.component";
import {SmallCardComponent} from "./small-card/small-card.component";
import {SalableCardComponent} from "./salable-card/salable-card.component";
import {SettingsListItemComponent} from "./settings-list-item/settings-list-item.component";
import {AppRoutingModule} from "../../app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialComponentsModule} from "../material-components/material-components.module";
import {SharedPipesModule} from "../pipes/shared-pipes.module";
import {AdminMainAppbarComponent} from "./appbars/admin-main-appbar/admin-main-appbar.component";
import {UserInfoComponent} from "./user-info/user-info.component";
import {SharedDirectivesModule} from "../directives/shared-directives.module";
import {ImageUploadComponent} from './image-upload/image-upload.component';
import {HttpStatusIndicatorComponent} from './http-status-indicator/http-status-indicator.component';
import { UnregCustomerFormComponent } from './unreg-customer-form/unreg-customer-form.component';
import {NewBookingAppbarComponent} from "./new-booking/new-booking-appbar/new-booking-appbar.component";
import {CheckoutStepComponent} from "./new-booking/steps/checkout-step/checkout-step.component";
import {CustomizeStepComponent} from "./new-booking/steps/customize-step/customize-step.component";
import {SalablePickerComponent} from "./new-booking/steps/customize-step/salable-picker-card/salable-picker.component";
import {PeriodStepComponent} from "./new-booking/steps/period-step/period-step.component";
import {QuantitySelectorComponent} from "./new-booking/steps/customize-step/salable-picker-card/quantity-selector/quantity-selector.component";
import {CartComponent} from "./new-booking/new-booking-appbar/cart/cart.component";
import { CustomerStepComponent } from './new-booking/steps/customer-step/customer-step.component';


@NgModule({
  declarations: [
    MainAppbarComponent,
    AlertDialogComponent,
    CustomerMainAppbarComponent,
    NestedAppbarComponent,
    BookingCardComponent,
    BookingStateComponent,
    BookingStateExtendedComponent,
    BookingSummaryComponent,
    FabComponent,
    FooterComponent,
    ImgLandscapeComponent,
    LoadingScreenComponent,
    SmallCardComponent,
    SalableCardComponent,
    SettingsListItemComponent,
    AdminMainAppbarComponent,
    UserInfoComponent,
    ImageUploadComponent,
    HttpStatusIndicatorComponent,
    UnregCustomerFormComponent,
    NewBookingAppbarComponent,
    CheckoutStepComponent,
    CustomizeStepComponent,
    SalablePickerComponent,
    PeriodStepComponent,
    QuantitySelectorComponent,
    CartComponent,
    CustomerStepComponent
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    SharedPipesModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedDirectivesModule
  ],
  exports: [
    AlertDialogComponent,
    CustomerMainAppbarComponent,
    NestedAppbarComponent,
    BookingCardComponent,
    BookingStateComponent,
    BookingStateExtendedComponent,
    BookingSummaryComponent,
    FabComponent,
    FooterComponent,
    ImgLandscapeComponent,
    LoadingScreenComponent,
    SmallCardComponent,
    SalableCardComponent,
    SettingsListItemComponent,
    AdminMainAppbarComponent,
    UserInfoComponent,
    ImageUploadComponent,
    HttpStatusIndicatorComponent,
    UnregCustomerFormComponent,
    NewBookingAppbarComponent,
    CheckoutStepComponent,
    CustomizeStepComponent,
    SalablePickerComponent,
    PeriodStepComponent,
    QuantitySelectorComponent,
    CartComponent,
    CustomerStepComponent
  ]
})
export class SharedComponentsModule {
}
