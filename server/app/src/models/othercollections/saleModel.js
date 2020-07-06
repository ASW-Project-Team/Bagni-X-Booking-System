module.exports = function(mongoose) {

    let Schema = mongoose.Schema;

// price could change thanks to sales
// used in catalog
    let SaleSchema = new Schema({
        _id: Schema.Types.ObjectID,
        percent: {
            type: Number,
            min: [0, 'Too small'],
        },
        date_from: Date,
        date_to: Date
    });

    return mongoose.model("salemodel", SaleSchema, "sales");
}