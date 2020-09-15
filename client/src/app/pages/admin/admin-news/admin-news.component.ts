import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../core/api/api.service";
import {News} from "../../../shared/models/news.model";

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent implements OnInit {
  newsFeed: News[];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getAllNews().subscribe(data => {
      this.newsFeed = data.map(model => new News(model));
    });
  }
}
