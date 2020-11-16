import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatUtilsService} from "../../../../core/mat-utils/mat-utils.service";
import {AppbarAction} from "../../../../shared/components/appbars/appbars.model";
import {ApiService} from "../../../../core/api/api.service";
import {AdminAuthService} from "../../../../core/auth/admin-auth.service";
import {Admin} from "../../../../shared/models/admin.model";

@Component({
  selector: 'app-modify-account',
  templateUrl: './admin-modify-account.component.html',
  styleUrls: ['./admin-modify-account.component.scss']
})
export class AdminModifyAccountComponent implements OnInit {
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
              private authService: AdminAuthService,
              private router: Router,
              private api: ApiService,
              private matUtils: MatUtilsService) { }

  ngOnInit(): void {
    this.actions.push(this.submitAction)
    const admin = new Admin(this.authService.currentAdminValue());
    this.userId = admin.id

    this.accountEditForm = this.formBuilder.group({
      username: [admin.username, [Validators.required, this.noWhitespaceValidator]],
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  modifyAcc() {
    // stop here if form is invalid
    if (this.accountEditForm.invalid) {
      return;
    }

    this.status = 'loading';

    this.api.editAdmin(this.userId, this.accountEditForm.value).subscribe(() => {
      this.status = '';

      this.api.getAdmin(this.userId).subscribe((data) => {
        const updatedAdmin = new Admin(data);
        this.authService.updateAdminInfo(updatedAdmin);

        this.router.navigate(['/admin/profile']).then(() =>
          this.matUtils.createSnackBar("Dati dell'account modificati con successo!"))

      }, error => {
        this.status = error;
      })

    }, error => {
      this.status = error;
    });
  }
}
