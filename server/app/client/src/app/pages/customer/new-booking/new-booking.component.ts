import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {Booking} from "../../../shared/models/booking.model";

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


  constructor(private _route: ActivatedRoute, private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.backRoute = this._route.snapshot.queryParams['backRoute'] || '/home';
    this.backPageName = this._route.snapshot.queryParams['backPageName'] || 'Home';
  }

}
