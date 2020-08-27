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
            min: [0, 'Too small'],
        },
        date_from: {type: Date, $gte: Date.now()},
        date_to: {type: Date, $gte: Date.now()}
    });

    return mongoose.model('sale', saleSchema);
}
