import { Component, OnInit } from '@angular/core';
import {Booking, BookingModel} from "../../../shared/models/booking.model";
import {ApiService} from "../../../core/api/api.service";


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  bookings: Booking[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUserBookings().subscribe(data => {
      this.bookings = [];
      data.forEach(bookingData => {
        this.bookings.push(new Booking(bookingData));
      });
    });
  }
}
