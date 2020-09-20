import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Customer} from "../../../../models/customer.model";
import {ApiService} from "../../../../../core/api/api.service";
import {Booking} from "../../../../models/booking.model";

@Component({
  selector: 'app-customer-step',
  templateUrl: './customer-step.component.html',
  styleUrls: ['./customer-step.component.scss']
})
export class CustomerStepComponent implements OnInit {
  @Input() booking: Booking;
  @Output() bookingChange = new EventEmitter<Booking>();
  customers: Customer[];
  validator: boolean = false;
  selectedCustomer: Customer;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getCustomers().subscribe(data => {
      this.customers = data.map(model => new Customer(model));
    });
  }


  selectCustomer(customer: Customer) {
    this.validator = true;
    this.selectedCustomer = customer;
    this.booking.customerId = customer.id;
    this.bookingChange.emit(this.booking);
  }
}
