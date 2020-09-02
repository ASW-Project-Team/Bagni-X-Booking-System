import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Booking} from "../../../shared/models/booking.model";
import {bookingsMock} from "../../../core/mocks/bookings.mock";
import {MatRadioChange} from "@angular/material/radio";

@Component({
  selector: 'app-nb-period',
  templateUrl: './nb-period.component.html',
  styleUrls: ['./nb-period.component.scss']
})
export class NbPeriodComponent implements OnInit {
  formGroup: FormGroup;
  @Input() booking: Booking;
  @Output() bookingChange: EventEmitter<Booking> = new EventEmitter<Booking>();
  seasonMinDate: Date;// todo get from server?
  seasonMaxDate: Date;
  dateRangeTypes: string[] = ['period', 'day', 'halfDay'];
  currentDateFrom: Date;
  currentDateTo: Date;


  constructor(private _formBuilder: FormBuilder) {
    this.currentDateFrom = new Date();
    this.currentDateTo = new Date();
    this.currentDateTo.setDate(new Date().getDate() + 1);
    this.seasonMinDate = new Date('2020-5-15');
    this.seasonMaxDate = new Date('2020-10-1');

    this.formGroup = this._formBuilder.group({
      dateRangeType: ['period', Validators.required],
      periodDateRange: this._formBuilder.group({
        periodDateFrom: [this.currentDateFrom, Validators.required],
        periodDateTo: [this.currentDateTo, Validators.required],
      }),
      dailyDatePicker: [{value: this.currentDateFrom, disabled: true}, Validators.required],
      halfDay: this._formBuilder.group({
        halfDayDatePicker: [{value: this.currentDateFrom, disabled: true}, Validators.required],
        halfDayPeriod: [{value: 'morning', disabled: true}, Validators.required]
      })
    });
  }

  dateRangeChange(event: MatRadioChange) {
    switch(event.value) {
      case this.dateRangeTypes[0]:
        this.formGroup.get('periodDateRange').enable();
        this.formGroup.get('dailyDatePicker').disable();
        this.formGroup.get('halfDay').disable();
        break;
      case this.dateRangeTypes[1]:
        this.formGroup.get('periodDateRange').disable();
        this.formGroup.get('dailyDatePicker').enable();
        this.formGroup.get('halfDay').disable();
        break;
      case this.dateRangeTypes[2]:
        this.formGroup.get('periodDateRange').disable();
        this.formGroup.get('dailyDatePicker').disable();
        this.formGroup.get('halfDay').enable();
        break;
    }
  }


  ngOnInit(): void {

  }

  updateBookingDates() {
    // todo extract values
    this.bookingChange.emit(new Booking(bookingsMock[0]));
    console.log('changes submitted!')
  }

}
