import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../../../shared/models/booking.model";

@Component({
  selector: 'app-new-booking-appbar',
  templateUrl: './new-booking-appbar.component.html',
  styleUrls: ['./new-booking-appbar.component.scss']
})
export class NewBookingAppbarComponent implements OnInit {
  @Input() backRoute: string;
  @Input() backPageName: string;
  @Input() booking: Booking;

  constructor() { }

  ngOnInit(): void {
  }

}
