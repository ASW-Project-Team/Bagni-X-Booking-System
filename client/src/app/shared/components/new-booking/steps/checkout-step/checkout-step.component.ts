import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../../../models/booking.model";
import {Router} from "@angular/router";
import {ApiService} from "../../../../../core/api/api.service";
import {MatUtilsService} from "../../../../../core/mat-utils/mat-utils.service";

@Component({
  selector: 'app-checkout-step',
  templateUrl: './checkout-step.component.html',
  styleUrls: ['./checkout-step.component.scss']
})
export class CheckoutStepComponent implements OnInit {
  @Input() booking: Booking;
  @Input() backRoute: string = '/bookings';
  status: string = '';


  constructor(private router: Router,
              private api: ApiService,
              private matUtils: MatUtilsService) { }


  ngOnInit(): void { }


  generateBooking() {
    this.status = 'loading';
    this.api.generateBooking(this.booking).subscribe(() => {
      this.status = '';
      this.router.navigate([this.backRoute]).then(() => {
        this.matUtils.createSnackBar("Prenotazione completata!");
      })
    }, error => {
      this.status = error;
    });
  }
}
