import {ServiceModel} from "../../shared/models/service.model";

export const servicesMock: ServiceModel[] = [
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
]
