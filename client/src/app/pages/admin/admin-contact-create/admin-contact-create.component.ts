import {Component, OnInit, ViewChild} from '@angular/core';
import {Customer} from "../../../shared/models/customer.model";
import {AppbarAction} from "../../../shared/components/appbars/appbars.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UnregCustomerFormComponent} from "../../../shared/components/unreg-customer-form/unreg-customer-form.component";

@Component({
  selector: 'app-admin-contact-create',
  templateUrl: './admin-contact-create.component.html',
  styleUrls: ['./admin-contact-create.component.scss']
})
export class AdminContactCreateComponent implements OnInit {
  activeActions: AppbarAction[] = [];
  @ViewChild('editor') editor: UnregCustomerFormComponent;

  private createAction: AppbarAction = {
    id: "0",
    name: "Crea cliente",
    mdiIcon: 'content-save-outline',
    isMdi: true,
    execute: () => this.editor.createCustomer()
  }

  constructor() { }

  ngOnInit(): void {
    this.activeActions.push(this.createAction)
  }
}
