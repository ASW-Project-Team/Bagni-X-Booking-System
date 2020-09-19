import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Customer} from "../../models/customer.model";
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-unreg-customer-form',
  templateUrl: './unreg-customer-form.component.html',
  styleUrls: ['./unreg-customer-form.component.scss']
})
export class UnregCustomerFormComponent implements OnInit {
  @Input() customer: Customer;
  @Input() isCreate: boolean = true;
  customerForm: FormGroup;
  status: string = '';

  @ViewChild('formRef') formRef: FormGroupDirective;

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: [''],
      phone: ['', Validators.pattern("^((\\+)[0-9]{2}(-)?)?[0-9]{6,11}$")],
      address: [''],
    });
  }

  ngOnInit(): void {
    if (this.customer) {
      this.customerForm.get('name').setValue(this.customer.name);
      this.customerForm.get('surname').setValue(this.customer.surname);
      this.customerForm.get('email').setValue(this.customer.email);
      this.customerForm.get('phone').setValue(this.customer.phone);
      this.customerForm.get('address').setValue(this.customer.address);
    }
  }

  modifyCustomer() {
    if (!this.customerForm.valid) {
      return;
    }

    this.status = 'loading';
    this.api.editUnregisteredCustomer(this.customer.id, this.customerForm.value).subscribe(() => {
        this.status = '';
        this.router.navigate(['/admin/contacts'],).then(() =>
          this.snackBar.open("Cliente modificato.", null, { duration: 4000 }))
      },
      error => {
        this.status = error;
      });
  }

  submitAction() {
    if (this.isCreate) {
      this.createCustomer();
    } else {
      this.modifyCustomer();
    }
  }

  createCustomer() {
    if (!this.customerForm.valid) {
      return;
    }

    this.status = 'loading';
    this.api.createUnregisteredCustomer(this.customerForm.value).subscribe(() => {
        this.status = '';
        this.router.navigate(['/admin/contacts'],).then(() =>
          this.snackBar.open("Cliente creato.", null, { duration: 4000 }))
      },
      error => {
        this.status = error;
      });
  }

  submitProgrammatically() {
    this.formRef.onSubmit(undefined);
  }
}
