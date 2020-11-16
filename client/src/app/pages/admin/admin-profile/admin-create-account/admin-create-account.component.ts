import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {AppbarAction} from "../../../../shared/components/appbars/appbars.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminAuthService} from "../../../../core/auth/admin-auth.service";
import {MatUtilsService} from "../../../../core/mat-utils/mat-utils.service";
import {ApiService} from "../../../../core/api/api.service";

@Component({
  selector: 'app-admin-create-account',
  templateUrl: './admin-create-account.component.html',
  styleUrls: ['./admin-create-account.component.scss']
})
export class AdminCreateAccountComponent implements OnInit {
  accountForm: FormGroup;
  hidePw = true;
  hideConfirm = true;
  actions: AppbarAction[] = [];
  status = ""

  @ViewChild('formRef') formRef: FormGroupDirective;

  private submitAction: AppbarAction = {
    id: "0",
    name: "Crea admin",
    mdiIcon: 'content-save-outline',
    isMdi: true,
    execute: () => this.formRef.onSubmit(undefined)
  };

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private authService: AdminAuthService,
              private router: Router,
              private matUtils: MatUtilsService,
              private api: ApiService) {
  }

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      username: ['', [Validators.required, this.noWhitespaceValidator]],
      password: ['', [
        Validators.required,
        Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\\[\\]:;<>,.?\\/~_+-=|]).{8,32}$"),
        Validators.minLength(8)
      ]],
      confirmPassword: ['', Validators.required]
    }, {validator: AdminCreateAccountComponent.passwordMatchValidator});

    this.actions.push(this.submitAction);
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({NoPasswordMatch: true});
    }
  }


  createAdmin() {
    // stop here if form is invalid
    if (this.accountForm.invalid) {
      return;
    }

    this.status = 'loading';

    const username =  this.accountForm.get("username").value;
    const password =  this.accountForm.get("password").value;
    this.api.createAdmin({username: username, password: password}).subscribe(() => {
      this.status = '';

      this.router.navigate(['/admin/profile']).then(() =>
        this.matUtils.createSnackBar("Admin standard \""+ username + "\" aggiunto con successo!"))

    }, error => {
      this.status = error;
    });
  }
}
