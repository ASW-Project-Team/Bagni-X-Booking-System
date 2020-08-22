import { Component, OnInit } from '@angular/core';
import {HomeCard} from "../../../../model/home.card";
import {Service} from "../../../../model/service";
import {RankUmbrella} from "../../../../model/rank.umbrella";
import {ApiService} from "../../../../services/api/api.service";
import {News} from "../../../../model/news";
import {Router} from "@angular/router";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  feed: News[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getFeed().subscribe(data => {
      this.feed = data.feed;
    });
  }

  navigateToNews(news: News): void {
    this.router.navigate(['news', news._id]);
  }

}
