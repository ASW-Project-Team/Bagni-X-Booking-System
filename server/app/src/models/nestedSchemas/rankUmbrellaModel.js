let model;

module.exports = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    const Schema = mongoose.Schema;
    const Float = require("mongoose-float").loadType(mongoose);
    const saleModel = require('./saleModel')(mongoose).schema;

    const rankUmbrellaSchema = new Schema({
        _id: Schema.Types.ObjectID,
        name: String,
        description: {type: String, default: null},
        price: Float,
        from_umbrella: Number,
        to_umbrella: Number,
        sales: [{type: saleModel, default: null}]
    });
    return mongoose.model('rankUmbrella', rankUmbrellaSchema);
}
