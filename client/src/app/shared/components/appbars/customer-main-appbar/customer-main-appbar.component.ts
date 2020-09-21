import {Component} from '@angular/core';
import {MenuItem} from "../appbars.model";
import {MainAppbarComponent} from "../main-appbar/main-appbar.component";
import {CustomerAuthService} from "../../../../core/auth/customer-auth.service";
import {ApiService} from "../../../../core/api/api.service";

/**
 * @file This is the main appbar with menu, used from the customer.
 */
@Component({
  selector: 'app-customer-main-appbar',
  templateUrl: '../main-appbar/main-appbar.component.html',
  styleUrls: ['../main-appbar/main-appbar.component.scss']
})
export class CustomerMainAppbarComponent extends MainAppbarComponent {
  pages: MenuItem[] = [
    {
      id: "home",
      name: "Home",
      route: "/home",
      isMdi: true,
      icon: "home-outline"
    },
    {
      id: "news",
      name: "News",
      route: "/news",
      isMdi: true,
      icon: "newspaper-variant-outline"
    },
    {
      id: "bookings",
      name: "Prenotazioni",
      route: "/bookings",
      isMdi: true,
      icon: "calendar-check-outline"
    }
  ];

  constructor(private customerAuth: CustomerAuthService,
              api: ApiService) {
    super(api);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.customerAuth.isLoggedIn()) {
      this.username = this.customerAuth.currentCustomerValue().name;

    } else {
      this.username = undefined;
    }
  }
}
