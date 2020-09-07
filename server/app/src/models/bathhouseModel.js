let model;

module.exports = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    const Schema = mongoose.Schema;
    const homeCardModel = require("./nestedSchemas/homeCardModel")(mongoose).schema;

    const bathhouse = new Schema({
        _id: Schema.Types.ObjectId,
        name: String,
        logoUrl: String,
        seasonDateFrom: Date,
        seasonDateTo: Date,
        mainHomeCard: homeCardModel,
        homeCards: {type: [homeCardModel], default: null}
    });
    return mongoose.model('bathhouse', bathhouse, 'bathhouse');
}
