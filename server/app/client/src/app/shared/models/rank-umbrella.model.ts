import {Sale, SaleModel} from "./sale.model";
import {DateUtils} from "../utils/date.utils";

export interface RankUmbrellaModel {
  _id: any;
  image: string;
  name: string;
  description: string;
  price: number;
  fromUmbrella: number;
  toUmbrella: number;
  sales: SaleModel[];
}

export class RankUmbrella implements RankUmbrellaModel {
  _id: any;
  description: string;
  fromUmbrella: number;
  image: string;
  name: string;
  price: number;
  sales: Sale[];
  toUmbrella: number;

  constructor(model: RankUmbrellaModel) {
    this._id = model._id;
    this.description = model.description;
    this.fromUmbrella = model.fromUmbrella;
    this.toUmbrella = model.toUmbrella;
    this.image = model.image;
    this.name = model.name;
    this.price = model.price;
    this.sales = model.sales.map(model => new Sale(model));
  }


  onSaleDuringPeriod(dateFrom: Date, dateTo: Date): boolean {
    let onSaleDuringPeriod = false;
    this.sales.forEach(sale => {
      if (sale.onPeriod(dateFrom, dateTo)) {
        onSaleDuringPeriod = true;
      }
    });
    return onSaleDuringPeriod;
  }

  calculatePrice(dateFrom: Date, dateTo: Date): number {
    const totalDays = DateUtils.getBookingDays(dateFrom, dateTo);
    let total = 0;
    let unsaledDays = totalDays;

    // applies only the bigger sale of the period, if present
    let biggerSale: Sale;

    const salesOnPeriod = this.sales
      .filter(sale => sale.onPeriod(dateFrom, dateTo));
    if (salesOnPeriod.length > 0) {
      biggerSale = salesOnPeriod.reduce((prevSale, currSale) => {
        return prevSale.percent >= currSale.percent ? prevSale : currSale
      });
    }

    if (biggerSale) {
      const saleDateFrom = dateFrom.getTime() <= biggerSale.dateFrom.getTime() ? biggerSale.dateFrom : dateFrom;
      const saleDateTo = dateTo.getTime() <= biggerSale.dateTo.getTime() ? dateTo : biggerSale.dateTo;
      const saledDays = DateUtils.getBookingDays(saleDateFrom, saleDateTo);

      total += saledDays * this.price * ((100 - biggerSale.percent) / 100);
      unsaledDays -= saledDays;
    }

    total += unsaledDays * this.price;
    return total;
  }
}
