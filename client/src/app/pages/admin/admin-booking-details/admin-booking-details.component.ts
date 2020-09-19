import { Component, OnInit } from '@angular/core';
import {Booking} from "../../../shared/models/booking.model";
import {AppbarAction} from "../../../shared/components/appbars/appbars.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api/api.service";
import {Customer} from "../../../shared/models/customer.model";
import {MatUtilsService} from "../../../core/mat-utils/mat-utils.service";

@Component({
  selector: 'app-admin-booking-details',
  templateUrl: './admin-booking-details.component.html',
  styleUrls: ['./admin-booking-details.component.scss']
})
export class AdminBookingDetailsComponent implements OnInit {
  // params
  titleParam: string;
  backRoute: string = '/admin/bookings';
  backRouteName: string = 'Prenotazioni';
  booking: Booking;
  customer: Customer;
  actions: AppbarAction[] = [];

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private matUtils: MatUtilsService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.titleParam = params.title;

      if (params.backRoute) {
        this.backRoute = params.backRoute;
      }

      if (params.backRouteName) {
        this.backRouteName = params.backRouteName
      }

      this.api.getBooking(params.id).subscribe(data => {
        this.booking = new Booking(data);

        this.api.getCustomer(this.booking.customerId).subscribe(data => {
          this.customer = new Customer(data);
        });

        let ctx = this;
        this.actions = [
          {
            id: "0",
            name: "Annulla prenotazione",
            mdiIcon: 'trash-can-outline',
            isMdi: true,
            disabled: this.booking.cancelled,
            execute: () => this.matUtils.createAlertDialog({
              content: "Sei sicuro di voler annullare la tua prenotazione? L'azione non è reversibile.",
              negativeAction: { text: "No", execute: () => { } },
              positiveAction: {
                text: "Sì, annulla",
                execute: () => {
                  this.api.editBooking(ctx.booking.id, { cancelled: true }).subscribe(() =>
                    this.router.navigate(['/admin/bookings']).then(() =>
                      this.matUtils.createSnackBar("Prenotazione annullata.")
                    )
                  )
                }
              }
            })
          },
          {
            id: "1",
            name: "Conferma prenotazione",
            mdiIcon: 'progress-check',
            isMdi: true,
            disabled: this.booking.confirmed,
            execute: () => {
              this.api.editBooking(ctx.booking.id, { confirmed: true }).subscribe(() =>
                this.router.navigate(['/admin/bookings']).then(() =>
                  this.matUtils.createSnackBar("Prenotazione confermata.")
                )
              )
            }
          }
        ];
      });
    });
  }

  /**
   * Compute appbar title basing on the available information.
   */
  getAppbarTitle() : string {
    if (this.booking) {
      return this.booking.getTitle();
    } else if (this.titleParam) {
      return this.titleParam;
    } else {
      return '';
    }
  }
}
