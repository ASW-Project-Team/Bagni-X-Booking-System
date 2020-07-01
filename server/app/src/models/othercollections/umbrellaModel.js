const Schema = mongoose.Schema;

// used in bathhouse
export class Umbrella { // price depends from rank
    _id: Schema.Types.ObjectID
    x_position: Number
    y_position: Number
    rank_id: Schema.Types.ObjectID
}