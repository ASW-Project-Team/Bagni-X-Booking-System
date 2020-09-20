import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.scss']
})
export class QuantitySelectorComponent implements OnInit {
  @Input() maxQuantity: number = 10;
  @Output() incrementQuantity = new EventEmitter<number>();
  @Output() decrementQuantity = new EventEmitter<number>();
  @Output() disableParentRipple = new EventEmitter<boolean>();

  quantity = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onIncrement() {
    if (this.quantity <  this.maxQuantity) {
      this.quantity++;
      this.incrementQuantity.emit(this.quantity);
    }
  }

  onDecrement() {
    if (this.quantity > 0) {
      this.quantity--;
      this.decrementQuantity.emit(this.quantity);
    }
  }
}
