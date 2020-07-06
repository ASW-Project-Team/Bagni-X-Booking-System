module.exports.schema = function () {
    const Schema = mongoose.Schema;

    // used in bathhouse
    return new Schema({
        _id: Schema.Types.ObjectID,
        url: String
    });
}

