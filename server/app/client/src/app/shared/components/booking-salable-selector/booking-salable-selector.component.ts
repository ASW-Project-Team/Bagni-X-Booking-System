import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SaleCardModel} from "../../models/component-specific/sale-card.model";
import {SalableModel} from "../../models/component-specific/salable.model";

@Component({
  selector: 'app-booking-salable-selector',
  templateUrl: './booking-salable-selector.component.html',
  styleUrls: ['./booking-salable-selector.component.scss']
})
export class BookingSalableSelectorComponent implements OnInit {
  @Input() cardContent: SaleCardModel;
  @Input() isLastCard: boolean = false;

  @Input() bookingStartDate: Date;
  @Input() bookingEndDate: Date;

  @Input() limitedItems: SalableModel[];
  @Input() unlimitedItem: SalableModel;
  @Input() price: number;

  @Output() insertItem = new EventEmitter<SalableModel>();
  @Output() removeItem = new EventEmitter<SalableModel>();

  availableItems: SalableModel[] = [];
  cartedItems: SalableModel[] = [];

  constructor() { }

  ngOnInit(): void {
    if (this.areItemsLimited()) {
      this.availableItems = this.limitedItems.slice();
    }
  }


  getMaxQuantity(): number {
    if(this.areItemsLimited()) {
      return this.limitedItems.length;
    } else {
      return 10;
    }
  }


  incrementItem() {
    let item;
    if (this.areItemsLimited()) {
      item = this.availableItems.pop();

    } else {
      item = this.unlimitedItem;
    }

    this.cartedItems.push(item);
    this.insertItem.emit(item);
  }


  decrementItem() {
    let item = this.cartedItems.pop();
    if (this.areItemsLimited()) {
      this.availableItems.push(item);
    }

    this.removeItem.emit(item)
  }


  private areItemsLimited(): boolean {
    return this.areItemsLimited && !this.unlimitedItem;
  }
}
