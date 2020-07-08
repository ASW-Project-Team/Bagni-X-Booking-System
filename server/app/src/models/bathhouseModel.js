let model;

module.exports = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    const Schema = mongoose.Schema;
    const homeCardModel = require("./nestedSchemas/homeCardModel")(mongoose).schema;

    const  bathhouseInfo = new Schema({
        _id: Schema.Types.ObjectId,
        name: String, // String is shorthand for {type: String}
        logo_url: String,
        main_home_card: homeCardModel,
        home_cards: homeCardModel,
    });
    return mongoose.model('bathhouse_info', bathhouseInfo, 'bathhouse_info');
}
