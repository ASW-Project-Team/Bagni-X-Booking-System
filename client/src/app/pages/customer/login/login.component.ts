import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerAuthService} from "../../../core/auth/customer-auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatUtilsService} from "../../../core/mat-utils/mat-utils.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  returnUrlExternallySet: boolean = false;
  status: string = '';
  hidePw = true;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private customerAuthService: CustomerAuthService,
              private router: Router,
              private matUtils: MatUtilsService) {
    // redirect to home if already logged in
    if (this.customerAuthService.isLoggedIn()) {
      this.router.navigate(["/home"]).then(() => {
        const customerEmail = this.customerAuthService.currentCustomerValue().email;
        this.matUtils.createSnackBar(`Sei già loggato come ${customerEmail}! per effettuare l'accesso con
        un altro account, esegui prima il logout da questo.`);
      });
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    // get return url from route parameters, or default to '/home'
    this.route.queryParamMap.subscribe(params => {
      if (params.get('returnUrl')) {
        this.returnUrlExternallySet = true;
        this.returnUrl = params.get('returnUrl')
      } else {
        this.returnUrl = '/home';
      }
    });
  }


  public onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.status = 'loading';
    this.customerAuthService.login(this.loginForm.value).pipe(first()).subscribe(() => {
      this.status = '';
      this.router.navigate([ this.returnUrl ]).then(() => {
        const customerName = this.customerAuthService.currentCustomerValue().name;
        this.matUtils.createSnackBar(`Login completato. Benvenuto, ${customerName}!`);
      });

    }, error => {
      this.status = error;
    });
  }
}
