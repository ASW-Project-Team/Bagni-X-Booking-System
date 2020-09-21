import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppbarAction} from "../../../shared/components/appbars/appbars.model";
import {ApiService} from "../../../core/api/api.service";
import {News} from "../../../shared/models/news.model";
import {SharingService} from "../../../core/sharing/sharing.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatUtilsService} from "../../../core/mat-utils/mat-utils.service";


@Component({
  selector: 'app-news',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  activeActions: AppbarAction[] = [];
  newsId: string;
  appbarTitle: string = '';
  news: News;

  private shareAction: AppbarAction = {
    id: "0",
    name: "Condividi",
    mdiIcon: 'share-variant-outline',
    disabled: false,
    isMdi: true,
    execute: () => {
      if (this.sharing.shareNews(this.news)) {
        this.matUtils.createSnackBar('Condivisione in corso...');
      } else {
        this.matUtils.createSnackBar('Link all\'articolo salvato negli appunti!');
      }
    }
  };

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private sharing: SharingService,
              private matUtils: MatUtilsService) { }


  ngOnInit(): void {
    this.activeActions.push(this.shareAction);

    this.route.params.subscribe(params => {
      this.newsId = params.id;
      this.appbarTitle = params.title;
      this.api.getNews(this.newsId).subscribe(data => {
        this.news = new News(data);
        this.appbarTitle = this.news.title;
      });
    });
  }
}
