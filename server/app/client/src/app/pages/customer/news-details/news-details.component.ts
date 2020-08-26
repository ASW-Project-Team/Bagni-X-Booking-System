import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppbarAction} from "../../../shared/components/appbars/nested-appbar/appbar.action";
import {ApiService} from "../../../core/api.service";
import {News} from "../../../shared/models/news.model";
import {SharingService} from "../../../core/sharing.service";
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-news',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  shareAction: AppbarAction;
  newsId: string;
  newsTitle: string;
  downloadedNews: News;

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private sharing: SharingService,
              private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    let ctx = this;
    this.shareAction = {
      id: "0",
      name: "Condividi",
      icon: 'share-variant-outline',
      isMdi: true,
      execute: function() {
        let sharingApiAvailable = ctx.sharing.shareNews(ctx.downloadedNews);
        let snackbarText = "Link all'articolo salvato negli appunti!";

        if (sharingApiAvailable) {
          snackbarText = "Condivisione in corso...";
        }

        ctx.snackBar.open(snackbarText, null, { duration: 4000 });
      }
    }

    this.route.params.subscribe(params => {
      this.newsId = params.id;
      this.newsTitle = params.title;
      this.api.getNews(this.newsId).subscribe(news => {
        this.downloadedNews = news;
      });
    });
  }

  /**
   * Set the title to the downloaded information if available, else tries to retrive
   * information from the parameters. If the title is not already found, sets it to an empty string.
   */
  getTitleIfAvailable(): string {
    if (this.downloadedNews) {
      return this.downloadedNews.title;
    } else if (this.newsTitle) {
      return this.newsTitle;
    } else {
      return '';
    }
  }
}
