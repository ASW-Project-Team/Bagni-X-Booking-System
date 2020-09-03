import {Component, Input, OnInit} from '@angular/core';
import {Booking, BookingModel} from "../../models/booking.model";
import {RankUmbrellaModel} from "../../models/rank-umbrella.model";

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss']
})
export class BookingCardComponent implements OnInit {
  @Input('is-last-card') isLastCard: boolean = false;
  @Input('booking') booking: Booking;

  constructor() { }

  ngOnInit(): void { }
}
