import {Sale, SaleModel} from "./sale.model";
import {DateUtils} from "../utils/date.utils";

export interface RankUmbrellaModel {
  id?: string;
  rankUmbrellaId?: string;
  imageUrl: string;
  name: string;
  description: string;
  dailyPrice: number;
  fromUmbrella: number;
  toUmbrella: number;
  sales: SaleModel[];
}

export class RankUmbrella implements RankUmbrellaModel {
  id: string;
  rankUmbrellaId: string;
  description: string;
  fromUmbrella: number;
  imageUrl: string;
  name: string;
  dailyPrice: number;
  sales: Sale[];
  toUmbrella: number;

  constructor(model: RankUmbrellaModel) {
    this.id = model.id;
    this.rankUmbrellaId = model.rankUmbrellaId;
    this.description = model.description;
    this.fromUmbrella = model.fromUmbrella;
    this.toUmbrella = model.toUmbrella;
    this.imageUrl = model.imageUrl;
    this.name = model.name;
    this.dailyPrice = model.dailyPrice;
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
    let biggerSaleAmount: number;
    let saledDays: number;

    const salesOnPeriod = this.sales
      .filter(sale => sale.onPeriod(dateFrom, dateTo));

    if (salesOnPeriod.length > 0) {
      biggerSaleAmount = salesOnPeriod.map(currSale => {
        const saleDateFrom = dateFrom.getTime() <= currSale.dateFrom.getTime() ? currSale.dateFrom : dateFrom;
        const saleDateTo = dateTo.getTime() <= currSale.dateTo.getTime() ? dateTo : currSale.dateTo;
        saledDays = DateUtils.getBookingDays(saleDateFrom, saleDateTo);
        return saledDays * this.dailyPrice * (1 - currSale.percent)

      }).reduce((prevAmount, currAmount) => {
        return prevAmount >= currAmount ? prevAmount : currAmount;
      });
    }

    if (biggerSaleAmount && saledDays) {
      total += biggerSaleAmount;
      unsaledDays -= saledDays;
    }

    total += unsaledDays * this.dailyPrice;
    return total;
  }
}
