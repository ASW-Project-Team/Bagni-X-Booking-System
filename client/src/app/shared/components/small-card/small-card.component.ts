import {Component, Input, OnInit} from '@angular/core';
import {News} from "../../models/news.model";

/**
 * Card that represente a news from the feed.
 */

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.scss']
})
export class SmallCardComponent implements OnInit {
  @Input() imageUrl: string;
  @Input() title: string;
  @Input() date: Date;
  @Input() description: string;
  @Input() isLastCard: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
