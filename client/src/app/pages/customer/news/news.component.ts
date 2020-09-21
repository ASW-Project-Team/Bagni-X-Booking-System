import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../core/api/api.service";
import {News} from "../../../shared/models/news.model";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsFeed: News[];
  totalItems: number = 100;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.updateNewsPage();
  }

  changePage($event: PageEvent) {
    this.updateNewsPage($event.pageIndex - 1);
  }

  updateNewsPage(page: number = 0) {
    this.newsFeed = undefined;
    this.apiService.getAllNews(page).subscribe(data => {
      this.newsFeed = data.map(model => new News(model));

      if (this.newsFeed.length < 10) {
        this.totalItems = (page) * 10 + this.newsFeed.length;
      }
    });
  }
}
