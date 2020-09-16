import { Component, OnInit } from '@angular/core';
import {Customer} from "../../../shared/models/customer.model";
import {Booking} from "../../../shared/models/booking.model";
import {ApiService} from "../../../core/api/api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-contact-details',
  templateUrl: './admin-contact-details.component.html',
  styleUrls: ['./admin-contact-details.component.scss']
})
export class AdminContactDetailsComponent implements OnInit {
  customerFullName: string = ''
  customer: Customer;
  bookings: Booking[];

  constructor(private api: ApiService,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params.customerFullName) {
        this.customerFullName = params.fullName;
      }

      this.api.getCustomer(params.id).subscribe(data => {
        this.customer = new Customer(data);
        this.customerFullName = this.customer.getFullName();

        this.api.getCustomerBookings(this.customer.id).subscribe(data => {
          this.bookings = data.map(model => new Booking(model));
        });
      });
    });
  }

  ngOnInit(): void {
  }


  updateBookings(): void {
    this.api.getCustomerBookings(this.customer.id).subscribe(data => {
      this.bookings = data.map(model => new Booking(model));
    });
  }
}
