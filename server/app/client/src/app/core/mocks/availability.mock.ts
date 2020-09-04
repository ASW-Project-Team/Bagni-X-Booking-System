import {AvailabilityData} from "../../shared/models/http-responses/availability-data.model";

export const availabilityMock: AvailabilityData = {
  availableUmbrellas: [
    {
      id: "1",
      number: 1,
      rankId: "0",
    },
    {
      id: "2",
      number: 2,
      rankId: "0",
    },
    {
      id: "3",
      number: 3,
      rankId: "0",
    },
    {
      id: "14",
      number: 14,
      rankId: "1",
    },
    {
      id: "15",
      number: 15,
      rankId: "1",
    },
    {
      id: "16",
      number: 16,
      rankId: "1",
    },
    {
      id: "27",
      number: 27,
      rankId: "2",
    },
    {
      id: "28",
      number: 28,
      rankId: "2",
    },
    {
      id: "29",
      number: 29,
      rankId: "2",
    },
  ],
  rankUmbrellas: [
    {
      _id: "0",
      image: "/assets/home-card-1.jpg",
      name: "Ombrellone prima fila",
      description: "Gli ombrelloni dall’1 al 20 sono di prima classe, e si affacciano direttamente sul mare.",
      price: 20.12,
      fromUmbrella: 1,
      toUmbrella: 20,
      sales: [
        {
          _id: "0",
          percent: 20,
          dateFrom: new Date("2020-08-16"),
          dateTo: new Date("2020-10-18"),
        }
      ],
    },

    {
      _id: "1",
      image: "/assets/home-card-1.jpg",
      name: "Ombrellone seconda fila",
      description: "Gli ombrelloni dall’21 al 40 sono di prima classe, e si affacciano direttamente sul mare.",
      price: 16.12,
      fromUmbrella: 21,
      toUmbrella: 40,
      sales: [],
    },
    {
      _id: "2",
      image: "/assets/home-card-1.jpg",
      name: "Ombrellone seconda fila",
      description: "Gli ombrelloni dall’41 al 60 sono di prima classe, e si affacciano direttamente sul mare.",
      price: 20.12,
      fromUmbrella: 41,
      toUmbrella: 60,
      sales: [
        {
          _id: "0",
          percent: 20,
          dateFrom: new Date("2020-08-16"),
          dateTo: new Date("2020-08-18"),
        }
      ],
    }
  ],

  services: [
    {
      _id: "0",
      price: 2,
      image: "/assets/home-card-1.jpg",
      title: "Lettino deluxe",
      umbrellaRelated: true,
      description: "Tra le tipologie di lettino offerte, questa è quella super.",
    },
    {
      _id: "1",
      price: 3,
      image: "/assets/home-card-1.jpg",
      title: "Cabina",
      umbrellaRelated: true,
      description: "Con un piccolo supplemento puoi aggiungere una cabina personale alla prenotazione.",
    },
    {
      _id: "2",
      price: 0,
      image: "/assets/home-card-1.jpg",
      title: "Campo da beach volley",
      umbrellaRelated: false,
      description: "Gli utenti possono accedere gratuitamente al nostro campo da beach volley.",
    }
  ],
};
