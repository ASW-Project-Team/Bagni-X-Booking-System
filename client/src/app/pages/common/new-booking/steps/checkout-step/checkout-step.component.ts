import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../../../../shared/models/booking.model";
import {Router} from "@angular/router";
import {ApiService} from "../../../../../core/api/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-checkout-step',
  templateUrl: './checkout-step.component.html',
  styleUrls: ['./checkout-step.component.scss']
})
export class CheckoutStepComponent implements OnInit {
  @Input() booking: Booking;
  loading: boolean = false;
  error: string = '';

  constructor(private _router: Router,
              private _apiService: ApiService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  generateBooking() {
    this.loading = true;
    this._apiService.generateBooking(this.booking).subscribe(data => {
      this.loading = false;
      this._router.navigate(['/bookings']).then(() => {
        this._snackBar.open(
          "Prenotazione completata! Puoi controllarne gli aggiornamenti da questa schermata.",
          null, { duration: 4000 }
          );
      })
    }, error => {
      this.error = error;
      this.loading = false;
    });
  }
}
