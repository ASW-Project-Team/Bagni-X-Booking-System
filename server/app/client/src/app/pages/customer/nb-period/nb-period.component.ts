import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Booking} from "../../../shared/models/booking.model";

@Component({
  selector: 'app-nb-period',
  templateUrl: './nb-period.component.html',
  styleUrls: ['./nb-period.component.scss']
})
export class NbPeriodComponent implements OnInit {
  formGroup: FormGroup;
  @Input() booking: Booking;
  @Output() bookingChange: EventEmitter<Booking> = new EventEmitter<Booking>();

  constructor(private _formBuilder: FormBuilder) {
    this.formGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

}
