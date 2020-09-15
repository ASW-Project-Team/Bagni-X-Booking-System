import { Component, OnInit } from '@angular/core';
import {Booking} from "../../../shared/models/booking.model";
import {ApiService} from "../../../core/api/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.scss']
})
export class AdminBookingsComponent implements OnInit {
   bookingsToConfirm: Booking[];
   confirmedBookings: Booking[];

  constructor(private api: ApiService,
              ) { }

  ngOnInit(): void {
    this.updateBookings();
  }

  updateBookings(): void {
    this.api.getAllBookings().subscribe(data => {
      this.bookingsToConfirm = data.filter(bookingModel => !bookingModel.confirmed && !bookingModel.cancelled).map(model => new Booking(model));
      this.confirmedBookings = data.filter(bookingModel => bookingModel.confirmed || bookingModel.cancelled).map(model => new Booking(model));
    });
  }
}
