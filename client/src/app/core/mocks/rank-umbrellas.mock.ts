import {RankUmbrellaModel} from "../../shared/models/rank-umbrella.model";

export const rankUmbrellasMock: RankUmbrellaModel[] = [
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
];
