import {Component} from '@angular/core';
import {BookingStateComponent} from "../booking-state/booking-state.component";

@Component({
  selector: 'app-booking-state-extended',
  templateUrl: './booking-state-extended.component.html',
  styleUrls: ['./booking-state-extended.component.scss']
})
export class BookingStateExtendedComponent extends BookingStateComponent {
  constructor() {
    super();
  }
}
