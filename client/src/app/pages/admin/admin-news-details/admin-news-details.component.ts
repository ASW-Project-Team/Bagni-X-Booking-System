import {Component, OnInit, ViewChild} from '@angular/core';
import {AppbarAction} from "../../../shared/components/appbars/appbars.model";
import {News} from "../../../shared/models/news.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api/api.service";
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {UploadUtils} from "../../../shared/utils/upload.utils";
import {MatUtilsService} from "../../../core/mat-utils/mat-utils.service";

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
  status: string = '';
  @ViewChild('formRef') formRef: FormGroupDirective;

  private submitAction: AppbarAction = {
    id: "0",
    name: "Crea news",
    mdiIcon: 'content-save-outline',
    isMdi: true,
    execute: () => this.formRef.onSubmit(undefined)
  };

  private deleteAction: AppbarAction = {
    id: "1",
    name: "Elimina news",
    mdiIcon: 'trash-can-outline',
    isMdi: true,
    execute: () => this.deleteNews()
  };

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private api: ApiService,
              private router: Router,
              private matUtils: MatUtilsService) {
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
        this.submitAction.name = "Crea news";
        this.actions.push(this.submitAction);

      } else {
        this.newsId = params.id;
        this.submitAction.name = "Modifica news";
        this.actions.push(this.deleteAction, this.submitAction);

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

    this.status = 'loading';
    this.api.editNews(this.newsId, UploadUtils.toFormData(this.newsForm.value)).subscribe(() => {
      this.status = '';
      this.router.navigate(['/admin/news']).then(() =>
        this.matUtils.createSnackBar("Modifiche applicate!"))

    }, error => {
      this.status = error;
    });
  }


  deleteNews() {
    this.matUtils.createAlertDialog({
      content: "Sei sicuro di voler eliminare la notizia? L'azione non è reversibile.",
      positiveAction: { text: "Sì, elimina", execute: () => {
        this.status = 'loading';
        this.api.deleteNews(this.newsId).subscribe(() => {
          this.status = '';
          this.router.navigate(['/admin/news']).then(() =>
            this.matUtils.createSnackBar("Notizia eliminata!"))

        }, error => {
          this.status = error;
        });
      }},
      negativeAction: { text: "No", execute: () => {} }
    });
  }


  createNews() {
    if (this.newsForm.invalid) {
      return;
    }

    this.status = 'loading';
    this.api.createNews(UploadUtils.toFormData(this.newsForm.value)).subscribe(() => {
      this.status = '';
      this.router.navigate(['/admin/news']).then(() =>
        this.matUtils.createSnackBar("Notizia creata!"))

    }, error => {
      this.status = error;
    });
  }

  submit() {
    if (this.isNew) {
      this.createNews();
    } else {
      this.modifyNews();
    }
  }
}
