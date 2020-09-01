import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss']
})
export class NewBookingComponent implements OnInit {
  backRoute: string;
  backPageName: string;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  constructor(private route: ActivatedRoute, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.backRoute = this.route.snapshot.queryParams['backRoute'] || '/home';
    this.backPageName = this.route.snapshot.queryParams['backPageName'] || 'Home';

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
