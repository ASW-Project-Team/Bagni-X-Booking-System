import {RankUmbrellaModel} from "./rank-umbrella.model";
import {SalableModel} from "./component-specific/salable.model";

export interface UmbrellaModel {
  id: string,
  number: number,
  rank?: RankUmbrellaModel
}

export class Umbrella implements UmbrellaModel, SalableModel {
  id: string;
  number: number;
  rank: RankUmbrellaModel;

  constructor(model: UmbrellaModel) {
    this.id = model.id;
    this.number = model.number;
    this.rank = model.rank;
  }

  setBookable(rank: RankUmbrellaModel): Umbrella {
    this.rank = {
      _id: rank._id,
      image: rank.image,
      name: rank.name,
      description: rank.description,
      price: rank.price,
      fromUmbrella: rank.fromUmbrella,
      toUmbrella: rank.toUmbrella,
      sales: rank.sales
    }
    return this;
  }
}
