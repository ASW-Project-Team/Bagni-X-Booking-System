export interface SalableItemModel {
  calculatePrice: (dateFrom: Date, dateTo: Date) => number;
}
