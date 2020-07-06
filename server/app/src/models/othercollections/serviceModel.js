module.exports.schema = function () {
    const Schema = mongoose.Schema;
    const Float = require('mongoose-float').loadType(mongoose);

    return new Schema({
        _id: Schema.Types.ObjectID,
        price: {type: Float, $gt: 0.0},
        description: {type: String, default: null}
    });
}
