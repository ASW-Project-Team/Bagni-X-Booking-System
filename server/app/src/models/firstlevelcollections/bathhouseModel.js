module.exports = function(mongoose) {

    //import {Gallery} from '../othercollections/galleryModel'

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
        gallery: [{type: new Schema({
            _id: Schema.Types.ObjectID,
            url: String
        }), default: null}]
    });
    return mongoose.model('bathhousemodel', bathhouseInfo, 'bathhouse_info');
};