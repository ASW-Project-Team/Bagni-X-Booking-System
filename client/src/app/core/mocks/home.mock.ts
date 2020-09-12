import {HomeData} from "../../shared/models/http-responses/home-data.model";

export const homeMock: HomeData = {
  mainCard: {
    id: "1",
    orderingIndex: -1,
    title: "La tua spiaggia, a portata di click!",
    description: "Benvenuto nella web app ufficiale dello stabilimento balneare Bagni X! Questa ti dà la possibilità di prenotare il tuo ombrellone direttamente online. Non vediamo l’ora di iniziare!",
    isMainCard: true,
    imageUrl: "assets/main-card.jpg"
  },

  homeCards: [
    {
      id: "1",
      orderingIndex: 0,
      title: "Il nostro stabilimento",
      description: "Bagni X dispone di 84 ombrelloni prenotabili online, lungo tutta la stagione estiva, che va dal 1 giugno al 16 settembre. Per maggiori informazioni, puoi contattarci telefonicamente o con Whatsapp al numero 000-0000000, o via mail a info@bagnix.com",
      isMainCard: false,
      imageUrl: "assets/home-card-1.jpg"
    },
    {
      id: "2",
      orderingIndex: 1,
      title: "Immersi nella città di Senigallia",
      description: "Senigallia è un comune italiano di 44 659 abitanti della provincia di Ancona nelle Marche. È una nota località turistica. La zona di Senigallia costituisce il confine linguistico fra le lingue gallo-italiche e i dialetti italiani mediani.",
      isMainCard: false,
      imageUrl: "assets/home-card-2.jpg"
    },
    {
      id: "3",
      orderingIndex: 2,
      title: "Dove siamo?",
      description: "Lo stabilimento si trova nel Lungomare Mameli n.12, a Senigallia (AN), a pochi metri dalla stazione, e raggiungibile in auto. I parcheggi sono a pagamento.",
      isMainCard: true,
      imageUrl: "assets/home-card-3.jpg"
    }
  ],

  rankUmbrellas: [
    {
      id: "0",
      imageUrl: "assets/home-card-1.jpg",
      name: "Ombrellone prima fila",
      description: "Gli ombrelloni dall’1 al 20 sono di prima classe, e si affacciano direttamente sul mare.",
      dailyPrice: 20.12,
      fromUmbrella: 1,
      toUmbrella: 20,
      sales: [
        {
          percent: 0.20,
          dateFrom: new Date("2020-08-16"),
          dateTo: new Date("2020-08-18"),
        }
      ]
    },
    {
      id: "1",
      imageUrl: "assets/home-card-1.jpg",
      name: "Ombrellone seconda fila",
      description: "Gli ombrelloni dall’21 al 40 sono di prima classe, e si affacciano direttamente sul mare.",
      dailyPrice: 16.12,
      fromUmbrella: 21,
      toUmbrella: 40,
      sales: []
    },
    {
      id: "2",
      imageUrl: "assets/home-card-1.jpg",
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
      ]
    }
  ],

  services: [
    {
      id: "0",
      dailyPrice: 2,
      imageUrl: "assets/home-card-1.jpg",
      name: "Lettino deluxe",
      description: "Tra le tipologie di lettino offerte, questa è quella super.",
    },
    {
      id: "1",
      dailyPrice: 3,
      imageUrl: "assets/home-card-1.jpg",
      name: "Cabina",
      description: "Con un piccolo supplemento puoi aggiungere una cabina personale alla prenotazione.",
    },
    {
      id: "2",
      dailyPrice: 0,
      imageUrl: "assets/home-card-1.jpg",
      name: "Campo da beach volley",
      description: "Gli utenti possono accedere gratuitamente al nostro campo da beach volley.",
    }
  ],
};
