let model;

module.exports = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    let Schema = mongoose.Schema;
    let bathhouseInfo = new Schema({
        _id: Schema.Types.ObjectId,
        name: String, // String is shorthand for {type: String}
        logo_url: String,
        main_home_card: null, // todo
        home_cards: null, // todo list of home cards
    });
    return mongoose.model('bathhouse_info', bathhouseInfo, 'bathhouse_info');
}
