import { Component, OnInit } from '@angular/core';
import {Booking} from "../../../shared/models/booking.model";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../core/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppbarAction} from "../../../shared/components/appbars/nested-appbar/appbar.action";

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {
  bookingId: string;
  bookingTitle: string;
  downloadedBooking: Booking;
  deleteAction: AppbarAction;


  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.deleteAction = {
      id: "0",
      name: "Annulla prenotazione",
      icon: 'trash-can-outline',
      isMdi: true,
      execute: function () { /* todo */ }
    };

    this.route.params.subscribe(params => {
      this.bookingId = params.id;
      //this.bookingTitle = params.title;
      this.api.getBooking(this.bookingId).subscribe(booking => {
        this.downloadedBooking = booking;
      });
    });
  }


  /**
   * Generates the title of the card, basing on the booked umbrellas.
   */
  getTitleIfAvailable(): string {
    if (this.downloadedBooking) {
      return this.getDownloadedTitle();
    } else if (this.bookingTitle) {
      return this.bookingTitle;
    } else {
      return '';
    }
  }

  private getDownloadedTitle(): string {
    let title = '';

    if (!this.downloadedBooking) {
      return title;
    }

    if (this.downloadedBooking.umbrellas.length == 1) {
      title = 'Ombrellone n°' + this.downloadedBooking.umbrellas[0].number;

    } else if (this.downloadedBooking.umbrellas.length > 1) {
      title = 'Ombrelloni n°';

      for (let i = 0; i < this.downloadedBooking.umbrellas.length; i++) {
        title += this.downloadedBooking.umbrellas[i].number;
        if (i < this.downloadedBooking.umbrellas.length - 1) {
          title += ', ';
        }
      }
    }

    return title;
  }

}
