import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {first} from "rxjs/operators";
import {AdminAuthService} from "../../../core/auth/admin-auth.service";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  usernameControl: FormControl;
  passwordControl: FormControl;

  loading: boolean = false;
  submitted: boolean = false;
  returnUrl: string;
  returnUrlExternallySet: boolean = false;
  error: string = '';
  hidePw = true;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private authService: AdminAuthService,
              private router: Router,
              private snackBar: MatSnackBar) {
    // redirect to home if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/admin/bookings"]).then(() => {
        const adminUsername = this.authService.currentAdminValue().username;
        this.snackBar.open(
          `Sei già loggato come amministratore ${adminUsername}! per effettuare l'accesso con un altro account,
                 esegui prima il logout da questo.`,
          null,
          { duration: 4000 }
        );
      });
    }
  }


  ngOnInit(): void {
    this.usernameControl = new FormControl('',[Validators.required])
    this.passwordControl = new FormControl('',[Validators.required])

    this.loginForm = new FormGroup({
      usernameControl: this.usernameControl,
      passwordControl: this.passwordControl
    });

    // get return url from route parameters, or default to '/home'
    if (this.route.snapshot.queryParams['returnUrl']) {
      this.returnUrlExternallySet = true;
      this.returnUrl = this.route.snapshot.queryParams['returnUrl']
    } else {
      this.returnUrl = '/admin/bookings';
    }

  }


  public onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.usernameControl.value, this.passwordControl.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]).then(() => {
            const customerName = this.authService.currentAdminValue().username;
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
