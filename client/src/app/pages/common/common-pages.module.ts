import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {NewBookingModule} from "./new-booking/new-booking.module";
import {SharedModule} from "../../shared/shared.module";
import {AppRoutingModule} from "../../app-routing.module";



@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    NewBookingModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    NewBookingModule,
    PageNotFoundComponent
  ]
})
export class CommonPagesModule { }
