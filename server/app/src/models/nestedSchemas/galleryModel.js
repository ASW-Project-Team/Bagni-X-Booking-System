let model;

module.exports = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    const Schema = mongoose.Schema;
    // used in bathhouse
    const gallerySchema = new Schema({
        _id: Schema.Types.ObjectID,
        url: String
    });

    return mongoose.model('gallery', gallerySchema);
}

