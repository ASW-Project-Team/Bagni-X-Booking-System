import {Component, Input, OnInit} from '@angular/core';
import {News} from "../../models/news.model";

/**
 * Card that represente a news from the feed.
 */

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  @Input() news: News;
  @Input() isLastCard: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
