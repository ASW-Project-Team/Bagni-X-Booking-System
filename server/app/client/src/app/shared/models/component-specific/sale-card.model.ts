export interface SaleCardModel {
  title: string,
  description: string,
  price: number,
  imageUrl: string
  isOnSale: (dateFrom: Date, dateTo: Date) => boolean
}
