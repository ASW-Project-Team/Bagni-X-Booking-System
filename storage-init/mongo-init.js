/**
 * The script is executed the first time the container starts. It initializes
 * the database, eventually creating collections.
 */
db.createUser({
  user: 'server',
  pwd: 'TheSuperServer!46',
  roles: [
    {
      role: 'readWrite',
      db: 'bagni_X_booking_system_db',
    }],
})

// Initializes collections
db.createCollection('admins');
db.createCollection('bathhouse')
db.createCollection('homeCards');
db.createCollection('bookings');
db.createCollection('customers');
db.createCollection('admins');
db.createCollection('news');
db.createCollection('rankUmbrellas');
db.createCollection('services');
db.createCollection('seasons');

// inserts initialization documents
db.admins.insert([
  {
    root: true,
    username: 'root',
    // Admin!1234
    hash: '$2b$10$nTNFPIlgeaSTYSqSHTPfL.oQ7g1D5F3g17zVoayG4kiIUQUyrDTcy',
  },
  {
    root: false,
    username: 'admin',
    // Admin!1234
    hash: '$2b$10$nTNFPIlgeaSTYSqSHTPfL.oQ7g1D5F3g17zVoayG4kiIUQUyrDTcy',
  },
])

db.customers.insert({
  name: 'Mario',
  surname: 'Rossi',
  email: 'test@test.it',
  phone: '331123456',
  address: 'Viale della Vittoria, 22',
  // Customer!1234
  hash: '$2y$10$alG9nqF3qy.Z1NjZKKbV/eRMcB.KztL2y4TPBbzld9BvrqD1M0VjK',
  deleted: false,
  registered: true,
})

db.bathhouse.insert({
  name: 'Bagni X',
  logoUrl: '/assets/default-bathhouse-img-logo.png',
  seasonStart: new Date('2020-05-15T00:00:00+0200'),
  seasonEnd: new Date('2020-09-15T00:00:00+0200'),
})

db.homeCards.insert([
  {
    isMainCard: true,
    orderingIndex: -1,
    title: 'La tua spiaggia, a portata di click!',
    description: 'Benvenuto nella web app ufficiale dello stabilimento ' +
      'balneare Bagni X! Questa ti dà la possibilità di prenotare il tuo ' +
      'ombrellone direttamente online. Non vediamo l’ora di iniziare!',
    imageUrl: 'http://localhost:3000/assets/default-main-card-img-0.jpg',
  },
  {
    isMainCard: false,
    orderingIndex: 0,
    title: 'Il nostro stabilimento',
    description: 'Bagni X dispone di 84 ombrelloni prenotabili online, ' +
      'lungo tutta la stagione estiva, che va dal 1 giugno al 16 ' +
      'settembre. Per maggiori informazioni, puoi contattarci ' +
      'telefonicamente o con Whatsapp al numero 000-0000000, o via mail ' +
      'a info@bagnix.com',
    imageUrl: 'http://localhost:3000/assets/default-home-card-img-0.jpg',
  },
  {
    isMainCard: false,
    orderingIndex: 1,
    title: 'Immersi nella città di Senigallia',
    description: 'Senigallia è un comune italiano di 44 659 abitanti della ' +
      'provincia di Ancona nelle Marche. È una nota località turistica. ' +
      'La zona di Senigallia costituisce il confine linguistico fra le ' +
      'lingue gallo-italiche e i dialetti italiani mediani.',
    imageUrl: 'http://localhost:3000/assets/default-home-card-img-1.jpg',
  },
  {
    isMainCard: false,
    orderingIndex: 2,
    title: 'Dove siamo?',
    description: 'Lo stabilimento si trova nel Lungomare Mameli n.12, a ' +
      'Senigallia (AN), a pochi metri dalla stazione, e raggiungibile in ' +
      'auto. I parcheggi sono a pagamento.',
    imageUrl: 'http://localhost:3000/assets/default-home-card-img-2.jpg',
  },
])

db.news.insert([
  {
    title: 'Una super notizia notiziona ona ona',
    article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
      'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
      'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
      'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
      'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in ' +
      'culpa qui officia deserunt mollit anim id est laborum.',
    date: new Date('2020-06-15T00:00:00+0200'),
    imageUrl: 'http://localhost:3000/assets/default-news-img-0.jpg',
  },
  {
    title: 'Un\'altra notizia niente male',
    article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
      'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
      'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
      'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
      'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in ' +
      'culpa qui officia deserunt mollit anim id est laborum.',
    date: new Date('2020-07-15T00:00:00+0200'),
    imageUrl: 'http://localhost:3000/assets/default-news-img-1.jpg',
  },
])

db.rankUmbrellas.insert([
  {
    name: 'Ombrellone prima fila',
    description: 'Gli ombrelloni dall’1 al 20 sono di prima classe, e si ' +
      'affacciano direttamente sul mare.',
    imageUrl: 'http://localhost:3000/assets/default-rank-umbrella-img-0.jpg',
    dailyPrice: 20.00,
    fromUmbrella: 1,
    toUmbrella: 20,
    sales: [],
  },
  {
    name: 'Ombrellone standard',
    description: 'Gli ombrelloni dall’21 al 40 presentano costi più contenuti.',
    imageUrl: 'http://localhost:3000/assets/default-rank-umbrella-img-1.jpg',
    dailyPrice: 16.00,
    fromUmbrella: 21,
    toUmbrella: 40,
    sales: [],
  },
]);

db.services.insert([
  {
    name: 'Cabina',
    description: 'Con un piccolo supplemento puoi aggiungere una cabina ' +
      'personale alla prenotazione.',
    imageUrl: 'http://localhost:3000/assets/default-service-img-0.jpg',
    dailyPrice: 3.00,
  },
  {
    name: 'Campo da beach volley',
    imageUrl: 'http://localhost:3000/assets/default-service-img-1.jpg',
    description: 'Gli utenti possono accedere gratuitamente al nostro campo da ' +
      'beach volley.',
    dailyPrice: 0.00,
  },
]);

db.seasons.insert({
  year: 0,
  data: [
    {
      date: new Date("2019-01-01T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-02T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-03T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-04T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-05T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-06T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-07T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-08T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-09T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-10T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-11T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-12T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-13T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-14T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-15T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-16T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-17T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-18T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-19T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-20T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-21T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-22T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-23T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-24T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-25T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-26T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-27T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-28T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-29T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-30T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-01-31T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-01T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-02T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-03T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-04T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-05T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-06T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-07T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-08T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-09T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-10T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-11T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-12T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-13T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-14T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-15T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-16T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-17T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-18T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-19T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-20T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-21T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-22T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-23T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-24T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-25T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-26T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-27T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-02-28T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-01T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-02T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-03T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-04T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-05T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-06T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-07T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-08T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-09T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-10T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-11T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-12T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-13T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-14T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-15T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-16T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-17T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-18T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-19T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-20T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-21T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-22T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-23T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-24T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-25T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-26T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-27T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-28T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-29T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-30T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-03-31T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-01T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-02T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-03T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-04T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-05T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-06T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-07T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-08T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-09T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-10T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-11T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-12T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-13T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-14T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-15T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-16T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-17T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-18T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-19T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-20T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-21T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-22T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-23T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-24T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-25T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-26T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-27T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-28T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-29T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-04-30T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-05-01T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-05-02T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-05-03T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-05-04T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-05-05T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-05-06T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-05-07T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-05-08T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-05-09T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-05-10T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-05-11T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-05-12T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-05-13T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-05-14T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-05-15T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-05-16T22:00:00.000Z"),
      percent: 0.1
    },
    {
      date: new Date("2019-05-17T22:00:00.000Z"),
      percent: 0.1
    },
    {
      date: new Date("2019-05-18T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-05-19T22:00:00.000Z"),
      percent: 0.01
    },
    {
      date: new Date("2019-05-20T22:00:00.000Z"),
      percent: 0.02
    },
    {
      date: new Date("2019-05-21T22:00:00.000Z"),
      percent: 0.05
    },
    {
      date: new Date("2019-05-22T22:00:00.000Z"),
      percent: 0.06
    },
    {
      date: new Date("2019-05-23T22:00:00.000Z"),
      percent: 0.09
    },
    {
      date: new Date("2019-05-24T22:00:00.000Z"),
      percent: 0.08
    },
    {
      date: new Date("2019-05-25T22:00:00.000Z"),
      percent: 0.08
    },
    {
      date: new Date("2019-05-26T22:00:00.000Z"),
      percent: 0.10
    },
    {
      date: new Date("2019-05-27T22:00:00.000Z"),
      percent: 0.08
    },
    {
      date: new Date("2019-05-28T22:00:00.000Z"),
      percent: 0.09
    },
    {
      date: new Date("2019-05-29T22:00:00.000Z"),
      percent: 0.08
    },
    {
      date: new Date("2019-05-30T22:00:00.000Z"),
      percent: 0.09
    },
    {
      date: new Date("2019-05-31T22:00:00.000Z"),
      percent: 0.08
    },
    {
      date: new Date("2019-06-01T22:00:00.000Z"),
      percent: 0.09
    },
    {
      date: new Date("2019-06-02T22:00:00.000Z"),
      percent: 0.07
    },
    {
      date: new Date("2019-06-03T22:00:00.000Z"),
      percent: 0.08
    },
    {
      date: new Date("2019-06-04T22:00:00.000Z"),
      percent: 0.12
    },
    {
      date: new Date("2019-06-05T22:00:00.000Z"),
      percent: 0.14
    },
    {
      date: new Date("2019-06-06T22:00:00.000Z"),
      percent: 0.15
    },
    {
      date: new Date("2019-06-07T22:00:00.000Z"),
      percent: 0.14
    },
    {
      date: new Date("2019-06-08T22:00:00.000Z"),
      percent: 0.16
    },
    {
      date: new Date("2019-06-09T22:00:00.000Z"),
      percent: 0.16
    },
    {
      date: new Date("2019-06-10T22:00:00.000Z"),
      percent: 0.18
    },
    {
      date: new Date("2019-06-11T22:00:00.000Z"),
      percent: 0.20
    },
    {
      date: new Date("2019-06-12T22:00:00.000Z"),
      percent: 0.22
    },
    {
      date: new Date("2019-06-13T22:00:00.000Z"),
      percent: 0.23
    },
    {
      date: new Date("2019-06-14T22:00:00.000Z"),
      percent: 0.24
    },
    {
      date: new Date("2019-06-15T22:00:00.000Z"),
      percent: 0.24
    },
    {
      date: new Date("2019-06-16T22:00:00.000Z"),
      percent: 0.25
    },
    {
      date: new Date("2019-06-17T22:00:00.000Z"),
      percent: 0.22
    },
    {
      date: new Date("2019-06-18T22:00:00.000Z"),
      percent: 0.23
    },
    {
      date: new Date("2019-06-19T22:00:00.000Z"),
      percent: 0.22
    },
    {
      date: new Date("2019-06-20T22:00:00.000Z"),
      percent: 0.23
    },
    {
      date: new Date("2019-06-21T22:00:00.000Z"),
      percent: 0.24
    },
    {
      date: new Date("2019-06-22T22:00:00.000Z"),
      percent: 0.24
    },
    {
      date: new Date("2019-06-23T22:00:00.000Z"),
      percent: 0.27
    },
    {
      date: new Date("2019-06-24T22:00:00.000Z"),
      percent: 0.30
    },
    {
      date: new Date("2019-06-25T22:00:00.000Z"),
      percent: 0.31
    },
    {
      date: new Date("2019-06-26T22:00:00.000Z"),
      percent: 0.33
    },
    {
      date: new Date("2019-06-27T22:00:00.000Z"),
      percent: 0.32
    },
    {
      date: new Date("2019-06-28T22:00:00.000Z"),
      percent: 0.32
    },
    {
      date: new Date("2019-06-29T22:00:00.000Z"),
      percent: 0.30
    },
    {
      date: new Date("2019-06-30T22:00:00.000Z"),
      percent: 0.31
    },
    {
      date: new Date("2019-07-01T22:00:00.000Z"),
      percent: 0.33
    },
    {
      date: new Date("2019-07-02T22:00:00.000Z"),
      percent: 0.32
    },
    {
      date: new Date("2019-07-03T22:00:00.000Z"),
      percent: 0.33
    },
    {
      date: new Date("2019-07-04T22:00:00.000Z"),
      percent: 0.34
    },
    {
      date: new Date("2019-07-05T22:00:00.000Z"),
      percent: 0.36
    },
    {
      date: new Date("2019-07-06T22:00:00.000Z"),
      percent: 0.42
    },
    {
      date: new Date("2019-07-07T22:00:00.000Z"),
      percent: 0.44
    },
    {
      date: new Date("2019-07-08T22:00:00.000Z"),
      percent: 0.43
    },
    {
      date: new Date("2019-07-09T22:00:00.000Z"),
      percent: 0.42
    },
    {
      date: new Date("2019-07-10T22:00:00.000Z"),
      percent: 0.45
    },
    {
      date: new Date("2019-07-11T22:00:00.000Z"),
      percent: 0.44
    },
    {
      date: new Date("2019-07-12T22:00:00.000Z"),
      percent: 0.42
    },
    {
      date: new Date("2019-07-13T22:00:00.000Z"),
      percent: 0.43
    },
    {
      date: new Date("2019-07-14T22:00:00.000Z"),
      percent: 0.43
    },
    {
      date: new Date("2019-07-15T22:00:00.000Z"),
      percent: 0.44
    },
    {
      date: new Date("2019-07-16T22:00:00.000Z"),
      percent: 0.42
    },
    {
      date: new Date("2019-07-17T22:00:00.000Z"),
      percent: 0.42
    },
    {
      date: new Date("2019-07-18T22:00:00.000Z"),
      percent: 0.43
    },
    {
      date: new Date("2019-07-19T22:00:00.000Z"),
      percent: 0.45
    },
    {
      date: new Date("2019-07-20T22:00:00.000Z"),
      percent: 0.47
    },
    {
      date: new Date("2019-07-21T22:00:00.000Z"),
      percent: 0.51
    },
    {
      date: new Date("2019-07-22T22:00:00.000Z"),
      percent: 0.53
    },
    {
      date: new Date("2019-07-23T22:00:00.000Z"),
      percent: 0.54
    },
    {
      date: new Date("2019-07-24T22:00:00.000Z"),
      percent: 0.55
    },
    {
      date: new Date("2019-07-25T22:00:00.000Z"),
      percent: 0.55
    },
    {
      date: new Date("2019-07-26T22:00:00.000Z"),
      percent: 0.56
    },
    {
      date: new Date("2019-07-27T22:00:00.000Z"),
      percent: 0.55
    },
    {
      date: new Date("2019-07-28T22:00:00.000Z"),
      percent: 0.58
    },
    {
      date: new Date("2019-07-29T22:00:00.000Z"),
      percent: 0.60
    },
    {
      date: new Date("2019-07-30T22:00:00.000Z"),
      percent: 0.61
    },
    {
      date: new Date("2019-07-31T22:00:00.000Z"),
      percent: 0.63
    },
    {
      date: new Date("2019-08-01T22:00:00.000Z"),
      percent: 0.62
    },
    {
      date: new Date("2019-08-02T22:00:00.000Z"),
      percent: 0.63
    },
    {
      date: new Date("2019-08-03T22:00:00.000Z"),
      percent: 0.64
    },
    {
      date: new Date("2019-08-04T22:00:00.000Z"),
      percent: 0.66
    },
    {
      date: new Date("2019-08-05T22:00:00.000Z"),
      percent: 0.68
    },
    {
      date: new Date("2019-08-06T22:00:00.000Z"),
      percent: 0.69
    },
    {
      date: new Date("2019-08-07T22:00:00.000Z"),
      percent: 0.68
    },
    {
      date: new Date("2019-08-08T22:00:00.000Z"),
      percent: 0.67
    },
    {
      date: new Date("2019-08-09T22:00:00.000Z"),
      percent: 0.68
    },
    {
      date: new Date("2019-08-10T22:00:00.000Z"),
      percent: 0.69
    },
    {
      date: new Date("2019-08-11T22:00:00.000Z"),
      percent: 0.70
    },
    {
      date: new Date("2019-08-12T22:00:00.000Z"),
      percent: 0.72
    },
    {
      date: new Date("2019-08-13T22:00:00.000Z"),
      percent: 0.75
    },
    {
      date: new Date("2019-08-14T22:00:00.000Z"),
      percent: 0.78
    },
    {
      date: new Date("2019-08-15T22:00:00.000Z"),
      percent: 0.80
    },
    {
      date: new Date("2019-08-16T22:00:00.000Z"),
      percent: 0.81
    },
    {
      date: new Date("2019-08-17T22:00:00.000Z"),
      percent: 0.78
    },
    {
      date: new Date("2019-08-18T22:00:00.000Z"),
      percent: 0.76
    },
    {
      date: new Date("2019-08-19T22:00:00.000Z"),
      percent: 0.75
    },
    {
      date: new Date("2019-08-20T22:00:00.000Z"),
      percent: 0.74
    },
    {
      date: new Date("2019-08-21T22:00:00.000Z"),
      percent: 0.70
    },
    {
      date: new Date("2019-08-22T22:00:00.000Z"),
      percent: 0.68
    },
    {
      date: new Date("2019-08-23T22:00:00.000Z"),
      percent: 0.64
    },
    {
      date: new Date("2019-08-24T22:00:00.000Z"),
      percent: 0.58
    },
    {
      date: new Date("2019-08-25T22:00:00.000Z"),
      percent: 0.54
    },
    {
      date: new Date("2019-08-26T22:00:00.000Z"),
      percent: 0.51
    },
    {
      date: new Date("2019-08-27T22:00:00.000Z"),
      percent: 0.49
    },
    {
      date: new Date("2019-08-28T22:00:00.000Z"),
      percent: 0.48
    },
    {
      date: new Date("2019-08-29T22:00:00.000Z"),
      percent: 0.42
    },
    {
      date: new Date("2019-08-30T22:00:00.000Z"),
      percent: 0.38
    },
    {
      date: new Date("2019-08-31T22:00:00.000Z"),
      percent: 0.33
    },
    {
      date: new Date("2019-09-01T22:00:00.000Z"),
      percent: 0.29
    },
    {
      date: new Date("2019-09-02T22:00:00.000Z"),
      percent: 0.28
    },
    {
      date: new Date("2019-09-03T22:00:00.000Z"),
      percent: 0.28
    },
    {
      date: new Date("2019-09-04T22:00:00.000Z"),
      percent: 0.25
    },
    {
      date: new Date("2019-09-05T22:00:00.000Z"),
      percent: 0.26
    },
    {
      date: new Date("2019-09-06T22:00:00.000Z"),
      percent: 0.27
    },
    {
      date: new Date("2019-09-07T22:00:00.000Z"),
      percent: 0.26
    },
    {
      date: new Date("2019-09-08T22:00:00.000Z"),
      percent: 0.25
    },
    {
      date: new Date("2019-09-09T22:00:00.000Z"),
      percent: 0.24
    },
    {
      date: new Date("2019-09-10T22:00:00.000Z"),
      percent: 0.22
    },
    {
      date: new Date("2019-09-11T22:00:00.000Z"),
      percent: 0.22
    },
    {
      date: new Date("2019-09-12T22:00:00.000Z"),
      percent: 0.23
    },
    {
      date: new Date("2019-09-13T22:00:00.000Z"),
      percent: 0.18
    },
    {
      date: new Date("2019-09-14T22:00:00.000Z"),
      percent: 0.20
    },
    {
      date: new Date("2019-09-15T22:00:00.000Z"),
      percent: 0.17
    },
    {
      date: new Date("2019-09-16T22:00:00.000Z"),
      percent: 0.15
    },
    {
      date: new Date("2019-09-17T22:00:00.000Z"),
      percent: 0.10
    },
    {
      date: new Date("2019-09-18T22:00:00.000Z"),
      percent: 0.06
    },
    {
      date: new Date("2019-09-19T22:00:00.000Z"),
      percent: 0.04
    },
    {
      date: new Date("2019-09-20T22:00:00.000Z"),
      percent: 0.02
    },
    {
      date: new Date("2019-09-21T22:00:00.000Z"),
      percent: 0.02
    },
    {
      date: new Date("2019-09-22T22:00:00.000Z"),
      percent: 0.02
    },
    {
      date: new Date("2019-09-23T22:00:00.000Z"),
      percent: 0.01
    },
    {
      date: new Date("2019-09-24T22:00:00.000Z"),
      percent: 0.01
    },
    {
      date: new Date("2019-09-25T22:00:00.000Z"),
      percent: 0.01
    },
    {
      date: new Date("2019-09-26T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-09-27T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-09-28T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-09-29T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-09-30T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-01T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-02T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-03T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-04T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-05T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-06T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-07T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-08T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-09T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-10T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-11T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-12T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-13T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-14T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-15T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-16T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-17T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-18T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-19T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-20T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-21T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-22T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-23T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-24T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-25T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-26T22:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-27T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-28T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-29T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-30T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-10-31T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-01T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-02T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-03T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-04T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-05T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-06T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-07T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-08T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-09T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-10T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-11T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-12T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-13T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-14T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-15T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-16T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-17T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-18T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-19T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-20T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-21T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-22T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-23T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-24T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-25T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-26T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-27T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-28T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-29T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-11-30T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-01T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-02T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-03T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-04T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-05T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-06T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-07T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-08T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-09T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-10T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-11T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-12T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-13T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-14T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-15T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-16T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-17T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-18T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-19T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-20T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-21T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-22T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-23T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-24T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-25T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-26T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-27T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-28T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-29T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-30T23:00:00.000Z"),
      percent: 0.0
    },
    {
      date: new Date("2019-12-31T23:00:00.000Z"),
      percent: 0.0
    }
  ]
});


db.seasons.insert({
  year: -1,
  data: [
    {
      date: new Date("2019-01-01T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-02T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-03T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-04T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-05T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-06T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-07T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-08T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-09T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-10T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-11T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-12T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-13T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-14T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-15T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-16T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-17T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-18T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-19T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-20T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-21T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-22T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-23T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-24T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-25T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-26T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-27T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-28T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-29T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-30T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-01-31T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-01T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-02T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-03T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-04T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-05T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-06T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-07T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-08T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-09T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-10T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-11T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-12T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-13T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-14T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-15T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-16T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-17T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-18T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-19T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-20T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-21T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-22T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-23T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-24T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-25T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-26T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-27T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-02-28T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-01T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-02T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-03T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-04T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-05T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-06T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-07T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-08T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-09T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-10T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-11T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-12T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-13T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-14T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-15T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-16T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-17T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-18T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-19T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-20T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-21T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-22T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-23T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-24T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-25T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-26T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-27T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-28T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-29T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-30T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-03-31T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-01T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-02T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-03T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-04T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-05T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-06T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-07T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-08T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-09T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-10T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-11T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-12T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-13T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-14T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-15T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-16T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-17T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-18T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-19T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-20T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-21T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-22T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-23T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-24T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-25T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-26T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-27T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-28T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-29T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-04-30T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-01T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-02T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-03T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-04T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-05T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-06T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-07T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-08T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-09T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-10T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-11T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-12T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-13T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-14T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-15T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-16T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-17T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-18T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-19T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-20T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-21T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-22T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-23T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-24T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-25T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-26T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-27T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-28T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-29T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-30T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-05-31T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-01T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-02T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-03T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-04T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-05T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-06T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-07T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-08T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-09T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-10T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-11T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-12T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-13T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-14T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-15T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-16T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-17T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-18T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-19T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-20T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-21T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-22T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-23T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-24T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-25T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-26T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-27T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-28T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-29T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-06-30T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-01T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-02T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-03T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-04T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-05T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-06T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-07T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-08T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-09T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-10T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-11T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-12T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-13T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-14T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-15T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-16T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-17T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-18T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-19T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-20T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-21T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-22T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-23T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-24T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-25T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-26T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-27T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-28T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-29T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-30T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-07-31T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-01T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-02T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-03T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-04T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-05T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-06T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-07T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-08T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-09T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-10T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-11T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-12T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-13T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-14T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-15T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-16T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-17T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-18T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-19T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-20T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-21T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-22T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-23T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-24T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-25T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-26T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-27T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-28T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-29T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-30T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-08-31T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-01T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-02T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-03T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-04T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-05T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-06T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-07T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-08T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-09T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-10T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-11T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-12T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-13T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-14T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-15T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-16T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-17T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-18T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-19T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-20T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-21T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-22T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-23T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-24T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-25T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-26T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-27T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-28T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-29T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-09-30T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-01T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-02T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-03T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-04T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-05T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-06T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-07T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-08T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-09T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-10T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-11T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-12T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-13T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-14T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-15T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-16T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-17T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-18T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-19T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-20T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-21T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-22T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-23T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-24T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-25T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-26T22:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-27T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-28T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-29T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-30T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-10-31T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-01T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-02T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-03T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-04T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-05T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-06T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-07T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-08T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-09T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-10T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-11T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-12T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-13T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-14T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-15T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-16T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-17T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-18T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-19T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-20T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-21T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-22T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-23T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-24T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-25T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-26T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-27T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-28T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-29T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-11-30T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-01T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-02T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-03T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-04T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-05T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-06T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-07T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-08T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-09T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-10T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-11T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-12T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-13T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-14T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-15T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-16T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-17T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-18T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-19T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-20T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-21T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-22T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-23T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-24T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-25T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-26T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-27T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-28T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-29T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-30T23:00:00.000Z"),
      percent: 0
    },
    {
      date: new Date("2019-12-31T23:00:00.000Z"),
      percent: 0
    }
  ]
});
