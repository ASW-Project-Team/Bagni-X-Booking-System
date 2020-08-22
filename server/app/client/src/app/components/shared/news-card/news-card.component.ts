import {Component, Input, OnInit} from '@angular/core';

/**
 * Card that represente a news from the feed.
 */

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  @Input('imageUrl') imageUrl: string;
  @Input('title') title: string;
  @Input('description') description: string;
  @Input('date') date: Date;
  @Input('last-card') lastCard: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
