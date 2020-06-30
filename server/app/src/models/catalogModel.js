import {commonModel} from "./";

module.exports = function (mongoose) {
    const Schema = commonModel.Schema;

    const sales = new Schema({ // price could change thanks to sales
        _id: Schema.Types.ObjectID,
        percent: Number,
        date_from: Date,
        date_to: Date
    })

    const rank_umbrellas = new Schema({
        _id: Schema.Types.ObjectID,
        name: String,
        description: String,
        price: Float,
        sales: [sales]
    })

    const umbrellas = new Schema({ // price depends from rank
        _id: Schema.Types.ObjectID,
        x_position: Number,
        y_position: Number,
        rank_id: Schema.Types.ObjectID
    })


    const CatalogSchema = new Schema({
        rank_umbrellas: [rank_umbrellas], // includes also sales
        umbrellas: [umbrellas],
        services: [commonModel.services]
    });
    return mongoose.model('catalogmodel', CatalogSchema, 'catalog');
};


