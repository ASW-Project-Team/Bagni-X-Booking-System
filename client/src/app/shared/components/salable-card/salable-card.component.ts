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
  @Input() notClickable: boolean = false;
  @Input() imageUrl: string;
  @Input() title: string;
  @Input() description: string;
  @Input() price: string;
  @Input() moreInfo: string;
  @Input() onSale: boolean = false;
  @Input() isLastCard: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
