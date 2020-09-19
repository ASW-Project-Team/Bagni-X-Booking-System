import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerAuthService} from "../../../core/auth/customer-auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {first} from "rxjs/operators";
import {CustomerModel} from "../../../shared/models/customer.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  status: string = '';

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private authService: CustomerAuthService,
              private router: Router,
              private snackBar: MatSnackBar) {
    // redirect to home if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/home"]).then(() => {
        const customerEmail = this.authService.currentCustomerValue().email;
        this.snackBar.open(
          `Sei già loggato come ${customerEmail}! per effettuare l'accesso con un altro account,
                 esegui prima il logout da questo.`,
          null,
          {duration: 4000}
        );
      });
    }
  }

  ngOnInit(): void {
    this.regForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\\[\\]:;<>,.?\\/~_+-=|]).{8,32}$"),
        Validators.minLength(8)
      ]],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.pattern("^((\\+)[0-9]{2}(-)?)?[0-9]{6,11}$")],
      address: [''],
    }, {validator: RegisterComponent.passwordMatchValidator});
  }
  hidePw = true;
  hideConfirm = true;

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
    }
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.regForm.invalid) {
      return;
    }

    const customerData: CustomerModel = {
      name: this.regForm.get('name').value,
      surname:  this.regForm.get('surname').value,
      email:  this.regForm.get('email').value,
      password:  this.regForm.get('password').value,
      address: this.regForm.get('address').value != '' ? this.regForm.get('address').value : undefined,
      phone: this.regForm.get('phone').value != '' ? this.regForm.get('phone').value : undefined,
      registered: true,
      deleted: false,
    }

    this.status = 'loading';
    this.authService.register(customerData).pipe(first()).subscribe(() => {
      this.status = '';
      this.router.navigate(['/profile']).then(() => {
        const customerName = this.authService.currentCustomerValue().name;
        this.snackBar.open(`Registrazione completata. Benvenuto, ${customerName}!`, null, {duration: 4000});
      });

    }, error => {
      this.status = error;
    });
  }
}
