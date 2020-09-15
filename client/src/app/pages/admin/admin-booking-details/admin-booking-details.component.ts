import { Component, OnInit } from '@angular/core';
import {Booking, BookingModel} from "../../../shared/models/booking.model";
import {AppbarAction} from "../../../shared/components/appbars/appbars.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DateUtils} from "../../../shared/utils/date.utils";
import {AlertDialogComponent} from "../../../shared/components/alert-dialog/alert-dialog.component";
import {Customer} from "../../../shared/models/customer.model";

@Component({
  selector: 'app-admin-booking-details',
  templateUrl: './admin-booking-details.component.html',
  styleUrls: ['./admin-booking-details.component.scss']
})
export class AdminBookingDetailsComponent implements OnInit {
  // params
  bookingId: string;
  bookingTitle: string;

  downloadedBooking: Booking;
  customer: Customer;
  actions: AppbarAction[] = [];

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookingId = params.id;
      this.bookingTitle = params.title;

      this.api.getBooking(this.bookingId).subscribe(data => {
        this.downloadedBooking = new Booking(data);

        this.api.getCustomer(this.downloadedBooking.customerId).subscribe(data => {
          this.customer = new Customer(data);
        });

        let context = this;
        this.actions.push({
          id: "0",
          name: "Annulla prenotazione",
          mdiIcon: 'trash-can-outline',
          isMdi: true,
          disabled: this.downloadedBooking.cancelled,
          execute: function () {
            context.dialog.open(AlertDialogComponent, {
              data: {
                content: "Sei sicuro di voler annullare la tua prenotazione? L'azione non è reversibile.",
                positiveAction: {
                  text: "Sì, annulla",
                  execute: function() {
                    context.api.editBooking(context.bookingId, { cancelled: true }).subscribe(() => {
                      context.updateBooking();
                      context.snackBar.open("Prenotazione annullata.", null, { duration: 4000 });
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
        });

        this.actions.push({
          id: "1",
          name: "Conferma prenotazione",
          mdiIcon: 'progress-check',
          isMdi: true,
          disabled: this.downloadedBooking.confirmed,
          execute: function () {
            context.api.editBooking(context.bookingId, { confirmed: true }).subscribe(() => {
              context.updateBooking();
              context.snackBar.open("Prenotazione confermata.", null, { duration: 4000 });
            });
          }
        });
      });
    });
  }

  private updateBooking() {
    this.api.getBooking(this.bookingId).subscribe(data => {
      this.downloadedBooking = new Booking(data);

      this.api.getCustomer(this.downloadedBooking.customerId).subscribe(data => {
        this.customer = new Customer(data);
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
