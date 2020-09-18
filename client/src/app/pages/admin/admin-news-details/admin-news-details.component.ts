import {Component, OnInit} from '@angular/core';
import {AppbarAction} from "../../../shared/components/appbars/appbars.model";
import {News} from "../../../shared/models/news.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UploadUtils} from "../../../shared/utils/upload.utils";
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent} from "../../../shared/components/alert-dialog/alert-dialog.component";

@Component({
  selector: 'app-admin-news-details',
  templateUrl: './admin-news-details.component.html',
  styleUrls: ['./admin-news-details.component.scss']
})
export class AdminNewsDetailsComponent implements OnInit {
  actions: AppbarAction[] = [];
  newsId: string;
  newsForm: FormGroup;
  isNew: boolean = true;
  loading: boolean = false;
  error: string = '';
  submitAction: Function;

  private createAction: AppbarAction = {
    id: "0",
    name: "Crea news",
    mdiIcon: 'content-save-outline',
    isMdi: true,
    execute: () => this.createNews()
  };

  private deleteAction: AppbarAction = {
    id: "1",
    name: "Elimina news",
    mdiIcon: 'trash-can-outline',
    isMdi: true,
    execute: () => this.deleteNews()
  };

  private modifyAction: AppbarAction = {
    id: "0",
    name: "Salva modifiche",
    mdiIcon: 'content-save-outline',
    isMdi: true,
    execute: () => this.modifyNews()
  };

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private api: ApiService,
              private snackBar: MatSnackBar,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.newsForm = this.formBuilder.group({
      title: ['', Validators.required],
      article: ['', Validators.required],
      image: ['']
    });

    this.route.params.subscribe(params => {
      this.isNew = !!!params.id;

      if (this.isNew) {
        this.actions.push(this.createAction);
        this.submitAction = this.createNews;

      } else {
        this.newsId = params.id;
        this.actions.push(this.deleteAction, this.modifyAction);
        this.submitAction = this.modifyNews;

        this.api.getNews(params.id).subscribe(data => {
          const news = new News(data);
          this.newsForm.get('title').setValue(news.title);
          this.newsForm.get('article').setValue(news.article);
        });
      }
    });
  }

  modifyNews() {
    if (this.newsForm.invalid) {
      return;
    }

    this.loading = true;
    this.api.editNews(this.newsId, UploadUtils.toFormData(this.newsForm.value)).subscribe(() => {
      this.loading = false;
      this.router.navigate(['/admin/news'])
        .then(() => this.snackBar.open("Modifiche applicate!", null, {duration: 4000}))

    }, error => {
      this.error = error;
      this.loading = false;
    });
  }


  deleteNews() {
    this.dialog.open(AlertDialogComponent, { data: {
      content: "Sei sicuro di voler eliminare la notizia? L'azione non è reversibile.",
      positiveAction: { text: "Sì, elimina", execute: () => {
        this.loading = true;
        this.api.deleteNews(this.newsId).subscribe(() => {
          this.loading = false;
          this.router.navigate(['/admin/news'])
            .then(() => this.snackBar.open("Notizia eliminata!", null, {duration: 4000}))

        }, error => {
          this.error = error;
          this.loading = false;
        });
      }},
      negativeAction: { text: "No", execute: () => {} }
    }});
  }


  createNews() {
    if (this.newsForm.invalid) {
      return;
    }

    this.loading = true;

    this.api.createNews(UploadUtils.toFormData(this.newsForm.value)).subscribe(() => {
      this.loading = false;
      this.router.navigate(['/admin/news'])
        .then(() => this.snackBar.open("Notizia creata!", null, {duration: 4000}))

    }, error => {
      this.error = error;
      this.loading = false;
    });
  }
}
