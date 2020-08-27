import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../core/api/api.service";
import {News} from "../../../shared/models/news.model";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsFeed: News[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllNews().subscribe(data => {
      this.newsFeed = data;
    });
  }
}
