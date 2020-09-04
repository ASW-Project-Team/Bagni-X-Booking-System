import {Service, ServiceModel} from "./service.model";
import {Umbrella, UmbrellaModel} from "./umbrella.model";
import {CostItem} from "./component-specific/booking-summary.model";
import {BookingState, BookingStateHandler} from "./component-specific/booking-state.model";
import {map} from "rxjs/operators";

export interface BookingModel {
  id?: string,
  userId: string,
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
  userId: string;

  constructor(bookingModel: BookingModel) {
    this.id = bookingModel.id;
    this.cancelled = bookingModel.cancelled;
    this.confirmed = bookingModel.confirmed;
    this.dateFrom = bookingModel.dateFrom;
    this.dateTo = bookingModel.dateTo;
    this.price = bookingModel.price;
    this.services = bookingModel.services.map(model => new Service(model));
    this.umbrellas = bookingModel.umbrellas.map(model => new Umbrella(model));
    this.userId = bookingModel.userId;
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
      description = this.umbrellas[0].rank.name;

    } else if (this.umbrellas.length > 1) {
      this.umbrellas.map(umbrella => {
        // selects the rank name, and make the first letter of each, uppercase
        let rankName = umbrella.rank.name;
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
  public computeCostItems(): CostItem[] {
    let costItems: CostItem[] = [];

    this.umbrellas.forEach(umbrella => {
      costItems.push({
        description: umbrella.getTitle(),
        amount: umbrella.rank.calculatePrice(this.dateFrom, this.dateTo)
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
        description: service.title + " x" + occurrences,
        amount: service.calculatePrice(this.dateFrom, this.dateTo) * occurrences
      });
    });

    return costItems;
  }


  /**
   * Returns a cost item representing the total.
   */
  public computeTotal(): CostItem {
    return {
      description: 'Totale',
      amount: this.price
    }
  }


  /**
   * Returns the state of the booking, computed following state computation rules.
   */
  public getState(): BookingState {
    const bookingStateHandler = new BookingStateHandler(this);
    return bookingStateHandler.getCurrentState();
  }
}

