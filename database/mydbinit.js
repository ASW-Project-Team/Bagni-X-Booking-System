var conn = new Mongo();
var db = conn.getDB('dbsa');

// crea la collection 'alignments' e la lascia come e' se gia' esiste
db.createCollection('alignments', function(err, collection) {});

// elimina gli eventuali documenti della collection 'alignments'
try {
   db.alignments.deleteMany( { } );
} catch (e) {
   print (e);
}

// visualizza documenti esistenti
var cursor = db.alignments.find();
while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}

// inserisce un documento
db.alignments.insert({"s1": "GCATGCU", "s2": "GATTACA", "as1": "GCATGC-U", "as2": "G-ATTACA"})


// visualizza documenti esistenti
var cursor = db.alignments.find();
while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}

