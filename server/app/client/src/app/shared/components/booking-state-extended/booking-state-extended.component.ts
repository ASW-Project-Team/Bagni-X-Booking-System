import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../models/booking.model";
import {BookingState, BookingStateHandler} from "../../models/component-specific/booking-state.model";

@Component({
  selector: 'app-booking-state-extended',
  templateUrl: './booking-state-extended.component.html',
  styleUrls: ['./booking-state-extended.component.scss']
})
export class BookingStateExtendedComponent implements OnInit {
  @Input('booking') booking: Booking;
  currentState: BookingState;

  constructor() { }

  ngOnInit(): void {
    const bookingStateHandler = new BookingStateHandler(this.booking);
    this.currentState = bookingStateHandler.getCurrentState();
  }
}
