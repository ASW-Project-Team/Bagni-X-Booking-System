let collection;

module.exports = function(mongoose) {
    if (!!!collection)
        collection = initializeCollection();

    return collection;
};


const initializeCollection = function() {
    let Schema = mongoose.Schema;

    // it's possible also nested declaration?
    let FeedSchema = new Schema({
        _id: Schema.Types.ObjectId,
        date: Date,
        title: String,
        description: String
    });
    return mongoose.model('feedmodel', FeedSchema, 'feeds');
};
