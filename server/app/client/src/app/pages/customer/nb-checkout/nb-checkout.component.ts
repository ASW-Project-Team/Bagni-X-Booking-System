import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Booking} from "../../../shared/models/booking.model";
import {Router} from "@angular/router";
import {ApiService} from "../../../core/api/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-nb-checkout',
  templateUrl: './nb-checkout.component.html',
  styleUrls: ['./nb-checkout.component.scss']
})
export class NbCheckoutComponent implements OnInit {
  @Input() booking: Booking;

  constructor(private _router: Router,
              private _apiService: ApiService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  generateBooking() {
    this._apiService.generateBooking(this.booking).subscribe(data => {
      this._router.navigate(['/bookings']).then(() => {
        this._snackBar.open(
          "Prenotazione completata! Puoi controllarne gli aggiornamenti da questa schermata.",
          null, { duration: 4000 }
          );
      })
    })
  }
}
