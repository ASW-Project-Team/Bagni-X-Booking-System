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
])

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
