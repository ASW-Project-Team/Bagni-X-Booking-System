import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SalableItemModel} from "../../../../../../shared/models/salable.model";
import {PeriodStepComponent} from "../../period-step/period-step.component";
import {QuantitySelectorComponent} from "./quantity-selector/quantity-selector.component";

@Component({
  selector: 'app-salable-picker',
  templateUrl: './salable-picker.component.html',
  styleUrls: ['./salable-picker.component.scss']
})
export class SalablePickerComponent implements OnInit {
  @Input() imageUrl: string;
  @Input() title: string;
  @Input() description: string;
  @Input() price: number;
  @Input() isOnSale: boolean = false;
  @Input() isLastCard: boolean = false;

  @Input() limitedItems: SalableItemModel[];
  @Input() unlimitedItem: SalableItemModel;

  @Output() insertItem = new EventEmitter<SalableItemModel>();
  @Output() removeItem = new EventEmitter<SalableItemModel>();

  @ViewChild('qtSelector') qtSelector: QuantitySelectorComponent;

  private availableItems: SalableItemModel[] = [];
  private cartedItems: SalableItemModel[] = [];

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

  forceIncrementItem() {
    this.qtSelector.onIncrement();
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
