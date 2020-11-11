import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerAuthService} from "../../../../core/auth/customer-auth.service";
import {MatUtilsService} from "../../../../core/mat-utils/mat-utils.service";
import {RegisterComponent} from "../../register/register.component";
import {AppbarAction} from "../../../../shared/components/appbars/appbars.model";

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.scss']
})
export class ModifyPasswordComponent implements OnInit {
  pwForm: FormGroup;
  hidePw = true;
  hidePwNew = true;
  hideConfirm = true;
  actions: AppbarAction[] = [];
  status = ""

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
              private matUtils: MatUtilsService) { }

  ngOnInit(): void {
    this.pwForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [
        Validators.required,
        Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\\[\\]:;<>,.?\\/~_+-=|]).{8,32}$"),
        Validators.minLength(8)
      ]],
      confirmPassword: ['', Validators.required]
    }, {validator: ModifyPasswordComponent.passwordMatchValidator});

    this.actions.push(this.submitAction);

  }


  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('newPassword').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
    }
  }

  modifyPassword() {
    // stop here if form is invalid
    if (this.pwForm.invalid) {
      return;
    }


    // todo changePwActions
    this.router.navigate(['/profile']).then(() =>
      this.matUtils.createSnackBar("Password modificata con successo!"))
  }
}
