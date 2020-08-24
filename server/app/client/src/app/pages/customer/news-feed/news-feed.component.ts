import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../core/api.service";
import {News} from "../../../shared/models/news.model";

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {
  feed: News[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getFeed().subscribe(data => {
      this.feed = data.feed;
    });
  }
}
