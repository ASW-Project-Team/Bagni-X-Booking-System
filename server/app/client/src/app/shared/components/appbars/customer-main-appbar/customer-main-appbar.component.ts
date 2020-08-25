import {Component, OnInit} from '@angular/core';
import {Page} from "../../../models/component-specific/page.model";

@Component({
  selector: 'app-customer-main-appbar',
  templateUrl: './customer-main-appbar.component.html',
  styleUrls: ['./customer-main-appbar.component.scss']
})
export class CustomerMainAppbarComponent implements OnInit {

  pages: Page[] = [
    {
      id: "home",
      name: "Home",
      route: "/home",
      isMdi: true,
      icon: "home-outline"
    },
    {
      id: "feed",
      name: "Feed",
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
    },
    {
      id: "profile",
      name: "Profilo",
      route: "/profile",
      isMdi: true,
      icon: "account-circle-outline"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
