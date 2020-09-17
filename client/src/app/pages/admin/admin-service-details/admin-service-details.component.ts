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
  actions: AppbarAction[] = [];
  service: Service;
  serviceForm: FormGroup;
  isNew: boolean = true;
  loading: boolean = false;
  error: string = '';

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private api: ApiService,
              private snackBar: MatSnackBar,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.serviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      image: ['']
    });

    this.route.params.subscribe(params => {
      if (params.id) {
        this.isNew = false;

        this.api.getService(params.id).subscribe(data => {
          this.service = new Service(data);
          this.serviceForm.get('name').setValue(this.service.name);
          this.serviceForm.get('description').setValue(this.service.description);
          this.serviceForm.get('dailyPrice').setValue(this.service.dailyPrice);
          this.actions = [
            {
              id: "1",
              name: "Elimina servizio",
              mdiIcon: 'trash-can-outline',
              isMdi: true,
              execute: () =>
                this.dialog.open(AlertDialogComponent, { data: {
                    content: "Sei sicuro di voler eliminare il servizio? L'azione interesserà le future prenotazioni, ma non quelle già effettuate.",
                    positiveAction: { text: "Sì, elimina", execute: () => this.deleteService() },
                    negativeAction: { text: "No", execute: () => {} }
                  }})
            },
            {
              id: "0",
              name: "Salva modifiche",
              mdiIcon: 'content-save-outline',
              isMdi: true,
              execute: () => this.modifyService()
            }
          ];
        });

      } else {
        this.actions = [
          {
            id: "0",
            name: "Crea servizio",
            mdiIcon: 'content-save-outline',
            isMdi: true,
            execute: () => this.createService()
          }
        ];
      }
    });
  }


  modifyService() {
    // stop here if form is invalid
    if (this.serviceForm.invalid) {
      return;
    }

    this.loading = true;

    this.api.editService(this.service.id, UploadUtils.toFormData(this.serviceForm.value)).subscribe(() => {
      this.loading = false;
      this.router.navigate(['/admin/services'])
        .then(() => this.snackBar.open("Modifiche applicate!", null, {duration: 4000}))

    }, error => {
      this.error = error;
      this.loading = false;
    });
  }


  deleteService() {
    this.loading = true;
    this.api.deleteService(this.service.id).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/admin/services'])
          .then(() => this.snackBar.open("Servizio eliminato!", null, {duration: 4000}))
      },
      error => {
        this.error = error;
        this.loading = false;
      });
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
