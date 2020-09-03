import {SaleCardModel} from "./component-specific/sale-card.model";
import {RankUmbrellaModel} from "./rank-umbrella.model";

export interface ServiceModel {
  _id: any;
  price: number;
  image: string;
  title: string;
  umbrellaRelated: boolean;
  description: string;
}

export class Service implements ServiceModel, SaleCardModel {
  _id: any;
  description: string;
  image: string;
  price: number;
  title: string;
  umbrellaRelated: boolean;

  constructor(model: ServiceModel) {
    this._id = model._id;
    this.description = model.description;
    this.image = model.image;
    this.title = model.title;
    this.umbrellaRelated = model.umbrellaRelated;
    this.description = model.description;
    this.price = model.price;
  }

  get imageUrl(): string {
    return this.image;
  }

  isOnSale(): boolean {
    return false;
  }
}
