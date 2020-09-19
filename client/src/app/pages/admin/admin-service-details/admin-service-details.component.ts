import { Component, OnInit } from '@angular/core';
import {AppbarAction} from "../../../shared/components/appbars/appbars.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  submitAction: Function;
  serviceId: string;

  private createAction: AppbarAction = {
    id: "0",
    name: "Crea servizio",
    mdiIcon: 'content-save-outline',
    isMdi: true,
    execute: () => this.createService()
  };

  private deleteAction: AppbarAction =  {
    id: "1",
    name: "Elimina servizio",
    mdiIcon: 'trash-can-outline',
    isMdi: true,
    execute: () => this.deleteService()
  };

  private editAction: AppbarAction = {
    id: "0",
    name: "Salva modifiche",
    mdiIcon: 'content-save-outline',
    isMdi: true,
    execute: () => this.modifyService()
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
        this.activeActions.push(this.createAction);
        this.submitAction = this.createService;

      } else {
        this.activeActions.push(this.deleteAction, this.editAction);
        this.submitAction = this.modifyService;
        this.serviceId = params.id;
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
}
