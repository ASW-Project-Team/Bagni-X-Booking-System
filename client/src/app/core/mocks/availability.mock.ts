import {AvailabilityData} from "../../shared/models/http-responses/availability-data.model";
import {rankUmbrellasMock} from "./rank-umbrellas.mock";
import {servicesMock} from "./services.mock";

export const availabilityMock: AvailabilityData = {
  availableUmbrellas: [
    {
      number: 1,
      rankUmbrellaId: "0",
    },
    {
      number: 2,
      rankUmbrellaId: "0",
    },
    {
      number: 3,
      rankUmbrellaId: "0",
    },
    {
      number: 14,
      rankUmbrellaId: "1",
    },
    {
      number: 15,
      rankUmbrellaId: "1",
    },
    {
      number: 16,
      rankUmbrellaId: "1",
    },
    {
      number: 27,
      rankUmbrellaId: "2",
    },
    {
      number: 28,
      rankUmbrellaId: "2",
    },
    {
      number: 29,
      rankUmbrellaId: "2",
    },
  ],
  rankUmbrellas: rankUmbrellasMock,
  services: servicesMock,
};
