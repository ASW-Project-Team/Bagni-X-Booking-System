import {BookingModel} from "./booking.model";

export interface BookingStateModel {
  name: string,
  class: string,
  icon: string
  description: string,
}

export class BookingState implements BookingStateModel {
  name: string;
  class: string;
  icon: string;
  description: string;

  constructor(booking: BookingModel) {
    const currentState = BookingState.calculateState(booking);
    this.name = currentState.name;
    this.class = currentState.class;
    this.icon = currentState.icon;
    this.description = currentState.description;
  }

  static calculateState(booking: BookingModel): BookingStateModel {
    if (booking.dateFrom.getTime() > new Date().getTime()
      && booking.confirmed === true
      && booking.cancelled === false) {
      // in programma
      return possibleStates[0];

    } else if ( /*booking.dateFrom.getTime() > new Date().getTime() &&*/ // todo handle non-confirmed in now
         booking.confirmed === false
      && booking.cancelled === false) {
      // in attesa di conferma
      return possibleStates[1];

    } else if (booking.dateFrom.getTime() <= new Date().getTime()
      && booking.dateTo.getTime() >= new Date().getTime()
      && booking.confirmed === true
      && booking.cancelled === false) {
      // in corso
      return possibleStates[2];

    } else if (booking.dateFrom.getTime() <= new Date().getTime()
      && booking.dateTo.getTime() <= new Date().getTime()
      && booking.confirmed === true
      && booking.cancelled === false) {
      // completato
      return possibleStates[3];

    } else if (booking.cancelled === true) {
      // cancellato
      return possibleStates[4];

    } else {
      // errore nel calcolo dello stato
      return possibleStates[5];
    }
  }
}


export const possibleStates: BookingStateModel[] = [
  {
    name: 'In programma',
    description: 'Tale stato indica che la prenotazione è confermata, e potrà essere consumata nei tempi concordati.',
    class: 'state-positive',
    icon: 'progress-clock'
  },
  {
    name: 'In attesa di conferma',
    description: 'Tale stato indica che lo stabililimento deve confermare la prenotazione. ',
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
];
