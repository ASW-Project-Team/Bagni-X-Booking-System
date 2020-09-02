import {Service} from "./service.model";
import {RankUmbrella} from "./rank-umbrella.model";

export interface AvailabilityData {
  services: Service[];
  rankUmbrellas: RankUmbrella[];
}
