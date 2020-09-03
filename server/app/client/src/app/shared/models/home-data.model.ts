import {HomeCard} from "./home-card.model";
import {ServiceModel} from "./service.model";
import {RankUmbrellaModel} from "./rank-umbrella.model";

export interface HomeData {
  mainCard: HomeCard;
  homeCards: HomeCard[];
  services: ServiceModel[];
  rankUmbrellas: RankUmbrellaModel[];
}
