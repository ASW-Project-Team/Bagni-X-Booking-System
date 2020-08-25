import {Component, Input, OnInit} from '@angular/core';

/**
 * The salable card is an app-specific component, used to display data about ranking
 * and services. It represents in general something that can be sold.
 */

@Component({
  selector: 'app-salable-card',
  templateUrl: './salable-card.component.html',
  styleUrls: ['./salable-card.component.scss']
})
export class SalableCardComponent implements OnInit {
  @Input('imageUrl') imageUrl: string;
  @Input('title') title: string;
  @Input('description') description: string;
  @Input('price') price: string;
  @Input('more-info') moreInfo: string;
  @Input('sale') sale: boolean = false;
  @Input('last-card') isLastCard: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
