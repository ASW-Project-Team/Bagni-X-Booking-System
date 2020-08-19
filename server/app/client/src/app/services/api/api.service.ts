import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


/**
 * Service whose aim is to retrive data from the bagniX API.
 */

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }


  getHomeCards(): Observable<any> {
    // return this.http.get('https://localhost:4200/home-cards');

    // mock used for tests, waiting for real api response
    return new Observable((observer) => {
      const homeCardsMock = {
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
        ]
      };

      observer.next(homeCardsMock);

      // When the consumer unsubscribes, clean up data ready for next subscription.
      return {
        unsubscribe() {}
      };
    });
  }

  // todo ecc.
}
