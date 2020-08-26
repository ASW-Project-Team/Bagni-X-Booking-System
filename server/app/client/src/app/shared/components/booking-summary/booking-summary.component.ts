import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../models/booking.model";

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.scss']
})
export class BookingSummaryComponent implements OnInit {
  @Input('booking') booking: Booking;

  constructor() { }

  ngOnInit(): void { }
}
