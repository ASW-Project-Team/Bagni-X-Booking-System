module.exports.schema = function () {
    const Schema = mongoose.Schema;

    // price could change thanks to sales
    // used in catalog
    return new Schema({
        _id: Schema.Types.ObjectID,
        percent: {
            type: Number,
            min: [0, 'Too small'],
        },
        date_from: Date,
        date_to: Date
    });
}
