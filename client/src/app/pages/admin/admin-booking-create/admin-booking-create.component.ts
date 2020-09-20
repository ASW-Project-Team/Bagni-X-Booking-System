import {Component, OnInit, ViewChild} from '@angular/core';
import {Booking} from "../../../shared/models/booking.model";
import {PeriodStepComponent} from "../../../shared/components/new-booking/steps/period-step/period-step.component";
import {CustomizeStepComponent} from "../../../shared/components/new-booking/steps/customize-step/customize-step.component";
import {FormBuilder} from "@angular/forms";
import {ApiService} from "../../../core/api/api.service";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {CustomerStepComponent} from "../../../shared/components/new-booking/steps/customer-step/customer-step.component";
import {DateUtils} from "../../../shared/utils/date.utils";

@Component({
  selector: 'app-admin-booking-create',
  templateUrl: './admin-booking-create.component.html',
  styleUrls: ['./admin-booking-create.component.scss']
})
export class AdminBookingCreateComponent implements OnInit {
  booking: Booking;

  @ViewChild('customerStep') customerStep: CustomerStepComponent;
  @ViewChild('periodStep') periodStep: PeriodStepComponent;
  @ViewChild('customizeStep') customizeStep: CustomizeStepComponent;

  constructor(private _formBuilder: FormBuilder,
              private _apiService: ApiService) { }

  ngOnInit(): void {
    this.booking = new Booking({
      customerId: undefined,
      dateFrom: DateUtils.todayAtMidnight(),
      dateTo: DateUtils.todayAtMidnight(),
      umbrellas: [],
      services: [],
      confirmed: false,
      cancelled: false,
      price: 0.0
    });
  }


  /**
   * This event is triggered when the stepper changes page. It activates
   * some actions in the change, such as the availability query, or the booking
   * data invalidation when going back to the period step.
   * @param event: contains data about the previously selected, and newly selected step.
   */
  selectionChange(event: StepperSelectionEvent) {
    if (event.previouslySelectedIndex == 1) {
      // invalidate availability, if the user switches from period
      this.periodStep.updateBookingDates();
      this._apiService.getAvailability(this.booking.dateFrom, this.booking.dateTo).subscribe(data => {
        this.customizeStep.setAvailableItems(data)
      });
    }

    if (event.selectedIndex == 1) {
      this.customizeStep.setAvailableItems(undefined);
    }

    if (event.selectedIndex == 0) {
      this.customerStep.validator = false;
      this.customerStep.selectedCustomer = undefined;
    }
  }
}
