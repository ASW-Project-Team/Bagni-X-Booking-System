import { Component, OnInit } from '@angular/core';
import {Booking} from "../../../shared/models/booking.model";
import {ApiService} from "../../../core/api/api.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.scss']
})
export class AdminBookingsComponent implements OnInit {
  bookingsToConfirm: Booking[];
  confirmedBookings: Booking[];
  totalItems: number = 100;
  currentPageId = 0;


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.updateBookingsPage();
  }

  changePage($event: PageEvent) {
    this.currentPageId = $event.pageIndex - 1;
    this.updateBookingsPage(this.currentPageId);
  }


  updateBookingsPage(page: number = 0): void {
    this.bookingsToConfirm = undefined;
    this.confirmedBookings = undefined;
    this.api.getAllBookings(page).subscribe(data => {
      this.bookingsToConfirm = data.filter(bookingModel => !bookingModel.confirmed && !bookingModel.cancelled).map(model => new Booking(model));
      this.confirmedBookings = data.filter(bookingModel => bookingModel.confirmed || bookingModel.cancelled).map(model => new Booking(model));

      if (data.length < 10) {
        this.totalItems = (page) * 10 + data.length;
      }
    });
  }
}
