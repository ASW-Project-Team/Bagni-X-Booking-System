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
      const bookingsData = data as BookingModel[];
      this.bookings = bookingsData.map(model => new Booking(model));
    });
  }
}
