let model;

module.exports = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    const Schema = mongoose.Schema;

    // price could change thanks to sales used in catalog
    const saleSchema = new Schema({
        _id: Schema.Types.ObjectID,
        percent: {
            type: Number,
            min: [0, 'Too small'], // CHECK if better $gt
        },
        date_from: {type: Date, $gte: Date.now()}, // fixme $gte not correct
        date_to: {type: Date, $gte: Date.now()}, // fixme date_to > date_from
    });

    return mongoose.model('sale', saleSchema);
}
