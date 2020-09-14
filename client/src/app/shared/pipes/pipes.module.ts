import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsDatePipe, NewsDatePipeExtended} from "./news-date.pipe";
import {BookingDatePipe, BookingDatePipeExtended} from "./booking-date.pipe";



@NgModule({
  declarations: [
    NewsDatePipe,
    NewsDatePipeExtended,
    BookingDatePipe,
    BookingDatePipeExtended
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NewsDatePipe,
    NewsDatePipeExtended,
    BookingDatePipe,
    BookingDatePipeExtended
  ]
})
export class PipesModule { }
