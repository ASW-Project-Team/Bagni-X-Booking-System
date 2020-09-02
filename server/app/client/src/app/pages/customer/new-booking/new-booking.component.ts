import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent} from "@angular/cdk/stepper";
import {Booking} from "../../../shared/models/booking.model";
import {MatStepper} from "@angular/material/stepper";
import {NbPeriodComponent} from "../nb-period/nb-period.component";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class NewBookingComponent implements OnInit {
  backRoute: string;
  backPageName: string;
  booking: Booking;

  @ViewChild('periodStep') periodStep: NbPeriodComponent;


  constructor(private _route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _authService: AuthService) { }

  ngOnInit(): void {
    this.backRoute = this._route.snapshot.queryParams['backRoute'] || '/home';
    this.backPageName = this._route.snapshot.queryParams['backPageName'] || 'Home';
    this.booking = new Booking({
      userId: this._authService.currentCustomerValue().id,
      dateFrom: new Date(),
      dateTo: new Date(),
      umbrellas: [],
      services: [],
      confirmed: false,
      cancelled: false,
      price: 0.0
    });
  }

  selectionChange(event: StepperSelectionEvent) {
    if (event.previouslySelectedIndex == 0) {
      this.periodStep.updateBookingDates();
      // todo start availability query, invalidate customize form if not possible
    }

    // todo if going back to period, invalidate all, or make impossible to jump period->checkout (ex. invalidating)
  }
}
