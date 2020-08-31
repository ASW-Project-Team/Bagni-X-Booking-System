import { Component, OnInit } from '@angular/core';
import {Booking, BookingModel} from "../../../shared/models/booking.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppbarAction} from "../../../shared/models/component-specific/appbar.action";
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AlertDialogComponent} from "../../../shared/components/alert-dialog/alert-dialog.component";

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {
  // params
  bookingId: string;
  bookingTitle: string;

  downloadedBooking: Booking;
  deleteAction: AppbarAction;


  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    let context = this;
    this.deleteAction = {
      id: "0",
      name: "Annulla prenotazione",
      icon: 'trash-can-outline',
      isMdi: true,
      execute: function () {
        context.dialog.open(AlertDialogComponent, {
          data: {
            content: "Sei sicuro di voler annullare la tua prenotazione? L'azione non è reversibile.",
            positiveAction: {
              text: "Sì, annulla",
              execute: function() {
                context.api.deleteBooking(context.bookingId).subscribe(resp => {
                 context.router.navigate(['/bookings']).then(() => {
                   context.snackBar.open("Prenotazione annullata.", null, { duration: 4000 });
                 });
                });
              }
            },
            negativeAction: {
              text: "No",
              execute: function() { }
            }
          }
        });
      }
    };

    this.route.params.subscribe(params => {
      this.bookingId = params.id;
      this.bookingTitle = params.title;

      this.api.getBooking(this.bookingId).subscribe(bookingData => {
        this.downloadedBooking = new Booking(bookingData);
      });
    });
  }


  /**
   * Compute appbar title basing on the available information.
   */
  getAppbarTitle() : string {
    if (this.downloadedBooking) {
      return this.downloadedBooking.getTitle();
    } else if (this.bookingTitle) {
      return this.bookingTitle;
    } else {
      return '';
    }
  }
}


