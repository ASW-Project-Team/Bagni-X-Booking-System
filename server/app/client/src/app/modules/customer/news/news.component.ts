import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppbarAction} from "../../../shared/components/appbars/nested-appbar/appbar.action";
import {ApiService} from "../../../core/api.service";
import {News} from "../../../shared/models/news";
import {SharingService} from "../../../core/sharing.service";
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  shareAction: AppbarAction;
  newsId: string;
  news: News;

  constructor(private route: ActivatedRoute, private api: ApiService, private sharing: SharingService, private _snackBar: MatSnackBar) {
    let newsContext = this;
    this.shareAction = {
      id: "0",
      name: "Condividi",
      execute: function () {
        let sharingApiAvailable = sharing.shareNews(newsContext.news.title, newsContext.news._id);
        let snackbarText = "Link all'articolo salvato negli appunti!";

        if (sharingApiAvailable) {
          snackbarText = "Condivisione in corso...";
        }

        _snackBar.open(snackbarText, null, {duration: 4000 });
      },
      icon: 'share-variant-outline',
      isMdi: true,
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.newsId = params.id;
      this.api.getNews(this.newsId).subscribe(news => {
        this.news = news;
      });
    });
  }
}
