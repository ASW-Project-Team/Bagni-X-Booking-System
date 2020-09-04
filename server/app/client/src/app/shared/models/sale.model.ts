export interface SaleModel {
  _id: any;
  percent: number,
  dateFrom: Date,
  dateTo: Date,
}

export class Sale implements SaleModel {
  _id: any;
  dateFrom: Date;
  dateTo: Date;
  percent: number;

  constructor(model: SaleModel) {
    this._id = model._id;
    this.dateFrom = model.dateFrom;
    this.dateTo = model.dateTo;
    this.percent = model.percent;
  }

  onPeriod(dateFrom: Date, dateTo: Date): boolean {
    return this.dateFrom.getTime() <= dateTo.getTime() &&
      this.dateTo.getTime() >= dateFrom.getTime();
  }
}
