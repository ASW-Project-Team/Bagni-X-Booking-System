import {HomeCard} from "./home-card.model";
import {Service} from "./service.model";
import {RankUmbrella} from "./rank-umbrella.model";

export interface HomeData {
  mainCard: HomeCard;
  homeCards: HomeCard[];
  services: Service[];
  rankUmbrellas: RankUmbrella[];
}
