import {Component, OnInit} from '@angular/core';
import {MenuItem} from "../appbars.model";


@Component({
  selector: 'app-customer-main-appbar',
  templateUrl: './customer-main-appbar.component.html',
  styleUrls: ['./customer-main-appbar.component.scss']
})
export class CustomerMainAppbarComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
