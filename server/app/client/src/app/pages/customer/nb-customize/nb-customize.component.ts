import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Booking} from "../../../shared/models/booking.model";

@Component({
  selector: 'app-nb-customize',
  templateUrl: './nb-customize.component.html',
  styleUrls: ['./nb-customize.component.scss']
})
export class NbCustomizeComponent implements OnInit {
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
