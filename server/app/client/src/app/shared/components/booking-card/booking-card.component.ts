import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../models/booking.model";
import {RankUmbrella} from "../../models/rank-umbrella.model";

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss']
})
export class BookingCardComponent implements OnInit {
  @Input('is-last-card') isLastCard: boolean = false;
  @Input('booking') booking: Booking;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Generates the title of the card, basing on the booked umbrellas.
   */
  getTitle(): string {
    let title = '';

    if (!this.booking) {
      return title;
    }

    if (this.booking.umbrellas.length == 1) {
      title = 'Ombrellone n°' + this.booking.umbrellas[0].number;

    } else if (this.booking.umbrellas.length > 1) {
      title = 'Ombrelloni n°';

      for (let i = 0; i < this.booking.umbrellas.length; i++) {
        title += this.booking.umbrellas[i].number;
        if (i < this.booking.umbrellas.length - 1) {
          title += ', ';
        }
      }
    }

    return title;
  }

  getDescription(): string {
    let description = '';
    let rankNames: string[] = [];

    if (!this.booking) {
      return description;
    }

    if (this.booking.umbrellas.length == 1) {
      description = this.booking.umbrellas[0].rank.description;

    } else if (this.booking.umbrellas.length > 1) {
      for (let i = 0; i < this.booking.umbrellas.length; i++) {
        if (rankNames.indexOf(this.booking.umbrellas[i].rank.name) === -1) {
          rankNames.push(this.booking.umbrellas[i].rank.name);
        }
      }

      for (let i = 0; i < rankNames.length; i++) {
        description += rankNames[i];
        if (i < rankNames.length - 1) {
          description += ', ';
        }
      }
    }
    return description;
  }
}
