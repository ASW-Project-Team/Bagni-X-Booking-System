let model;

module.exports = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    const Schema = mongoose.Schema;
    const RanksModel = require("./rankUmbrellaModel")(mongoose).schema

    // used in bathhouse
    const umbrella = new Schema({ // price depends from rank
        _id: Schema.Types.ObjectID,
        number: Number,
        rank: RanksModel
    });
    return mongoose.model('umbrella', umbrella);
}
