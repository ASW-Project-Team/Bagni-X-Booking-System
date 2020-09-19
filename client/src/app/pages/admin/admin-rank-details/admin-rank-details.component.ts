import {Component, OnInit, ViewChild} from '@angular/core';
import {AppbarAction} from "../../../shared/components/appbars/appbars.model";
import {RankUmbrella} from "../../../shared/models/rank-umbrella.model";
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
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
  rankUmbrellaId: string;
  rankForm: FormGroup;
  isNew: boolean = true;
  loading: boolean = false;
  error: string = '';
  @ViewChild('formRef') formRef: FormGroupDirective;

  private deleteAction: AppbarAction = {
    id: "1",
    name: "Elimina categoria ombrelloni",
    mdiIcon: 'trash-can-outline',
    isMdi: true,
    execute: () => this.deleteRank()

  };

  private submitAction: AppbarAction = {
    id: "0",
    name: "Crea categoria ombrelloni",
    mdiIcon: 'content-save-outline',
    isMdi: true,
    execute: () => this.formRef.onSubmit(undefined)
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
        this.submitAction.name = "Crea categoria ombrelloni";
        this.activeActions.push(this.submitAction);

      } else {
        this.rankUmbrellaId = params.id;
        this.submitAction.name = "Modifica categoria ombrelloni";
        this.activeActions.push(this.deleteAction, this.submitAction);

        this.api.getRankUmbrella(this.rankUmbrellaId).subscribe(data => {
          const rankUmbrella = new RankUmbrella(data);
          this.rankForm.get('name').setValue(rankUmbrella.name);
          this.rankForm.get('description').setValue(rankUmbrella.description);
          this.rankForm.get('dailyPrice').setValue(rankUmbrella.dailyPrice);
          this.rankForm.get('fromUmbrella').setValue(rankUmbrella.fromUmbrella);
          this.rankForm.get('toUmbrella').setValue(rankUmbrella.toUmbrella);
          this.rankForm.get('sales').setValue(rankUmbrella.sales);
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
            this.api.deleteRankUmbrella(this.rankUmbrellaId).subscribe(() => {
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

    this.api.editRankUmbrella(this.rankUmbrellaId, UploadUtils.toFormData(this.rankForm.value)).subscribe(() => {
      this.loading = false;
      this.router.navigate(['/admin/rank-umbrellas'])
        .then(() => this.snackBar.open("Modifiche applicate!", null, {duration: 4000}))

    }, error => {
      this.error = error;
      this.loading = false;
    });
  }


  submit() {
    if (this.isNew) {
      this.createRank();
    } else {
      this.modifyRank();
    }
  }
}
