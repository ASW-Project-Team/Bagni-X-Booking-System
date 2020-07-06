module.exports = function(mongoose) {
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