let model;

module.exports = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    const galleryModel = require('./nestedSchemas/galleryModel')(mongoose).schema;

    let Schema = mongoose.Schema;
    let bathhouseInfo = new Schema({
        _id: Schema.Types.ObjectId,
        name: String, // String is shorthand for {type: String}
        logo_url: String,
        home_cards: null, // todo list of home cards
        description: {type: String, default: ""},
        phone: String, // fixme add validator from server
        n_umbrella: {
            type: Number,
            min: [10, 'Too small'],
        },
        n_available_now_umbrellas: Number,
        gallery: [{ type: galleryModel, default: null}]
    });
    return mongoose.model('bathhouse_info', bathhouseInfo, 'bathhouse_info');
}
