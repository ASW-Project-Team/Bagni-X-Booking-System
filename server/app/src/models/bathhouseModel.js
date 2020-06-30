module.exports = function(mongoose) {
    const Schema = mongoose.Schema;

    const gallery = new Schema({
        _id: Schema.Types.ObjectID,
        url: String
    });

    const bathhouseInfo = new Schema({
        _id: Schema.Types.ObjectId,
        name: String, // String is shorthand for {type: String}
        description: {type: String, default: ""},
        phone: String,
        n_umbrella: Number,
        n_available_now_umbrellas: Number,
        gallery: [gallery]
    });
    return mongoose.model('bathhousemodel', bathhouseInfo, 'bathhouse_info');
};