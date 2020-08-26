import {Component, Input, OnInit} from '@angular/core';
import {Booking, BookingModel} from "../../models/booking.model";
import {BookingState, BookingStateHandler} from "../../models/component-specific/booking-state.model";

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
  @Input('booking') booking: Booking;
  currentState: BookingState;

  constructor() { }

  ngOnInit(): void {
    this.currentState = this.booking.getState();
  }
}
