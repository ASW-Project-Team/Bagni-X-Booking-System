import {Service, ServiceModel} from "./service.model";
import {Umbrella, UmbrellaModel} from "./umbrella.model";
import {BookingState} from "./booking-state.model";

export interface BookingModel {
  id?: string,
  customerId: string,
  umbrellas: UmbrellaModel[],
  confirmed: boolean,
  cancelled: boolean,
  price: number,
  dateFrom: Date,
  dateTo: Date,
  services: ServiceModel[],
}

/**
 * Using a class is useful to add some utility methods to the booking.
 */
export class Booking implements BookingModel {
  id: string;
  cancelled: boolean;
  confirmed: boolean;
  dateFrom: Date;
  dateTo: Date;
  price: number;
  services: Service[];
  umbrellas: Umbrella[];
  customerId: string;

  constructor(bookingModel: BookingModel) {
    this.id = bookingModel.id;
    this.cancelled = bookingModel.cancelled;
    this.confirmed = bookingModel.confirmed;
    this.dateFrom = new Date(bookingModel.dateFrom);
    this.dateTo = new Date(bookingModel.dateTo);
    this.price = bookingModel.price;
    this.services = bookingModel.services.map(model => new Service(model));
    this.umbrellas = bookingModel.umbrellas.map(model => new Umbrella(model));
    this.customerId = bookingModel.customerId;
  }


  /**
   * Generates the title of the booking, basing on the booked umbrellas.
   * The title is a mnemonic text showing the number of umbrellas booked.
   */
  public getTitle(): string {
    let title = '';

    if (this.umbrellas[0] && this.umbrellas.length == 1) {
      title = 'Ombrellone n°' + this.umbrellas[0].number;

    } else if (this.umbrellas.length > 1) {
      title = 'Ombrelloni n°';

      for (let i = 0; i < this.umbrellas.length; i++) {
        title += this.umbrellas[i].number;
        if (i < this.umbrellas.length - 1) {
          title += ', ';
        }
      }
    }

    return title;
  }


  /**
   * The description of the booking indicates the ranking of the booked umbrellas.
   * It is mainly used in booking cards.
   */
  public getDescription(): string {
    let description = '';

    if (this.umbrellas[0] && this.umbrellas.length == 1) {
      description = this.umbrellas[0].rankUmbrella.name;

    } else if (this.umbrellas.length > 1) {
      this.umbrellas.map(umbrella => {
        // selects the rank name, and make the first letter of each, uppercase
        let rankName = umbrella.rankUmbrella.name;
        return rankName.charAt(0).toUpperCase() + rankName.slice(1);

      }).filter((rankName, index, array) => {
        // removes duplicates
        return array.indexOf(rankName) == index;

      }).forEach((rankName, index, array) => {
        // forms the description string
        description += rankName;
        if (index < array.length - 1) {
          description += ", ";
        }
      });
    }
    return description;
  }


  /**
   * Returns an array representing all cost items composing the booking. It is useful to
   * display the summary. Assumes that each umbrella has complete rank information inside.
   */
  public computeCostItems(): { description: string, amount: number }[] {
    let costItems: { description: string, amount: number }[] = [];

    this.umbrellas.forEach(umbrella => {
      costItems.push({
        description: umbrella.getTitle(),
        amount: umbrella.rankUmbrella.calculatePrice(this.dateFrom, this.dateTo)
      });
    });

    // the number indicates the occurrences of a given service inside the booking
    let groupedServices: Map<Service, number> = new Map<Service, number>();

    this.services.forEach(service => {
      if (groupedServices.has(service)) {
        let oldGroupedServ = groupedServices.get(service);
        groupedServices.set(service, ++oldGroupedServ);

      } else {
        groupedServices.set(service, 1);
      }
    });

    // add a cost item for each grouped service
    groupedServices.forEach((occurrences, service) => {
      costItems.push({
        description: service.name + " x" + occurrences,
        amount: service.calculatePrice(this.dateFrom, this.dateTo) * occurrences
      });
    });

    return costItems;
  }


  /**
   * Returns a cost item representing the total.
   */
  public computeTotal(): { description: string, amount: number } {
    return {
      description: 'Totale',
      amount: this.price
    }
  }


  /**
   * Returns the state of the booking, computed following state computation rules.
   */
  public getState(): BookingState {
    return new BookingState(this);
  }
}

