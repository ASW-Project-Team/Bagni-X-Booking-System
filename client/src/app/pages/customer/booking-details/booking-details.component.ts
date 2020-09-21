import { Component, OnInit } from '@angular/core';
import {Booking} from "../../../shared/models/booking.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api/api.service";
import {AppbarAction} from "../../../shared/components/appbars/appbars.model";
import {DateUtils} from "../../../shared/utils/date.utils";
import {MatUtilsService} from "../../../core/mat-utils/mat-utils.service";

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {
  bookingId: string;
  booking: Booking;
  activeActions: AppbarAction[] = [];
  appbarTitle: string = '';

  private deleteAction: AppbarAction = {
    id: "0",
    name: "Annulla prenotazione",
    mdiIcon: 'trash-can-outline',
    isMdi: true,
    disabled: true,
    execute: () => {
      this.matUtils.createAlertDialog({
        content: "Sei sicuro di voler annullare la tua prenotazione? L'azione non è reversibile. Ricorda che puoi " +
          "annullare la prenotazione fino a un massimo di due giorni prima dell'erogazione del servizio.",
        positiveAction: {text: "Sì, annulla", execute: () => {
          this.api.deleteBooking(this.bookingId).subscribe(() => {
            this.router.navigate(['/bookings']).then(() => {
              this.matUtils.createSnackBar("Prenotazione annullata.");
            });
          });
        }},
        negativeAction: { text: "No", execute: () => { } }
      });
    }
  }


  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private matUtils: MatUtilsService,
              private router: Router) { }


  ngOnInit(): void {
    this.activeActions.push(this.deleteAction);

    this.route.params.subscribe(params => {
      this.bookingId = params.id;
      this.appbarTitle = params.title;

      this.api.getBooking(this.bookingId).subscribe(data => {
        this.booking = new Booking(data);
        this.appbarTitle = this.booking.getTitle();
        this.deleteAction.disabled = DateUtils.twoDaysBefore(this.booking.dateFrom).getTime() < new Date().getTime();
      });
    });
  }
}


