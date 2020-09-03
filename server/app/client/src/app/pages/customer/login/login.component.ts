import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailControl: FormControl;
  passwordControl: FormControl;

  loading: boolean = false;
  submitted: boolean = false;
  returnUrl: string;
  returnUrlExternallySet: boolean = false;
  error: string = '';
  hidePw = true;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private authService: AuthService,
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
          { duration: 4000 }
        );
      });
    }
  }


  ngOnInit(): void {
    this.emailControl = new FormControl('',[Validators.required, Validators.email])
    this.passwordControl = new FormControl('',[Validators.required])

    this.loginForm = new FormGroup({
      emailControl: this.emailControl,
      passwordControl: this.passwordControl
    });

    // get return url from route parameters, or default to '/home'
    if(this.route.snapshot.queryParams['returnUrl']) {
      this.returnUrlExternallySet = true;
      this.returnUrl = this.route.snapshot.queryParams['returnUrl']
    } else {
      this.returnUrl = '/home';
    }

  }


  public onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.emailControl.value, this.passwordControl.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]).then(() => {
            const customerName = this.authService.currentCustomerValue().name;
            this.snackBar.open(
              `Login completato. Benvenuto, ${customerName}!`,
              null,
              { duration: 4000 }
            );
          });
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
