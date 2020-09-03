import {ServiceModel} from "./service.model";
import {RankUmbrellaModel} from "./rank-umbrella.model";

export interface AvailabilityData {
  services: ServiceModel[];
  rankUmbrellas: RankUmbrellaModel[];
}
