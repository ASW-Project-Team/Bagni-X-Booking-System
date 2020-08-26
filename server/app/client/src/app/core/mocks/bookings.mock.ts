import {BookingModel} from "../../shared/models/booking.model";

export const bookingsMock: BookingModel[] = [
  {
    id: "0",
    userId: "0123",
    confirmed: true,
    cancelled: false,
    price: 120.25,
    dateFrom: new Date(),
    dateTo: new Date(),
    umbrellas: [
      {
        id: "0",
        number: 10,
        rank: {
          _id: "0",
          image: "/assets/home-card-1.jpg",
          name: "Prima fila",
          description: "Ombrelloni in prima fila i più belli.",
          price: 12,
          fromUmbrella: 1,
          toUmbrella: 20,
          sales: [
            {
              _id: "0",
              percent: 20,
              dateFrom: new Date("2020-08-16"),
              dateTo: new Date("2020-08-18"),
            }
          ]
        }
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
    ],
  },
  {
    id: "1",
    userId: "0123",
    confirmed: true,
    cancelled: false,
    price: 120.25,
    dateFrom: new Date(),
    dateTo: new Date(),
    umbrellas: [
      {
        id: "0",
        number: 10,
        rank: {
          _id: "0",
          image: "/assets/home-card-1.jpg",
          name: "Prima fila",
          description: "Ombrelloni in prima fila i più belli.",
          price: 12,
          fromUmbrella: 1,
          toUmbrella: 20,
          sales: [
            {
              _id: "0",
              percent: 20,
              dateFrom: new Date("2020-08-16"),
              dateTo: new Date("2020-08-18"),
            }
          ]
        }
      },
      {
        id: "1",
        number: 22,
        rank: {
          _id: "0",
          image: "/assets/home-card-2.jpg",
          name: "Seconda fila",
          description: "Ombrelloni in prima fila i più belli.",
          price: 13.50,
          fromUmbrella: 10,
          toUmbrella: 20,
          sales: [
            {
              _id: "0",
              percent: 20,
              dateFrom: new Date("2020-08-16"),
              dateTo: new Date("2020-08-18"),
            }
          ]
        }
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
    ],
  }
];

export const bookingMock: BookingModel = {
  id: "1",
  userId: "0123",
  confirmed: true,
  cancelled: false,
  price: 120.25,
  dateFrom: new Date(),
  dateTo: new Date(),
  umbrellas: [
    {
      id: "0",
      number: 10,
      rank: {
        _id: "0",
        image: "/assets/home-card-1.jpg",
        name: "Prima fila",
        description: "Ombrelloni in prima fila i più belli.",
        price: 12,
        fromUmbrella: 30,
        toUmbrella: 40,
        sales: [
          {
            _id: "0",
            percent: 20,
            dateFrom: new Date("2020-08-16"),
            dateTo: new Date("2020-08-18"),
          }
        ]
      }
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
  ],
};
