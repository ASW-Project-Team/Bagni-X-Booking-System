import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerAuthService} from "../../../../core/auth/customer-auth.service";
import {MatUtilsService} from "../../../../core/mat-utils/mat-utils.service";
import {Customer} from "../../../../shared/models/customer.model";
import {AppbarAction} from "../../../../shared/components/appbars/appbars.model";
import {UploadUtils} from "../../../../shared/utils/upload.utils";
import {ApiService} from "../../../../core/api/api.service";
import {News} from "../../../../shared/models/news.model";

@Component({
  selector: 'app-modify-account',
  templateUrl: './modify-account.component.html',
  styleUrls: ['./modify-account.component.scss']
})
export class ModifyAccountComponent implements OnInit {
  accountEditForm: FormGroup;
  actions: AppbarAction[] = [];
  status = ""
  userId = ""

  @ViewChild('formRef') formRef: FormGroupDirective;

  private submitAction: AppbarAction = {
    id: "0",
    name: "Salva nuova password",
    mdiIcon: 'content-save-outline',
    isMdi: true,
    execute: () => this.formRef.onSubmit(undefined)
  };

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private authService: CustomerAuthService,
              private router: Router,
              private api: ApiService,
              private matUtils: MatUtilsService) { }

  ngOnInit(): void {
    this.actions.push(this.submitAction)
    const customer = new Customer(this.authService.currentCustomerValue());
    this.userId = customer.id

    this.accountEditForm = this.formBuilder.group({
      name: [customer.name, Validators.required],
      surname: [customer.surname, Validators.required],
      email: [customer.email, [Validators.required, Validators.email]],
      phone: [customer.phone, Validators.pattern("^((\\+)[0-9]{2}(-)?)?[0-9]{6,11}$")],
      address: [customer.address],
    });
  }

  modifyAcc() {
    // stop here if form is invalid
    if (this.accountEditForm.invalid) {
      return;
    }

    this.status = 'loading';

    this.api.editCustomer(this.userId, this.accountEditForm.value).subscribe(() => {
      this.status = '';

      this.api.getCustomer(this.userId).subscribe((data) => {
        const updatedCust = new Customer(data);
        this.authService.updateCustomerInfo(updatedCust);

        this.router.navigate(['/profile']).then(() =>
          this.matUtils.createSnackBar("Dati dell'account modificati con successo!"))

      }, error => {
        this.status = error;
      })

    }, error => {
      this.status = error;
    });
  }
}
