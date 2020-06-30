module.exports = function(mongoose) {
    const Schema = mongoose.Schema;

    // Used in user and in catalog
    const services = new Schema({
        _id: Schema.Types.ObjectID,
        service_id: Schema.Types.ObjectID,
        price: Float,
        description: {type: String, default: ""}
    })
}