import {Component, Input, OnInit} from '@angular/core';
import {CustomerModel} from "../../../models/customer.model";
import {AuthService} from "../../../../core/auth/auth.service";
import {MenuItem} from "../appbars.model";

@Component({
  selector: 'app-main-appbar',
  templateUrl: './main-appbar.component.html',
  styleUrls: ['./main-appbar.component.scss']
})
export class MainAppbarComponent implements OnInit {
  customer: CustomerModel;

  @Input('pages') pages: MenuItem[];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.customer = this.authService.currentCustomerValue();
  }
}
