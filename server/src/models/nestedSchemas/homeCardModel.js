let model;

module.exports = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    const Schema = mongoose.Schema;

    // price could change thanks to sales used in catalog
    const homeCard = new Schema({
        _id: Schema.Types.ObjectID,
        image: String, // TODO check for url
        title: String,
        header: Boolean,
        description: {type: String, default: null}
    });

    return mongoose.model('homeCard', homeCard);
}
