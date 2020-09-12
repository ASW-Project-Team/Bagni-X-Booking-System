import {BookingModel} from "../../shared/models/booking.model";

export const bookingsMock: BookingModel[] = [
  {
    id: "0",
    customerId: "0123",
    confirmed: true,
    cancelled: false,
    price: 120.25,
    dateFrom: new Date(2020,6,10),
    dateTo: new Date(2020,7,15),
    umbrellas: [
      {
        number: 10,
        rankUmbrella: {
          rankUmbrellaId: "0",
          imageUrl: "assets/home-card-1.jpg",
          name: "Prima fila",
          description: "Ombrelloni in prima fila i più belli.",
          dailyPrice: 12,
          fromUmbrella: 1,
          toUmbrella: 20,
          sales: [
            {
              percent: 0.20,
              dateFrom: new Date("2020-08-16"),
              dateTo: new Date("2020-08-18"),
            }
          ]
        }
      }
    ],
    services: [
      {
        serviceId: "0",
        dailyPrice: 2,
        imageUrl: "assets/home-card-1.jpg",
        name: "Lettino deluxe",
        description: "Tra le tipologie di lettino offerte, questa è quella super.",
      },
      {
        serviceId: "1",
        dailyPrice: 3,
        imageUrl: "assets/home-card-1.jpg",
        name: "Cabina",
        description: "Con un piccolo supplemento puoi aggiungere una cabina personale alla prenotazione.",
      },
    ],
  },
  {
    id: "1",
    customerId: "0123",
    confirmed: true,
    cancelled: false,
    price: 120.25,
    dateFrom: new Date(2020,7,10),
    dateTo: new Date(2020,9,15),
    umbrellas: [
      {
        number: 10,
        rankUmbrella: {
          rankUmbrellaId: "0",
          imageUrl: "assets/home-card-1.jpg",
          name: "Prima fila",
          description: "Ombrelloni in prima fila i più belli.",
          dailyPrice: 12,
          fromUmbrella: 1,
          toUmbrella: 20,
          sales: [
            {
              percent: 0.20,
              dateFrom: new Date(2020,8,16),
              dateTo: new Date(2020,8,18),
            }
          ]
        }
      },
      {
        number: 22,
        rankUmbrella: {
          rankUmbrellaId: "0",
          imageUrl: "assets/home-card-2.jpg",
          name: "Seconda fila",
          description: "Ombrelloni in prima fila i più belli.",
          dailyPrice: 13.50,
          fromUmbrella: 10,
          toUmbrella: 20,
          sales: [
            {
              percent: 0.20,
              dateFrom: new Date("2020-08-16"),
              dateTo: new Date("2020-08-18"),
            }
          ]
        }
      }
    ],
    services: [
      {
        serviceId: "0",
        dailyPrice: 2,
        imageUrl: "assets/home-card-1.jpg",
        name: "Lettino deluxe",
        description: "Tra le tipologie di lettino offerte, questa è quella super.",
      },
    ],
  }
];
