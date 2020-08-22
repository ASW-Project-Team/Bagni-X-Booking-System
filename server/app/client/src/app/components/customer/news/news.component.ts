import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  newsId: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.newsId = params.id);
  }

  ngOnInit(): void {
  }

}
