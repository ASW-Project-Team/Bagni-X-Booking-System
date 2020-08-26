import {BookingModel} from "../booking.model";

export interface BookingState {
  name: string,
  class: string,
  icon: string
  description: string;
}

export class BookingStateHandler {

  constructor(private booking: BookingModel) {}

  possibleStates: BookingState[] = [
    {
      name: 'In programma',
      description: 'Tale stato indica che la prenotazione è confermata, e potrà essere consumata nei tempi concordati.',
      class: 'state-positive',
      icon: 'progress-clock'
    },
    {
      name: 'In attesa di conferma',
      description: 'Tale stato indica che lo stabililimento deve confermare la prenotazione.',
      class: 'state-warning',
      icon: 'progress-alert'
    },
    {
      name: 'In corso',
      description: 'Tale stato indica che la prenotazione può essere consumata ora.',
      class: 'state-positive',
      icon: 'progress-check'
    },
    {
      name: 'Completato',
      class: 'state-positive',
      description: 'Tale stato indica che la prenotazione è stata consumata.',
      icon: 'progress-check'
    },
    {
      name: 'Cancellato',
      description: 'Tale stato indica che la prenotazione è stata cancellata, dallo stabilimento o dall\'utente.',
      class: 'state-negative',
      icon: 'progress-close'
    },
    {
      name: 'Errore di stato',
      description: 'Errore nel calcolo dello stato della prenotazione, o dati insufficienti.',
      class: 'state-negative',
      icon: 'progress-close'
    }
  ]

  public getCurrentState(): BookingState {
    if (this.booking.dateFrom > new Date()
      && this.booking.confirmed === true
      && this.booking.cancelled === false) {
      // in programma
      return this.possibleStates[0];

    } else if (this.booking.dateFrom > new Date()
      && this.booking.confirmed === false
      && this.booking.cancelled === false) {
      // in attesa di conferma
      return this.possibleStates[1];

    } else if (this.booking.dateFrom <= new Date()
      && this.booking.dateTo >= new Date()
      && this.booking.confirmed === true
      && this.booking.cancelled === false) {
      // in corso
      return this.possibleStates[2];

    } else if (this.booking.dateFrom <= new Date()
      && this.booking.dateTo <= new Date()
      && this.booking.confirmed === true
      && this.booking.cancelled === false) {
      // completato
      return this.possibleStates[3];

    } else if (this.booking.cancelled === true) {
      // cancellato
      return this.possibleStates[4];

    } else {
      // errore nel calcolo dello stato
      return this.possibleStates[5];
    }
  }
}
