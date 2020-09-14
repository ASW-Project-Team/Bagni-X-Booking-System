import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../models/booking.model";

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss']
})
export class BookingCardComponent implements OnInit {
  @Input() isLastCard: boolean = false;
  @Input() booking: Booking;

  constructor() { }

  ngOnInit(): void { }
}
