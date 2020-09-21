import { Component, OnInit } from '@angular/core';
import {Booking} from "../../../shared/models/booking.model";
import {ApiService} from "../../../core/api/api.service";
import {CustomerAuthService} from "../../../core/auth/customer-auth.service";
import {PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  bookings: Booking[];
  totalItems: number = 100;

  constructor(private apiService: ApiService,
              private customerAuth: CustomerAuthService) { }

  ngOnInit(): void {
   this.updateBookingsPage();
  }

  changePage($event: PageEvent) {
    this.updateBookingsPage($event.pageIndex - 1);
  }

  updateBookingsPage(page: number = 0) {
    this.bookings = undefined;
    const customerId: string = this.customerAuth.currentCustomerValue().id;
    this.apiService.getCustomerBookings(customerId, page).subscribe(data => {
      this.bookings = data.map(model => new Booking(model));

      if (this.bookings.length < 10) {
        this.totalItems = (page) * 10 + this.bookings.length;
      }
    });
  }
}
