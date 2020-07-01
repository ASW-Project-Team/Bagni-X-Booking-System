import {Sale} from "./saleModel";
const Schema = mongoose.Schema;

// used in catalog
export class RankUmbrella{
    _id: Schema.Types.ObjectID
    name: String
    description: String
    price: Float
    sales: [Sale]
}