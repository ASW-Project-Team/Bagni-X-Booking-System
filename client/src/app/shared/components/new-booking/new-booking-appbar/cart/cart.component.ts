import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../../../models/booking.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() booking: Booking;

  constructor() { }

  ngOnInit(): void {
  }

}
