import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../models/booking.model";
import {BookingState} from "../../models/component-specific/booking-state.model";

/**
 * Component used to show the booking state in a structured way. The
 * state is computed starting from booking data.
 */

@Component({
  selector: 'app-booking-state',
  templateUrl: './booking-state.component.html',
  styleUrls: ['./booking-state.component.scss']
})
export class BookingStateComponent implements OnInit {
  @Input('booking') booking: Booking;
  currentState: BookingState;
  possibleStates: BookingState[] = [
    {
      name: 'In programma',
      class: 'state-positive',
      icon: 'progress-clock'
    },
    {
      name: 'In attesa di conferma',
      class: 'state-warning',
      icon: 'progress-alert'
    },
    {
      name: 'In corso',
      class: 'state-positive',
      icon: 'progress-check'
    },
    {
      name: 'Completato',
      class: 'state-positive',
      icon: 'progress-check'
    },
    {
      name: 'Cancellato',
      class: 'state-negative',
      icon: 'progress-close'
    },
    {
      name: 'Errore di stato',
      class: 'state-negative',
      icon: 'progress-close'
    },

  ]


  constructor() { }

  ngOnInit(): void {
    if (this.booking.dateFrom > new Date()
        && this.booking.confirmed === true
        && this.booking.cancelled === false) {
      // in programma
      this.currentState = this.possibleStates[0];

    } else if (this.booking.dateFrom > new Date()
      && this.booking.confirmed === false
      && this.booking.cancelled === false) {
      // in attesa di conferma
      this.currentState = this.possibleStates[1];

    } else if (this.booking.dateFrom <= new Date()
      && this.booking.dateTo >= new Date()
      && this.booking.confirmed === true
      && this.booking.cancelled === false) {
      // in corso
      this.currentState = this.possibleStates[2];

    } else if (this.booking.dateFrom <= new Date()
      && this.booking.dateTo <= new Date()
      && this.booking.confirmed === true
      && this.booking.cancelled === false) {
      // completato
      this.currentState = this.possibleStates[3];

    } else if (this.booking.cancelled === true) {
      // cancellato
      this.currentState = this.possibleStates[4];

    } else {
      // errore nel calcolo dello stato
      this.currentState = this.possibleStates[5];
    }
  }
}
