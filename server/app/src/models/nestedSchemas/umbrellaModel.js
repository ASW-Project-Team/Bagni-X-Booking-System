let model;

module.exports = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    const Schema = mongoose.Schema;

    // used in bathhouse
    const umbrellaSchema = new Schema({ // price depends from rank
        _id: Schema.Types.ObjectID,
        x_position: Number,
        y_position: Number,
        rank_id: Schema.Types.ObjectID
    });
    return mongoose.model('umbrella', umbrellaSchema);
}

