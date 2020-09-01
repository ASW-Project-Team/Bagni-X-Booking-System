import {Component, Input, OnInit} from '@angular/core';
import {Page} from "../../../models/component-specific/page.model";
import {Customer} from "../../../models/customer";
import {AuthService} from "../../../../core/auth/auth.service";

@Component({
  selector: 'app-main-appbar',
  templateUrl: './main-appbar.component.html',
  styleUrls: ['./main-appbar.component.scss']
})
export class MainAppbarComponent implements OnInit {
  customer: Customer;

  @Input('pages') pages: Page[];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.customer = this.authService.currentCustomerValue();
  }
}
