import {RankUmbrella, RankUmbrellaModel} from "./rank-umbrella.model";
import {SalableItemModel} from "./salable.model";

export interface UmbrellaModel {
  number: number,
  rankUmbrella?: RankUmbrellaModel,
  rankUmbrellaId?: string,
}


export class Umbrella implements UmbrellaModel, SalableItemModel {
  number: number;
  rankUmbrella: RankUmbrella;
  rankUmbrellaId: string;

  constructor(model: UmbrellaModel) {
    this.number = model.number;
    this.rankUmbrella = model.rankUmbrella ? new RankUmbrella(model.rankUmbrella) : undefined;
    this.rankUmbrellaId = model.rankUmbrellaId;
  }


  generateBookableClone(rank: RankUmbrellaModel): Umbrella {
    return new Umbrella({
      number: this.number,
      rankUmbrella: new RankUmbrella({
        rankUmbrellaId: rank.id,
        imageUrl: rank.imageUrl,
        name: rank.name,
        description: rank.description,
        dailyPrice: rank.dailyPrice,
        fromUmbrella: rank.fromUmbrella,
        toUmbrella: rank.toUmbrella,
        sales: rank.sales
      })
    });
  }


  getTitle(): string {
    let title = "Ombrellone n." + this.number;
    if (this.isBookable()) {
      title += ", " + this.rankUmbrella.name;
    }
    return title;
  }


  calculatePrice(dateFrom: Date, dateTo: Date): number {
    if (this.isBookable()) {
      return this.rankUmbrella.calculatePrice(dateFrom, dateTo);
    } else {
      return -1;
    }
  }


  isBookable(): boolean {
    return !!this.rankUmbrella && !!!this.rankUmbrellaId;
  }
}
