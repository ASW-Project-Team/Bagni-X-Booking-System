import { Component, OnInit } from '@angular/core';
import {Customer} from "../../../shared/models/customer.model";
import {AppbarAction} from "../../../shared/components/appbars/appbars.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {RankUmbrella} from "../../../shared/models/rank-umbrella.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-contact-edit',
  templateUrl: './admin-contact-edit.component.html',
  styleUrls: ['./admin-contact-edit.component.scss']
})
export class AdminContactEditComponent implements OnInit {
  backRoute: string = '/admin/contacts';
  backRouteName: string = 'Clienti';
  customer: Customer;
  activeActions: AppbarAction[] = [];
  isNew: boolean = true;
  customerForm: FormGroup;
  submitAction: Function;
  loading: boolean = false;
  error: string = '';

  private modifyAction: AppbarAction = {
    id: "0",
    name: "Salva modifiche",
    mdiIcon: 'content-save-outline',
    isMdi: true,
    execute: () => this.modifyCustomer()
  }

  private createAction: AppbarAction = {
    id: "0",
    name: "Crea cliente",
    mdiIcon: 'content-save-outline',
    isMdi: true,
    execute: () => this.createCustomer()
  }

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
    this.route.params.subscribe(params => {
      if (params.backRoute) {
        this.backRoute = params.backRoute;
      }

      if (params.backRouteName) {
        this.backRouteName = params.backRouteName
      }

      this.isNew = !!!params.id;

      if (this.isNew) {
        this.activeActions.push(this.createAction);
        this.submitAction = this.createCustomer;

      } else {
        this.api.getCustomer(params.id).subscribe(data => {
          this.customer = new Customer(data);
          this.customerForm.get('name').setValue(this.customer.name);
          this.customerForm.get('surname').setValue(this.customer.surname);
          this.customerForm.get('email').setValue(this.customer.email);
          this.customerForm.get('phone').setValue(this.customer.phone);
          this.customerForm.get('address').setValue(this.customer.address);

          this.activeActions.push(this.modifyAction);
          this.submitAction = this.modifyCustomer;
        });
      }
    });
  }

  modifyCustomer() {
    if (!this.customerForm.valid) {
      return;
    }

    this.loading = true;
    this.api.editUnregisteredCustomer(this.customer.id, this.customerForm.value).subscribe(() => {
      this.router.navigate([this.backRoute],).then(() =>
        this.snackBar.open("Cliente modificato.", null, { duration: 4000 }))
      },
      error => {
      this.error = error;
      this.loading = false;
    });
  }

  createCustomer() {
    if (!this.customerForm.valid) {
      return;
    }

    this.loading = true;
    this.api.createUnregisteredCustomer(this.customerForm.value).subscribe(() => {
        this.router.navigate([this.backRoute],).then(() =>
          this.snackBar.open("Cliente creato.", null, { duration: 4000 }))
      },
      error => {
        this.error = error;
        this.loading = false;
      });
  }
}
