import {Component, Input, OnInit} from '@angular/core';
import {BookingState} from "../../models/booking-state.model";

@Component({
  selector: 'app-booking-state-extended',
  templateUrl: './booking-state-extended.component.html',
  styleUrls: ['./booking-state-extended.component.scss']
})
export class BookingStateExtendedComponent implements OnInit {
  @Input() bookingState: BookingState;

  constructor() { }

  ngOnInit(): void {
  }
}
