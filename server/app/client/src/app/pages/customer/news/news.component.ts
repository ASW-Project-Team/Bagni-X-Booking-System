import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../core/api/api.service";
import {News, NewsModel} from "../../../shared/models/news.model";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsFeed: News[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllNews().subscribe(data => {
      const newsData = data as NewsModel[];
      this.newsFeed = newsData.map(model => new News(model));
    });
  }
}
