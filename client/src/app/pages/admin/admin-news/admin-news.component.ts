import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../core/api/api.service";
import {News} from "../../../shared/models/news.model";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent implements OnInit {
  newsFeed: News[];
  totalItems: number = 100;


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.updateNewsPage();
  }


  changePage($event: PageEvent) {
    this.updateNewsPage($event.pageIndex - 1);
  }


  updateNewsPage(page: number = 0): void {
    this.newsFeed = undefined;
    this.api.getAllNews(page).subscribe(data => {
      this.newsFeed = data.map(model => new News(model));

      if (this.newsFeed.length < 10) {
        this.totalItems = (page) * 10 + this.newsFeed.length;
      }
    });
  }
}
