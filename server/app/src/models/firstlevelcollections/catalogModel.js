module.exports = function (mongoose) {

    let Schema = mongoose.Schema;

    let CatalogSchema = new Schema({
        rank_umbrellas: [RankUmbrella], // includes also sales
        umbrellas: [{type: new Schema({ // price depends from rank
                _id: Schema.Types.ObjectID,
                x_position: Number,
                y_position: Number,
                rank_id: Schema.Types.ObjectID
            }), default: null}],
        services: [{type: new Schema({
            _id: Schema.Types.ObjectID,
            price: Float,
            description: {type: String, default: null}
        }), default: null}]
    });
    return mongoose.model('catalogmodel', CatalogSchema, 'catalog');
};


