import {DateUtils} from "../utils/date.utils";
import {SalableItemModel} from "./salable.model";

export interface ServiceModel {
  _id: any;
  price: number;
  image: string;
  title: string;
  umbrellaRelated: boolean;
  description: string;
}

export class Service implements ServiceModel, SalableItemModel {
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

  calculatePrice(dateFrom: Date, dateTo: Date): number {
    return DateUtils.getBookingDays(dateFrom, dateTo) * this.price;
  }
}
