module.exports = function (mongoose) {

    let Schema = mongoose.Schema;

    // used in bathhouse
    let UmbrellaSchema = new Schema({ // price depends from rank
        _id: Schema.Types.ObjectID,
        x_position: Number,
        y_position: Number,
        rank_id: Schema.Types.ObjectID
    })

    return mongoose.model('umbrellamodel', UmbrellaSchema, 'umbrellas');
}

