import {Component, Input, OnInit} from '@angular/core';
import {Customer} from "../../models/customer.model";
import {Admin} from "../../models/admin.model";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input() customer: Customer;
  @Input() admin: Admin;

  constructor() { }

  ngOnInit(): void {
  }

}
