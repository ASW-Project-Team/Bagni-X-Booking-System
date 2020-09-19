import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {first} from "rxjs/operators";
import {AdminAuthService} from "../../../core/auth/admin-auth.service";
import {MatUtilsService} from "../../../core/mat-utils/mat-utils.service";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  returnUrlExternallySet: boolean = false;
  hidePw = true;
  status: string = '';


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private authService: AdminAuthService,
              private router: Router,
              private matUtils: MatUtilsService) {
    // redirect to home if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/admin/bookings"]).then(() => {
        const adminUsername = this.authService.currentAdminValue().username;
        this.matUtils.createSnackBar(`Sei già loggato come amministratore ${adminUsername}! per effettuare
          l'accesso con un altro account, esegui prima il logout da questo.`
        );
      });
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    // get return url from route parameters, or default to '/admin/bookings'
    this.route.queryParamMap.subscribe(params => {
      if(params.get('returnUrl')) {
        this.returnUrlExternallySet = true;
        this.returnUrl = params.get('returnUrl')
      } else {
        this.returnUrl = '/admin/bookings';
      }
    });
  }


  public onSubmit(): void {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.status = 'loading';
    this.authService.login(this.loginForm.value).pipe(first()).subscribe(() => {
      this.status = '';
      this.router.navigate([this.returnUrl]).then(() => {
        const customerName = this.authService.currentAdminValue().username;
        this.matUtils.createSnackBar(`Login completato. Benvenuto, ${customerName}!`);
      });
    }, error => {
      this.status = error;
    });
  }
}
