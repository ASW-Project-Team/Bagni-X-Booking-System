import {RankUmbrella, RankUmbrellaModel} from "./rank-umbrella.model";
import {SalableModel} from "./component-specific/salable.model";

export interface UmbrellaModel {
  id: string,
  number: number,
  rank?: RankUmbrellaModel,
  rankId?: string,
}


export class Umbrella implements UmbrellaModel, SalableModel {
  id: string;
  number: number;
  rank: RankUmbrella;
  rankId: string;


  constructor(model: UmbrellaModel) {
    this.id = model.id;
    this.number = model.number;
    this.rank = model.rank ? new RankUmbrella(model.rank) : undefined;
    this.rankId = model.rankId;
  }


  generateBookableClone(rank: RankUmbrellaModel): Umbrella {
    return new Umbrella({
      id: this.id,
      number: this.number,
      rank: new RankUmbrella({
        _id: rank._id,
        image: rank.image,
        name: rank.name,
        description: rank.description,
        price: rank.price,
        fromUmbrella: rank.fromUmbrella,
        toUmbrella: rank.toUmbrella,
        sales: rank.sales
      })
    });
  }


  getTitle(): string {
    let title = "Ombrellone n." + this.number;
    if (this.isBookable()) {
      title += ", " + this.rank.name;
    }
    return title;
  }


  calculatePrice(dateFrom: Date, dateTo: Date): number {
    if (this.isBookable()) {
      return this.rank.calculatePrice(dateFrom, dateTo);
    } else {
      return -1;
    }
  }


  isBookable(): boolean {
    return !!this.rank && !!!this.rankId;
  }
}
