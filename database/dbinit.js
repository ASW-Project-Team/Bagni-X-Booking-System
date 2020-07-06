/**
 * The script is executed the first time the container starts. It initializes
 * the database, eventually creating collections.
 * @type {Mongo}
 */

let conn = new Mongo();
let db = conn.getDB('bagni_X_booking_system_db');

// Initializes collections, leaving them untouched if present yet
db.createCollection('feed', function(err, collection) {});
db.createCollection('users', function(err, collection) {});
db.createCollection('catalog', function(err, collection) {});
db.createCollection('bathhouse_info', function(err, collection) {});


// elimina gli eventuali documenti della collection 'alignments'
try {
   db.feed.deleteMany( { } );
   db.users.deleteMany( { } );
   db.catalog.deleteMany( { } );
   db.bathhouse_info.deleteMany( { } );

} catch (e) {
   print (e);
}


// inserts a document per collection
//db.test.insert({ "test": "Hello World!" })


// shows existing documents.
/*let cursor = db.feed.find();
while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}*/

