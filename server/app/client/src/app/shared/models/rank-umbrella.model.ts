import {Sale} from "./sale.model";
import {Umbrella, UmbrellaModel} from "./umbrella.model";
import {SaleCardModel} from "./component-specific/sale-card.model";

export interface RankUmbrellaModel {
  _id: any;
  image: string;
  name: string;
  description: string;
  price: number;
  fromUmbrella: number;
  toUmbrella: number;
  sales: Sale[];
  availableUmbrellas?: UmbrellaModel[]
}

export class RankUmbrella implements RankUmbrellaModel, SaleCardModel {
  _id: any;
  availableUmbrellas: UmbrellaModel[];
  description: string;
  fromUmbrella: number;
  image: string;
  name: string;
  price: number;
  sales: Sale[];
  toUmbrella: number;

  constructor(model: RankUmbrellaModel) {
    this._id = model._id;
    this.availableUmbrellas = model.availableUmbrellas;
    this.description = model.description;
    this.fromUmbrella = model.fromUmbrella;
    this.toUmbrella = model.toUmbrella;
    this.image = model.image;
    this.name = model.name;
    this.price = model.price;
    this.sales = model.sales
  }

  get title(): string {
    return this.name;
  }

  get imageUrl(): string {
    return this.image;
  }

  isOnSale(dateFrom: Date, dateTo: Date): boolean {
    return this.onSaleDuringPeriod(dateFrom , dateTo);
  }

  onSaleDuringPeriod(dateFrom: Date, dateTo: Date): boolean {
    let onSaleDuringPeriod = false;
    this.sales.forEach(sale => {
        if (sale.dateFrom.getTime() <= dateTo.getTime() &&
          sale.dateTo.getTime() >= dateFrom.getTime()) {
          onSaleDuringPeriod = true;
        }
      });
    return onSaleDuringPeriod;
  }

  getBookableUmbrellas(): Umbrella[] {
    return this.availableUmbrellas.map(umbrModel => new Umbrella(umbrModel).setBookable(this));
  }
}
