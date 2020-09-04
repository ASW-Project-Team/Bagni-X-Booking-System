import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../models/booking.model";
import {BookingState, BookingStateModel} from "../../models/booking-state.model";

/**
 * Component used to show the booking state in a structured way. The
 * state is computed starting from booking data.
 */

@Component({
  selector: 'app-booking-state',
  templateUrl: './booking-state.component.html',
  styleUrls: ['./booking-state.component.scss']
})
export class BookingStateComponent implements OnInit {
  @Input() bookingState: BookingState;

  constructor() { }

  ngOnInit(): void {
  }
}
