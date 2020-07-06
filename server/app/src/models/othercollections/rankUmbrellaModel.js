module.exports = function (mongoose) {

    let Schema = mongoose.Schema;
    let Float = require("mongoose-float").loadType(mongoose);

    let RankUmbrella = new Schema({
        _id: Schema.Types.ObjectID,
        name: String,
        description: String,
        price: Float,
        sales: [{type: new Schema({
                _id: Schema.Types.ObjectID,
                percent: {
                    type: Number,
                    min: [0, 'Too small'],
                },
                date_from: Date,
                date_to: Date
            }),default: null}]
    });
    return mongoose.model();

}
