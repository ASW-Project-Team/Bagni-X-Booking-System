import { Component, OnInit } from '@angular/core';
import {Booking, BookingModel} from "../../../shared/models/booking.model";
import {ApiService} from "../../../core/api/api.service";
import {CustomerAuthService} from "../../../core/auth/customer-auth.service";


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  bookings: Booking[];

  constructor(private apiService: ApiService,
              private customerAuth: CustomerAuthService) { }

  ngOnInit(): void {
    const customerId: string = this.customerAuth.currentCustomerValue().id;
    this.apiService.getCustomerBookings(customerId).subscribe(data => {
      const bookingsData = data as BookingModel[];
      this.bookings = bookingsData.map(model => new Booking(model));
    });
  }
}
