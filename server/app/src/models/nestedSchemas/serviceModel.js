let model;

module.export = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    const Schema = mongoose.Schema;
    const Float = require('mongoose-float').loadType(mongoose);

    const serviceSchema = new Schema({
        _id: Schema.Types.ObjectID,
        price: {type: Float, $gt: 0.0},
        description: {type: String, default: null}
    });
    return mongoose.model('service', serviceSchema);
}
