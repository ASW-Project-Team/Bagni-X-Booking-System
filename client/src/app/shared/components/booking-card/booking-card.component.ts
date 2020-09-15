import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Booking} from "../../models/booking.model";
import {ApiService} from "../../../core/api/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss']
})
export class BookingCardComponent implements OnInit {
  @Input() isLastCard: boolean = false;
  @Input() booking: Booking;
  @Input() confirmable: boolean = false;
  disableParentRipple: boolean = false;

  @Output() updateBookings = new EventEmitter<void>();

  constructor(private api: ApiService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  confirmBooking() {
    this.api.editBooking(this.booking.id, {confirmed: true}).subscribe(() => {
      this.snackBar.open("Prenotazione confermata.", null, {duration: 4000});
      this.updateBookings.emit();
    });
  }
}
