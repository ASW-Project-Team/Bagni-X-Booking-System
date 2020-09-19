import { Component, OnInit } from '@angular/core';
import {AppbarAction} from "../../../shared/components/appbars/appbars.model";
import {RankUmbrella} from "../../../shared/models/rank-umbrella.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent} from "../../../shared/components/alert-dialog/alert-dialog.component";
import {UploadUtils} from "../../../shared/utils/upload.utils";

@Component({
  selector: 'app-admin-rank-details',
  templateUrl: './admin-rank-details.component.html',
  styleUrls: ['./admin-rank-details.component.scss']
})
export class AdminRankDetailsComponent implements OnInit {
  activeActions: AppbarAction[] = [];
  rankUmbrella: RankUmbrella;
  rankForm: FormGroup;
  isNew: boolean = true;
  loading: boolean = false;
  error: string = '';
  submitAction: Function;

  private deleteAction: AppbarAction = {
    id: "1",
    name: "Elimina categoria ombrelloni",
    mdiIcon: 'trash-can-outline',
    isMdi: true,
    execute: () => this.deleteRank()

  };

  private modifyAction: AppbarAction = {
    id: "0",
    name: "Salva modifiche",
    mdiIcon: 'content-save-outline',
    isMdi: true,
    execute: () => this.modifyRank()
  }

  private createAction: AppbarAction = {
    id: "0",
    name: "Crea categoria ombrelloni",
    mdiIcon: 'content-save-outline',
    isMdi: true,
    execute: () => this.createRank()
  }


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private api: ApiService,
              private snackBar: MatSnackBar,
              private router: Router,
              private dialog: MatDialog) {

    this.rankForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      fromUmbrella: ['', Validators.required],
      toUmbrella: ['', Validators.required],
      image: [''],
      sales: [[]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isNew = !!!params.id;

      if (this.isNew) {
        this.activeActions.push(this.createAction);
        this.submitAction = this.createRank;

      } else {
        this.api.getRankUmbrella(params.id).subscribe(data => {
          this.rankUmbrella = new RankUmbrella(data);
          this.rankForm.get('name').setValue(this.rankUmbrella.name);
          this.rankForm.get('description').setValue(this.rankUmbrella.description);
          this.rankForm.get('dailyPrice').setValue(this.rankUmbrella.dailyPrice);
          this.rankForm.get('fromUmbrella').setValue(this.rankUmbrella.fromUmbrella);
          this.rankForm.get('toUmbrella').setValue(this.rankUmbrella.toUmbrella);
          this.rankForm.get('sales').setValue(this.rankUmbrella.sales);

          this.activeActions.push(this.deleteAction, this.modifyAction);
          this.submitAction = this.modifyRank;
        });
      }
    });
  }

  private createRank() {
    // stop here if form is invalid
    if (this.rankForm.invalid) {
      return;
    }

    this.loading = true;
    this.api.createRankUmbrella(UploadUtils.toFormData(this.rankForm.value)).subscribe(() => {
      this.loading = false;
      this.router.navigate(['/admin/rank-umbrellas'])
        .then(() => this.snackBar.open("Categoria ombrelloni creata!", null, {duration: 4000}))

    }, error => {
      this.error = error;
      this.loading = false;
    });
  }


  private deleteRank() {
    this.dialog.open(AlertDialogComponent, { data: {
        content: "Sei sicuro di voler eliminare questa categoria? L'azione interesserà le future prenotazioni, ma non quelle già effettuate.",
        positiveAction: { text: "Sì, elimina", execute: () => {
            this.loading = true;
            this.api.deleteRankUmbrella(this.rankUmbrella.id).subscribe(() => {
                this.loading = false;
                this.router.navigate(['/admin/rank-umbrellas'])
                  .then(() => this.snackBar.open("Categoria ombrelloni eliminata!", null, {duration: 4000}))
              },
              error => {
                this.error = error;
                this.loading = false;
              });
        } },
        negativeAction: { text: "No", execute: () => {} }
      }});
  }


  private modifyRank() {
    // stop here if form is invalid
    if (this.rankForm.invalid) {
      return;
    }

    this.loading = true;

    this.api.editRankUmbrella(this.rankUmbrella.id, UploadUtils.toFormData(this.rankForm.value)).subscribe(() => {
      this.loading = false;
      this.router.navigate(['/admin/rank-umbrellas'])
        .then(() => this.snackBar.open("Modifiche applicate!", null, {duration: 4000}))

    }, error => {
      this.error = error;
      this.loading = false;
    });
  }
}
