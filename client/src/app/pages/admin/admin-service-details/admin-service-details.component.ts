import {Component, OnInit, ViewChild} from '@angular/core';
import {AppbarAction} from "../../../shared/components/appbars/appbars.model";
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent} from "../../../shared/components/alert-dialog/alert-dialog.component";
import {UploadUtils} from "../../../shared/utils/upload.utils";
import {Service} from "../../../shared/models/service.model";

@Component({
  selector: 'app-admin-service-details',
  templateUrl: './admin-service-details.component.html',
  styleUrls: ['./admin-service-details.component.scss']
})
export class AdminServiceDetailsComponent implements OnInit {
  activeActions: AppbarAction[] = [];
  serviceForm: FormGroup;
  isNew: boolean = true;
  loading: boolean = false;
  error: string = '';
  serviceId: string;
  @ViewChild('formRef') formRef: FormGroupDirective;


  private submitAction: AppbarAction = {
    id: "0",
    name: "Crea servizio",
    mdiIcon: 'content-save-outline',
    isMdi: true,
    execute: () => this.formRef.onSubmit(undefined)
  };

  private deleteAction: AppbarAction =  {
    id: "1",
    name: "Elimina servizio",
    mdiIcon: 'trash-can-outline',
    isMdi: true,
    execute: () => this.deleteService()
  };


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private api: ApiService,
              private snackBar: MatSnackBar,
              private router: Router,
              private dialog: MatDialog) {
    this.serviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isNew = !!!params.id;

      if (this.isNew) {
        this.submitAction.name = "Crea servizio";
        this.activeActions.push(this.submitAction);

      } else {
        this.serviceId = params.id;
        this.submitAction.name = "Modifica servizio";
        this.activeActions.push(this.deleteAction, this.submitAction);
        this.api.getService(this.serviceId).subscribe(data => {
          const service = new Service(data);
          this.serviceForm.get('name').setValue(service.name);
          this.serviceForm.get('description').setValue(service.description);
          this.serviceForm.get('dailyPrice').setValue(service.dailyPrice);
        });
      }
    });
  }


  modifyService() {
    // stop here if form is invalid
    if (this.serviceForm.invalid) {
      return;
    }

    this.loading = true;

    this.api.editService(this.serviceId, UploadUtils.toFormData(this.serviceForm.value)).subscribe(() => {
      this.loading = false;
      this.router.navigate(['/admin/services'])
        .then(() => this.snackBar.open("Modifiche applicate!", null, {duration: 4000}))

    }, error => {
      this.error = error;
      this.loading = false;
    });
  }


  deleteService() {
    this.dialog.open(AlertDialogComponent, { data: {
        content: "Sei sicuro di voler eliminare il servizio? L'azione interesserà le future prenotazioni, ma non quelle già effettuate.",
        positiveAction: { text: "Sì, elimina", execute: () => {
          this.loading = true;
          this.api.deleteService(this.serviceId).subscribe(() => {
              this.loading = false;
              this.router.navigate(['/admin/services'])
                .then(() => this.snackBar.open("Servizio eliminato!", null, {duration: 4000}))

          }, error => {
            this.error = error;
            this.loading = false;
          });
        } },
        negativeAction: { text: "No", execute: () => {} }
      }});
  }

  createService() {
    // stop here if form is invalid
    if (this.serviceForm.invalid) {
      return;
    }

    this.loading = true;
    this.api.createService(UploadUtils.toFormData(this.serviceForm.value)).subscribe(() => {
      this.loading = false;
      this.router.navigate(['/admin/services'])
        .then(() => this.snackBar.open("Servizio creato!", null, {duration: 4000}))

    }, error => {
      this.error = error;
      this.loading = false;
    });
  }

  submit() {
    if (this.isNew) {
      this.createService();
    } else {
      this.modifyService();
    }
  }
}
