import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Booking} from "../../../shared/models/booking.model";
import {MatRadioChange} from "@angular/material/radio";

@Component({
  selector: 'app-nb-period',
  templateUrl: './nb-period.component.html',
  styleUrls: ['./nb-period.component.scss']
})
export class NbPeriodComponent implements OnInit {
  @Input() booking: Booking;
  @Output() bookingChange: EventEmitter<Booking> = new EventEmitter<Booking>();
  formGroup: FormGroup;
  seasonMinDate: Date;
  seasonMaxDate: Date;

  readonly DATE_RANGE_TYPES = {
    period: 'period',
    day: 'day',
    halfDay: 'halfDay'
  }

  readonly HALF_DAY_PERIODS = {
    morning: 'morning',
    afternoon: 'afternoon'
  }


  constructor(private _formBuilder: FormBuilder) {
    this.formGroup = this._formBuilder.group({
      dateRangeType: [this.DATE_RANGE_TYPES.period, Validators.required],
      periodDateRange: this._formBuilder.group({
        periodDateFrom: ['', Validators.required],
        periodDateTo: ['', Validators.required],
      }),
      dailyDatePicker: [{value: '', disabled: true}, Validators.required],
      halfDay: this._formBuilder.group({
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
    this.formGroup.get('periodDateRange.periodDateFrom').setValue(this.booking.dateFrom);
    this.formGroup.get('periodDateRange.periodDateTo').setValue(this.booking.dateTo);
    this.formGroup.get('dailyDatePicker').setValue(this.booking.dateFrom);
    this.formGroup.get('halfDay.halfDayDatePicker').setValue(this.booking.dateTo);

    // todo get from server?
    this.seasonMinDate = new Date('2020-5-15');
    this.seasonMaxDate = new Date('2020-10-1');
  }


  /**
   * When the user selects a different date range type, the associated fields
   * are enabled.
   * @param event: data about the new data range type
   */
  dateRangeTypeChange(event: MatRadioChange) {
    switch(event.value) {
      case this.DATE_RANGE_TYPES.period:
        this.formGroup.get('periodDateRange').enable();
        this.formGroup.get('dailyDatePicker').disable();
        this.formGroup.get('halfDay').disable();
        break;

      case this.DATE_RANGE_TYPES.day:
        this.formGroup.get('periodDateRange').disable();
        this.formGroup.get('dailyDatePicker').enable();
        this.formGroup.get('halfDay').disable();
        break;

      case this.DATE_RANGE_TYPES.halfDay:
        this.formGroup.get('periodDateRange').disable();
        this.formGroup.get('dailyDatePicker').disable();
        this.formGroup.get('halfDay').enable();
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

    switch(this.formGroup.get('dateRangeType').value) {
      case this.DATE_RANGE_TYPES.period:
        // in the range case, it assigns the first date as the date from,
        // meanwhile a day is added to the dateTo value, to include the last day completely
        dateFrom = new Date(this.formGroup.get('periodDateRange.periodDateFrom').value);
        dateTo = NbPeriodComponent.addDay(new Date(this.formGroup.get('periodDateRange.periodDateTo').value));
        break;

      case this.DATE_RANGE_TYPES.day:
        // in the daily case, it assigns the date as the date from,
        // meanwhile for the dateTo, a day is added to the first value, to include the day completely
        dateFrom = new Date(this.formGroup.get('dailyDatePicker').value);
        dateTo = NbPeriodComponent.addDay(dateFrom);
        break;

      case this.DATE_RANGE_TYPES.halfDay:
        // in the half-day case, the date is assigned in a manner that covers morning or afternoon hours.
        // Precise hour values are just indicative, to represent the first or the last part of the day.
        if (this.formGroup.get('halfDay.halfDayPeriod').value == this.HALF_DAY_PERIODS.morning) {
          dateFrom = new Date(this.formGroup.get('halfDay.halfDayDatePicker').value);
          dateTo = NbPeriodComponent.addHalfDay(dateFrom);
        } else {
          dateFrom = NbPeriodComponent.addHalfDay(new Date(this.formGroup.get('halfDay.halfDayDatePicker').value));
          dateTo = NbPeriodComponent.addHalfDay(dateFrom);
        }
        break;
    }
    this.booking.dateFrom = dateFrom;
    this.booking.dateTo = dateTo;
    this.bookingChange.emit(this.booking);
  }


  // helpers
  private static addDay(date: Date): Date {
    let newDate = new Date(date)
    newDate.setDate(date.getDate() + 1);
    return newDate;
  }

  private static addHalfDay(date: Date): Date {
    let newDate = new Date(date)
    newDate.setTime(date.getTime() + 12*60*60*1000);
    return newDate;
  }
}

