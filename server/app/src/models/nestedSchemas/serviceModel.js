let model;

module.exports = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    const Schema = mongoose.Schema;
    const Float = require('mongoose-float').loadType(mongoose);

    const serviceSchema = new Schema({
        _id: Schema.Types.ObjectID,
        price: {type: Float, $gte: 0.0},
        umbrella_related: Boolean,
        description: {type: String, default: null}
    });
    return mongoose.model('service', serviceSchema);
}
