import {HomeData} from "../../shared/models/home-data.model";

export const homeMock: HomeData = {
  mainCard: {
    _id: "1",
    title: "La tua spiaggia, a portata di click!",
    description: "Benvenuto nella web app ufficiale dello stabilimento balneare Bagni X! Questa ti dà la possibilità di prenotare il tuo ombrellone direttamente online. Non vediamo l’ora di iniziare!",
    header: true,
    image: "/assets/main-card.jpg"
  },

  homeCards: [
    {
      _id: "1",
      title: "Il nostro stabilimento",
      description: "Bagni X dispone di 84 ombrelloni prenotabili online, lungo tutta la stagione estiva, che va dal 1 giugno al 16 settembre. Per maggiori informazioni, puoi contattarci telefonicamente o con Whatsapp al numero 000-0000000, o via mail a info@bagnix.com",
      header: false,
      image: "/assets/home-card-1.jpg"
    },
    {
      _id: "2",
      title: "Immersi nella città di Senigallia",
      description: "Senigallia è un comune italiano di 44 659 abitanti della provincia di Ancona nelle Marche. È una nota località turistica. La zona di Senigallia costituisce il confine linguistico fra le lingue gallo-italiche e i dialetti italiani mediani.",
      header: false,
      image: "/assets/home-card-2.jpg"
    },
    {
      _id: "3",
      title: "Dove siamo?",
      description: "Lo stabilimento si trova nel Lungomare Mameli n.12, a Senigallia (AN), a pochi metri dalla stazione, e raggiungibile in auto. I parcheggi sono a pagamento.",
      header: true,
      image: "/assets/home-card-3.jpg"
    }
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
          dateTo: new Date("2020-08-18"),
        }
      ]
    },
    {
      _id: "1",
      image: "/assets/home-card-1.jpg",
      name: "Ombrellone seconda fila",
      description: "Gli ombrelloni dall’21 al 40 sono di prima classe, e si affacciano direttamente sul mare.",
      price: 16.12,
      fromUmbrella: 21,
      toUmbrella: 40,
      sales: []
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
      ]
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
