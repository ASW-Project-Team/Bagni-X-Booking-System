import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Booking} from "../../../shared/models/booking.model";

@Component({
  selector: 'app-nb-checkout',
  templateUrl: './nb-checkout.component.html',
  styleUrls: ['./nb-checkout.component.scss']
})
export class NbCheckoutComponent implements OnInit {
  @Input() booking: Booking;

  constructor() { }

  ngOnInit(): void {
  }

}
