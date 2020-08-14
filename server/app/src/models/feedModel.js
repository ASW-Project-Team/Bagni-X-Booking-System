let model;

module.exports = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    let Schema = mongoose.Schema;

    // it's possible also nested declaration?
    let newsSchema = new Schema({
        _id: Schema.Types.ObjectId,
        date: Date,
        title: String,
        description: {type: String, default: null}
    });
    return mongoose.model('news', newsSchema, 'feed');
};
