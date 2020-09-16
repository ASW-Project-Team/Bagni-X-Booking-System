import {Component, OnInit} from '@angular/core';
import {AppbarAction} from "../../../shared/components/appbars/appbars.model";
import {News} from "../../../shared/models/news.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api/api.service";
import {SharingService} from "../../../core/sharing/sharing.service";
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
  downloadedNews: News;
  newsForm: FormGroup;
  isNewNews: boolean = true;
  loading: boolean = false;
  submitted: boolean = false;
  error: string = '';

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
      if (params.id) {
        this.isNewNews = false;

        this.api.getNews(params.id).subscribe(data => {
          this.downloadedNews = new News(data);
          this.newsForm.get('title').setValue(this.downloadedNews.title);
          this.newsForm.get('article').setValue(this.downloadedNews.article);
          this.actions = [
            {
              id: "1",
              name: "Elimina news",
              mdiIcon: 'trash-can-outline',
              isMdi: true,
              execute: () =>
                this.dialog.open(AlertDialogComponent, { data: {
                    content: "Sei sicuro di voler eliminare la notizia? L'azione non è reversibile.",
                    positiveAction: { text: "Sì, elimina", execute: () => this.deleteNews() },
                    negativeAction: { text: "No", execute: () => {} }
                }})
            },
            {
              id: "0",
              name: "Salva modifiche",
              mdiIcon: 'content-save-outline',
              isMdi: true,
              execute: () => this.modifyNews()
            }
          ];
        });

      } else {
        this.actions = [
          {
            id: "0",
            name: "Crea news",
            mdiIcon: 'content-save-outline',
            isMdi: true,
            execute: () => this.createNews()
          }
        ];
      }
    });
  }


  modifyNews() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.newsForm.invalid) {
      return;
    }

    this.loading = true;

    this.api.editNews(this.downloadedNews.id, UploadUtils.toFormData(this.newsForm.value)).subscribe(() => {
      this.loading = false;
      this.router.navigate(['/admin/news'])
        .then(() => this.snackBar.open("Modifiche applicate!", null, {duration: 4000}))

    }, error => {
      this.error = error;
      this.loading = false;
    });
  }


  deleteNews() {
    this.loading = true;
    this.api.deleteNews(this.downloadedNews.id).subscribe(() => {
      this.loading = false;
      this.router.navigate(['/admin/news'])
        .then(() => this.snackBar.open("Notizia eliminata!", null, {duration: 4000}))
      },
      error => {
      this.error = error;
      this.loading = false;
    });
  }

  createNews() {
    this.submitted = true;

    // stop here if form is invalid
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
