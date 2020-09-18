import {HomeCardModel} from "../../shared/models/home-card.model";

export const homeCardsMock: HomeCardModel[] = [
  {
    id: "0",
    orderingIndex: -1,
    title: "La tua spiaggia, a portata di click!",
    description: "Benvenuto nella web app ufficiale dello stabilimento balneare Bagni X! Questa ti dà la possibilità di prenotare il tuo ombrellone direttamente online. Non vediamo l’ora di iniziare!",
    isMainCard: true,
    imageUrl: "assets/fake-backend/main-card.jpg"
  },
  {
    id: "1",
    orderingIndex: 0,
    title: "Il nostro stabilimento",
    description: "Bagni X dispone di 84 ombrelloni prenotabili online, lungo tutta la stagione estiva, che va dal 1 giugno al 16 settembre. Per maggiori informazioni, puoi contattarci telefonicamente o con Whatsapp al numero 000-0000000, o via mail a info@bagnix.com",
    isMainCard: false,
    imageUrl: "assets/fake-backend/home-card-1.jpg"
  },
  {
    id: "2",
    orderingIndex: 1,
    title: "Immersi nella città di Senigallia",
    description: "Senigallia è un comune italiano di 44 659 abitanti della provincia di Ancona nelle Marche. È una nota località turistica. La zona di Senigallia costituisce il confine linguistico fra le lingue gallo-italiche e i dialetti italiani mediani.",
    isMainCard: false,
    imageUrl: "assets/fake-backend/home-card-2.jpg"
  },
  {
    id: "3",
    orderingIndex: 2,
    title: "Dove siamo?",
    description: "Lo stabilimento si trova nel Lungomare Mameli n.12, a Senigallia (AN), a pochi metri dalla stazione, e raggiungibile in auto. I parcheggi sono a pagamento.",
    isMainCard: true,
    imageUrl: "assets/fake-backend/home-card-3.jpg"
  }
];
