import {AvailabilityData} from "../../shared/models/http-responses/availability-data.model";

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
  rankUmbrellas: [
    {
      id: "0",
      imageUrl: "assets/fake-backend/home-card-1.jpg",
      name: "Ombrellone prima fila",
      description: "Gli ombrelloni dall’1 al 20 sono di prima classe, e si affacciano direttamente sul mare.",
      dailyPrice: 20.12,
      fromUmbrella: 1,
      toUmbrella: 20,
      sales: [
        {
          percent: 0.20,
          dateFrom: new Date("2020-08-16"),
          dateTo: new Date("2020-10-18"),
        }
      ],
    },

    {
      id: "1",
      imageUrl: "assets/fake-backend/home-card-1.jpg",
      name: "Ombrellone seconda fila",
      description: "Gli ombrelloni dall’21 al 40 sono di prima classe, e si affacciano direttamente sul mare.",
      dailyPrice: 16.12,
      fromUmbrella: 21,
      toUmbrella: 40,
      sales: [],
    },
    {
      id: "2",
      imageUrl: "assets/fake-backend/home-card-1.jpg",
      name: "Ombrellone seconda fila",
      description: "Gli ombrelloni dall’41 al 60 sono di prima classe, e si affacciano direttamente sul mare.",
      dailyPrice: 20.12,
      fromUmbrella: 41,
      toUmbrella: 60,
      sales: [
        {
          percent: 0.20,
          dateFrom: new Date("2020-08-16"),
          dateTo: new Date("2020-08-18"),
        }
      ],
    }
  ],

  services: [
    {
      id: "0",
      dailyPrice: 2,
      imageUrl: "assets/fake-backend/home-card-1.jpg",
      name: "Lettino deluxe",
      description: "Tra le tipologie di lettino offerte, questa è quella super.",
    },
    {
      id: "1",
      dailyPrice: 3,
      imageUrl: "assets/fake-backend/home-card-1.jpg",
      name: "Cabina",
      description: "Con un piccolo supplemento puoi aggiungere una cabina personale alla prenotazione.",
    },
    {
      id: "2",
      dailyPrice: 0,
      imageUrl: "assets/fake-backend/home-card-1.jpg",
      name: "Campo da beach volley",
      description: "Gli utenti possono accedere gratuitamente al nostro campo da beach volley.",
    }
  ],
};
