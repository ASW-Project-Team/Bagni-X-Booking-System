import { Component, OnInit } from '@angular/core';
import {AppbarAction} from "../../../shared/components/appbars/appbars.model";
import {News} from "../../../shared/models/news.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {HomeCard} from "../../../shared/models/home-card.model";
import {AlertDialogComponent} from "../../../shared/components/alert-dialog/alert-dialog.component";
import {UploadUtils} from "../../../shared/utils/upload.utils";

@Component({
  selector: 'app-admin-home-card-details',
  templateUrl: './admin-home-card-details.component.html',
  styleUrls: ['./admin-home-card-details.component.scss']
})
export class AdminHomeCardDetailsComponent implements OnInit {
  actions: AppbarAction[] = [];
  homeCardId: string;
  homeCardForm: FormGroup;
  loading: boolean = false;
  error: string = '';

  private modifyAction: AppbarAction = {
    id: "0",
    name: "Salva modifiche",
    mdiIcon: 'content-save-outline',
    isMdi: true,
    execute: () => this.modifyHomeCard()
  }

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private api: ApiService,
              private snackBar: MatSnackBar,
              private router: Router,
              private dialog: MatDialog) {

    this.homeCardForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.api.getHomeCard(params.id).subscribe(data => {
          this.homeCardId = params.id;

          const homeCard = new HomeCard(data);
          this.homeCardForm.get('title').setValue(homeCard.title);
          this.homeCardForm.get('description').setValue(homeCard.description);
          this.actions.push(this.modifyAction);
        });

      }
    });
  }

  modifyHomeCard() {
    if (!this.homeCardForm.valid) {
      return;
    }

    this.loading = true;

    this.api.editHomeCard(this.homeCardId, UploadUtils.toFormData(this.homeCardForm.value))
      .subscribe(() => {
        this.loading = false;
        this.router.navigate(['/admin/home-customize']).then(() => {
          this.snackBar.open('Home card modificata!', null, {duration: 4000});
        })
      }, error => {
        this.loading = false;
        this.error = error;
      })
  }
}
