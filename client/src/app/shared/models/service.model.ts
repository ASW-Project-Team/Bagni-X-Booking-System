import {DateUtils} from "../utils/date.utils";
import {SalableItemModel} from "./salable.model";
import {RankUmbrella, RankUmbrellaModel} from "./rank-umbrella.model";

export interface ServiceModel {
  id?: string;
  dailyPrice: number;
  imageUrl: string;
  name: string;
  description: string;
  serviceId?: string;
}

export class Service implements ServiceModel, SalableItemModel {
  id?: string;
  description: string;
  imageUrl: string;
  dailyPrice: number;
  name: string;
  serviceId?: string;

  constructor(model: ServiceModel) {
    this.id = model.id;
    this.description = model.description;
    this.imageUrl = model.imageUrl;
    this.name = model.name;
    this.dailyPrice = model.dailyPrice;
    this.serviceId = model.serviceId;
  }

  generateBookableClone(): Service {
    return new Service({
      serviceId: this.id,
      description: this.description,
      imageUrl: this.imageUrl,
      name: this.name,
      dailyPrice: this.dailyPrice
    });
  }

  calculatePrice(dateFrom: Date, dateTo: Date): number {
    return DateUtils.getBookingDays(dateFrom, dateTo) * this.dailyPrice;
  }
}
