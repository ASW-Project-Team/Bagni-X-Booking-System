import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewBookingComponent} from "./new-booking.component";
import {NewBookingAppbarComponent} from "./new-booking-appbar/new-booking-appbar.component";
import {CheckoutStepComponent} from "./steps/checkout-step/checkout-step.component";
import {CustomizeStepComponent} from "./steps/customize-step/customize-step.component";
import {SalablePickerComponent} from "./steps/customize-step/salable-picker-card/salable-picker.component";
import {PeriodStepComponent} from "./steps/period-step/period-step.component";
import {SharedModule} from "../../../shared/shared.module";
import {QuantitySelectorComponent} from "./steps/customize-step/salable-picker-card/quantity-selector/quantity-selector.component";
import {CartComponent} from "./new-booking-appbar/cart/cart.component";



@NgModule({
  declarations: [
    NewBookingComponent,
    NewBookingAppbarComponent,
    CheckoutStepComponent,
    CustomizeStepComponent,
    SalablePickerComponent,
    PeriodStepComponent,
    QuantitySelectorComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NewBookingComponent
  ]
})
export class NewBookingModule { }
