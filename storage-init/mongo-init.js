/**
 * The script is executed the first time the container starts. It initializes
 * the database, eventually creating collections.
 */

db.createUser({
  user: "server",
  pwd: "TheSuperServer!46",
  roles: [{
    role: "readWrite",
    db: "bagni_X_booking_system_db"
  }]
});

// Initializes collections, leaving them untouched if present yet
db.createCollection('admins', function(err, collection) {});
db.createCollection('bathhouse', function(err, collection) {});
db.createCollection('booking', function(err, collection) {});
db.createCollection('customer', function(err, collection) {});
db.createCollection('admin', function(err, collection) {});
db.createCollection('news', function(err, collection) {});
db.createCollection('catalog', function(err, collection) {});

// inserts initialization documents
db.admin.insert({
  _id: "0",
  root: true,
  username: "root",
  salt: "aaaaaa",
  hash: "21f054859f3af44fba0f973381c6c8b625ab2080a4efb60d7f91168df2da1de2a68" +
    "d622c2cd5b40e625146c8204668f662495fc7400406a1197b7cf960ed0eb7"
});

db.admin.insert({
  _id: "1",
  root: false,
  username: "commonAdmin",
  salt: "bbbbbb",
  hash: "7f5a5f4494b59c6b9eeb6068ffe1666288489031615a4793faeb9385d353e2f6d9b" +
    "b70a021358d2acd0dcb37b3738da6187b3e1fcea527a74697277a8dca6b9a"
});

db.customer.insert({
  _id: "0",
  name: "Riccardo",
  surname: "Maldini",
  email: "test@test.it",
  phone: "331123456",
  address: "Viale della Vittoria, 22",
  salt: "aaaaaa",
  hash: "dcb1daab866aa87a2bf1924df6f58fc3324a461a2b0723b68a6782c9243f9b9d783" +
    "01b96dc5f2eb0fabf48de47c9c51a85d426f341a27375f79f4a1c6d265ba9",
  cancelled: false,
  registered: true,
})

db.bathhouse.insert({
  _id: "0",
  name: "Bagni X",
  logoUrl: "/assets/default-bathhouse-img-logo.png",
  mainHomeCard: {
    _id: "1",
    title: "La tua spiaggia, a portata di click!",
    description: "Benvenuto nella web app ufficiale dello stabilimento " +
      "balneare Bagni X! Questa ti dà la possibilità di prenotare il tuo " +
      "ombrellone direttamente online. Non vediamo l’ora di iniziare!",
    header: true,
    image: "http://localhost:3000/assets/default-main-card-img-0.jpg"
  },
  homeCards: [
    {
      _id: "1",
      title: "Il nostro stabilimento",
      description: "Bagni X dispone di 84 ombrelloni prenotabili online, " +
        "lungo tutta la stagione estiva, che va dal 1 giugno al 16 " +
        "settembre. Per maggiori informazioni, puoi contattarci " +
        "telefonicamente o con Whatsapp al numero 000-0000000, o via mail " +
        "a info@bagnix.com",
      header: false,
      image: "http://localhost:3000/assets/default-home-card-img-0.jpg"
    },
    {
      _id: "2",
      title: "Immersi nella città di Senigallia",
      description: "Senigallia è un comune italiano di 44 659 abitanti della " +
        "provincia di Ancona nelle Marche. È una nota località turistica. " +
        "La zona di Senigallia costituisce il confine linguistico fra le " +
        "lingue gallo-italiche e i dialetti italiani mediani.",
      header: false,
      image: "http://localhost:3000/assets/default-home-card-img-1.jpg"
    },
    {
      _id: "3",
      title: "Dove siamo?",
      description: "Lo stabilimento si trova nel Lungomare Mameli n.12, a " +
        "Senigallia (AN), a pochi metri dalla stazione, e raggiungibile in " +
        "auto. I parcheggi sono a pagamento.",
      header: true,
      image: "http://localhost:3000/assets/default-home-card-img-2.jpg"
    }
  ],
});

db.news.insert({
  _id: "0",
  title: "Una super notizia notiziona ona ona",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
    "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " +
    "nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in " +
    "reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla " +
    "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in " +
    "culpa qui officia deserunt mollit anim id est laborum.",
  date: new Date(),
  image: "http://localhost:3000/assets/default-news-img-0.jpg"
});

db.news.insert({
  _id: "1",
  title: "Un'altra notizia niente male",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
    "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " +
    "nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in " +
    "reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla " +
    "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in " +
    "culpa qui officia deserunt mollit anim id est laborum.",
  date: new Date(),
  image: "http://localhost:3000/assets/default-news-img-1.jpg"
});

db.rankUmbrella.insert({
  _id: "0",
  image: "http://localhost:3000/assets/default-rank-umbrella-img-0.jpg",
  name: "Ombrellone prima fila",
  description: "Gli ombrelloni dall’1 al 20 sono di prima classe, e si " +
    "affacciano direttamente sul mare.",
  price: 20.00,
  fromUmbrella: 1,
  toUmbrella: 20,
  sales: []
});

db.rankUmbrella.insert({
  _id: "1",
  image: "http://localhost:3000/assets/default-rank-umbrella-img-1.jpg",
  name: "Ombrellone standard",
  description: "Gli ombrelloni dall’21 al 40 presentano costi più contenuti.",
  price: 16.00,
  fromUmbrella: 21,
  toUmbrella: 40,
  sales: []
});

db.service.insert({
  _id: "0",
  price: 3.00,
  image: "http://localhost:3000/assets/default-service-img-0.jpg",
  title: "Cabina",
  umbrellaRelated: true,
  description: "Con un piccolo supplemento puoi aggiungere una cabina " +
    "personale alla prenotazione.",
});

db.service.insert({
  _id: "1",
  price: 0,
  image: "http://localhost:3000/assets/default-service-img-1.jpg",
  title: "Campo da beach volley",
  umbrellaRelated: false,
  description: "Gli utenti possono accedere gratuitamente al nostro campo da " +
    "beach volley.",
})

// shows the starting configuration
let cursor = db.feed.find();
while ( cursor.hasNext() ) {
  printjson( cursor.next() );
}

