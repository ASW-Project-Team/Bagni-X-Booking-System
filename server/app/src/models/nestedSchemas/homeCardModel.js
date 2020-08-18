let model;

module.exports = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    const Schema = mongoose.Schema;

    // price could change thanks to sales used in catalog
    const homeCardSchema = new Schema({
        _id: Schema.Types.ObjectID,
        image: {type: String, default: ""},// url
        title: String,
        header: Boolean,
        description: String
    });

    return mongoose.model('homeCard', homeCardSchema);
}
