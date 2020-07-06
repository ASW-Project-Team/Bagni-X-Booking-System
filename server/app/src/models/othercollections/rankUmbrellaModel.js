module.exports.schema = function () {
    const Schema = mongoose.Schema;
    const Float = require("mongoose-float").loadType(mongoose);
    const saleModel = require('saleModel');

    let RankUmbrella = new Schema({
        _id: Schema.Types.ObjectID,
        name: String,
        description: String,
        price: Float,
        sales: [{type: new Schema(saleModel.schema()), default: null}]
    });
    return mongoose.model();

}
