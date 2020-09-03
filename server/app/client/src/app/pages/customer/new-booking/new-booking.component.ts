import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent} from "@angular/cdk/stepper";
import {Booking} from "../../../shared/models/booking.model";
import {NbPeriodComponent} from "../nb-period/nb-period.component";
import {AuthService} from "../../../core/auth/auth.service";
import {ApiService} from "../../../core/api/api.service";
import {NbCustomizeComponent} from "../nb-customize/nb-customize.component";

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
  @ViewChild('customizeStep') customizeStep: NbCustomizeComponent;

  constructor(private _route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _authService: AuthService,
              private _apiService: ApiService) { }

  ngOnInit(): void {
    this.backRoute = this._route.snapshot.queryParams['backRoute'] || '/home';
    this.backPageName = this._route.snapshot.queryParams['backPageName'] || 'Home';
    this.booking = new Booking({
      userId: this._authService.currentCustomerValue().id,
      dateFrom: NewBookingComponent.createTodayAtMidnight(),
      dateTo: NewBookingComponent.createTodayAtMidnight(),
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
      this.periodStep.updateBookingDates();
      this._apiService.getAvailability(this.booking.dateFrom, this.booking.dateTo).subscribe(data => {
        this.customizeStep.setAvailableItems(data)
      });
    }
  }

  // helpers
  private static createTodayAtMidnight(): Date {
    let todayAtMidnight = new Date();
    todayAtMidnight.setHours(0,0,0,0);
    return todayAtMidnight;
  }
}
