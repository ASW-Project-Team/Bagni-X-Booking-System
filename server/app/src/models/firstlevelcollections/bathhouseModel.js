import {Gallery} from '../othercollections/galleryModel'

module.exports = function(mongoose) {
    const Schema = mongoose.Schema;

    const bathhouseInfo = new Schema({
        _id: Schema.Types.ObjectId,
        name: String, // String is shorthand for {type: String}
        description: {type: String, default: ""},
        phone: String, // fixme add validator from server
        n_umbrella: {
            type: Number,
            min: [10, 'Too small'],
        },
        n_available_now_umbrellas: Number,
        gallery: [Gallery]
    });
    return mongoose.model('bathhousemodel', bathhouseInfo, 'bathhouse_info');
};