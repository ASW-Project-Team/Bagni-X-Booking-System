import { Component, OnInit } from '@angular/core';
import {HomeCard} from "../../../model/home.card";
import {Service} from "../../../model/service";
import {RankUmbrella} from "../../../model/rank.umbrella";
import {ApiService} from "../../../services/api/api.service";
import {News} from "../../../model/news";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  feed: News[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getFeed().subscribe(data => {
      this.feed = data.feed;
    });
  }

}
