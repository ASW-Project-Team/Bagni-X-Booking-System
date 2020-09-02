import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent} from "@angular/cdk/stepper";
import {Booking} from "../../../shared/models/booking.model";
import {MatStepper} from "@angular/material/stepper";
import {NbPeriodComponent} from "../nb-period/nb-period.component";
import {AuthService} from "../../../core/auth/auth.service";
import {AvailabilityData} from "../../../shared/models/availability-data.model";
import {ApiService} from "../../../core/api/api.service";

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
  availability: AvailabilityData;

  @ViewChild('periodStep') periodStep: NbPeriodComponent;


  constructor(private _route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _authService: AuthService,
              private _apiService: ApiService) { }


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


  /**
   * This event is triggered when the stepper changes page. It activates
   * some actions in the cange, such as the availability query, or the booking
   * data invalidation when going back to the period step.
   * @param event: contains data about the previously selected, and newly selected step.
   */
  selectionChange(event: StepperSelectionEvent) {
    if (event.previouslySelectedIndex == 0) {
      // invalidate availability, if the user switches from period
      this.availability = undefined;
      this._apiService.getAvailability(this.booking.dateFrom, this.booking.dateTo).subscribe(data => {
        this.availability = data;
      });
    }

    if (event.selectedIndex == 0) {
      // if going back to period, invalidate booking
      this.booking.umbrellas = [];
      this.booking.services = [];
      this.booking.price = 0.0;
    }
  }
}
