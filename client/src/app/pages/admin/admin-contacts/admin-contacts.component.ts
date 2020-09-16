import { Component, OnInit } from '@angular/core';
import {Customer} from "../../../shared/models/customer.model";
import {ApiService} from "../../../core/api/api.service";

@Component({
  selector: 'app-admin-contacts',
  templateUrl: './admin-contacts.component.html',
  styleUrls: ['./admin-contacts.component.scss']
})
export class AdminContactsComponent implements OnInit {
  customers: Customer[];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getCustomers().subscribe(data => {
      this.customers = data.map(model => new Customer(model));
    });
  }
}
