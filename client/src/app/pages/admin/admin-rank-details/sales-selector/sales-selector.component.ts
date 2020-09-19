import { Component } from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {Sale} from "../../../../shared/models/sale.model";
import {ApiService} from "../../../../core/api/api.service";

@Component({
  selector: 'app-sales-selector',
  templateUrl: './sales-selector.component.html',
  styleUrls: ['./sales-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SalesSelectorComponent,
      multi: true
    }
  ]
})
export class SalesSelectorComponent implements ControlValueAccessor  {
  sales: Sale[] = [];
  onChange: Function;
  saleAdderForm: FormGroup;
  startSaleDate: Date;
  endSaleDate: Date;
  datesAvailable: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private api: ApiService) {
    this.saleAdderForm = this.formBuilder.group({
      saleDateRange: this.formBuilder.group({
        dateFrom: ['', Validators.required],
        dateTo: ['', Validators.required],
      }),
      percent: ['', Validators.required]
    });

    this.api.getSeason().subscribe(data => {
      const seasonStart = new Date(data.seasonStart);
      const seasonEnd = new Date(data.seasonEnd);
      const today = new Date();

      this.datesAvailable = seasonEnd.getTime() >= today.getTime();

      if (!this.datesAvailable) {
        this.saleAdderForm.disable();
      } else {
        this.startSaleDate = seasonStart.getTime() >= today.getTime() ? seasonStart : today;
        this.endSaleDate = seasonEnd.getTime() >= today.getTime() ? seasonEnd : today;
      }
    });
  }

  addSale() {
    if (!this.saleAdderForm.valid) {
      return;
    }

    const sale = new Sale({
      dateFrom: this.saleAdderForm.get('saleDateRange.dateFrom').value,
      dateTo: this.saleAdderForm.get('saleDateRange.dateTo').value,
      percent: this.saleAdderForm.get('percent').value / 100,
    });

    if (this.salePresent(sale)) {
      return;
    }

    this.sales.push(sale);
    this.onChange(JSON.stringify(this.sales));
  }


  private salePresent(sale: Sale): boolean {
    return this.sales.filter(currSale =>
      currSale.dateFrom.getTime() == sale.dateFrom.getTime()
      && currSale.dateTo.getTime() == sale.dateTo.getTime()
      && currSale.percent == sale.percent
    ).length > 0;
  }

  generateRemoveSaleFunction(sale: Sale) {
    return () => {
      const index = this.sales.indexOf(sale);
      if (index > -1) {
        this.sales.splice(index, 1);
      }
      this.onChange(JSON.stringify(this.sales));
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void { }

  setDisabledState(isDisabled: boolean): void { }

  writeValue(obj: any): void {
    this.sales = obj;
  }
}
