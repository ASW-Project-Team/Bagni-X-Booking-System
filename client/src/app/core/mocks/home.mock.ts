import {HomeData} from "../../shared/models/http-responses/home-data.model";
import {homeCardsMock} from "./home-cards-model";
import {servicesMock} from "./services.mock";
import {rankUmbrellasMock} from "./rank-umbrellas.mock";

export const homeMock: HomeData = {
  mainCard: homeCardsMock[0],
  homeCards: homeCardsMock.filter(((value, index) => index != 0)),
  rankUmbrellas: rankUmbrellasMock,
  services: servicesMock,
};
