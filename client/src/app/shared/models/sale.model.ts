export interface SaleModel {
  percent: number,
  dateFrom: Date,
  dateTo: Date,
}

export class Sale implements SaleModel {
  dateFrom: Date;
  dateTo: Date;
  percent: number;

  constructor(model: SaleModel) {
    this.dateFrom = new Date(model.dateFrom);
    this.dateTo = new Date(model.dateTo);
    this.percent = model.percent;
  }

  onPeriod(dateFrom: Date, dateTo: Date): boolean {
    return this.dateFrom.getTime() <= dateTo.getTime() &&
      this.dateTo.getTime() >= dateFrom.getTime();
  }
}
