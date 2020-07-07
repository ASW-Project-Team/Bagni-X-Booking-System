let model;

module.export = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    const galleryModel = require('./nestedSchemas/galleryModel')

    let Schema = mongoose.Schema;
    let bathhouseInfo = new Schema({
        _id: Schema.Types.ObjectId,
        name: String, // String is shorthand for {type: String}
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
