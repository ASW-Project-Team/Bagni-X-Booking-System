let collection;

module.exports = function(mongoose) {
    if (!!!collection)
        collection = initializeCollection();

    return collection;
};


const initializeCollection = function() {
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
        gallery: [{ type: galleryModel.schema(), default: null}]
    });
    return mongoose.model('bathhousemodel', bathhouseInfo, 'bathhouse_info');
}
