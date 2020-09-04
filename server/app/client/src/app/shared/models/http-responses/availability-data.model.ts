import {ServiceModel} from "../service.model";
import {RankUmbrellaModel} from "../rank-umbrella.model";
import {UmbrellaModel} from "../umbrella.model";

export interface AvailabilityData {
  services: ServiceModel[];
  availableUmbrellas: UmbrellaModel[];
  rankUmbrellas: RankUmbrellaModel[];
}
