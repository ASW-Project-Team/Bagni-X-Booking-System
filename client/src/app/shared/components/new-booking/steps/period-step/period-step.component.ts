import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Booking} from "../../../../models/booking.model";
import {MatRadioChange} from "@angular/material/radio";
import {DateUtils} from "../../../../utils/date.utils";
import {ApiService} from "../../../../../core/api/api.service";

@Component({
  selector: 'app-period-step',
  templateUrl: './period-step.component.html',
  styleUrls: ['./period-step.component.scss']
})
export class PeriodStepComponent implements OnInit {
  @Input() booking: Booking;
  @Output() bookingChange: EventEmitter<Booking> = new EventEmitter<Booking>();
  @Input() isAdmin: boolean = false;
  periodForm: FormGroup;
  startBookingDate: Date;
  endBookingDate: Date;
  datesAvailable: boolean = true;
  validator: boolean = false;


  readonly DATE_RANGE_TYPES = {
    period: 'period',
    day: 'day',
    halfDay: 'halfDay'
  }

  readonly HALF_DAY_PERIODS = {
    morning: 'morning',
    afternoon: 'afternoon'
  }


  constructor(private formBuilder: FormBuilder,
              private api: ApiService) {
    this.periodForm = this.formBuilder.group({
      dateRangeType: [this.DATE_RANGE_TYPES.period, Validators.required],
      periodDateRange: this.formBuilder.group({
        periodDateFrom: ['', Validators.required],
        periodDateTo: ['', Validators.required],
      }),
      dailyDatePicker: [{value: '', disabled: true}, Validators.required],
      halfDay: this.formBuilder.group({
        halfDayDatePicker: [{value: '', disabled: true}, Validators.required],
        halfDayPeriod: [{value: this.HALF_DAY_PERIODS.morning, disabled: true}, Validators.required]
      })
    });
  }


  /**
   * Initializes the component, assigning initialization values.
   */
  ngOnInit(): void {
    // set initial dates
    this.periodForm.get('periodDateRange.periodDateFrom').setValue(this.booking.dateFrom);
    this.periodForm.get('periodDateRange.periodDateTo').setValue(this.booking.dateTo);
    this.periodForm.get('dailyDatePicker').setValue(this.booking.dateFrom);
    this.periodForm.get('halfDay.halfDayDatePicker').setValue(this.booking.dateTo);

    this.api.getSeason().subscribe(data => {
      const seasonStart = new Date(data.seasonStart);
      const seasonEnd = new Date(data.seasonEnd);
      const today = new Date();

      this.datesAvailable = seasonEnd.getTime() >= today.getTime();
      this.startBookingDate = seasonStart.getTime() >= today.getTime() ? seasonStart : today;
      this.endBookingDate = seasonEnd.getTime() >= today.getTime() ? seasonEnd : today;

      this.validator = this.datesAvailable;
      if (!this.datesAvailable) {
        this.periodForm.disable();
      }
    });
  }


  /**
   * When the user selects a different date range type, the associated fields
   * are enabled.
   * @param event: data about the new data range type
   */
  dateRangeTypeChange(event: MatRadioChange) {
    switch(event.value) {
      case this.DATE_RANGE_TYPES.period:
        this.periodForm.get('periodDateRange').enable();
        this.periodForm.get('dailyDatePicker').disable();
        this.periodForm.get('halfDay').disable();
        break;

      case this.DATE_RANGE_TYPES.day:
        this.periodForm.get('periodDateRange').disable();
        this.periodForm.get('dailyDatePicker').enable();
        this.periodForm.get('halfDay').disable();
        break;

      case this.DATE_RANGE_TYPES.halfDay:
        this.periodForm.get('periodDateRange').disable();
        this.periodForm.get('dailyDatePicker').disable();
        this.periodForm.get('halfDay').enable();
        break;
    }
  }


  /**
   * If the form is valid, and the user clicks into the next step
   * (or into the button to earn it), the following function is fired
   * from new-booking component, emitting the new booking value with
   * updated dates.
   */
  updateBookingDates() {
    let dateFrom: Date;
    let dateTo: Date;

    switch(this.periodForm.get('dateRangeType').value) {
      case this.DATE_RANGE_TYPES.period:
        // in the range case, it assigns the first date as the date from,
        // meanwhile a day is added to the dateTo value, to include the last day completely
        dateFrom = new Date(this.periodForm.get('periodDateRange.periodDateFrom').value);
        dateTo = DateUtils.addDay(new Date(this.periodForm.get('periodDateRange.periodDateTo').value));
        break;

      case this.DATE_RANGE_TYPES.day:
        // in the daily case, it assigns the date as the date from,
        // meanwhile for the dateTo, a day is added to the first value, to include the day completely
        dateFrom = new Date(this.periodForm.get('dailyDatePicker').value);
        dateTo = DateUtils.addDay(dateFrom);
        break;

      case this.DATE_RANGE_TYPES.halfDay:
        // in the half-day case, the date is assigned in a manner that covers morning or afternoon hours.
        // Precise hour values are just indicative, to represent the first or the last part of the day.
        if (this.periodForm.get('halfDay.halfDayPeriod').value == this.HALF_DAY_PERIODS.morning) {
          dateFrom = new Date(this.periodForm.get('halfDay.halfDayDatePicker').value);
          dateTo = DateUtils.addHalfDay(dateFrom);
        } else {
          dateFrom = DateUtils.addHalfDay(new Date(this.periodForm.get('halfDay.halfDayDatePicker').value));
          dateTo = DateUtils.addHalfDay(dateFrom);
        }
        break;
    }
    this.booking.dateFrom = dateFrom;
    this.booking.dateTo = dateTo;
    this.bookingChange.emit(this.booking);
  }
}

