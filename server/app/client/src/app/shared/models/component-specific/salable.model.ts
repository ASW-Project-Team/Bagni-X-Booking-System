export interface SalableModel {
  calculatePrice: (dateFrom: Date, dateTo: Date) => number;
}
