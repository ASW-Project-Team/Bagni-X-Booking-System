import {HomeCardModel} from "../home-card.model";
import {ServiceModel} from "../service.model";
import {RankUmbrellaModel} from "../rank-umbrella.model";

export interface HomeData {
  mainCard: HomeCardModel;
  homeCards: HomeCardModel[];
  services: ServiceModel[];
  rankUmbrellas: RankUmbrellaModel[];
}
