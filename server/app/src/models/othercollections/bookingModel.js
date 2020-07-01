import {Service} from "./serviceModel";

const Schema = mongoose.Schema;


export class Booking {
    _id: Schema.Types.ObjectID
    umbrella_id: Schema.Types.ObjectID
    confirmed: Boolean
    cancelled: Boolean
    price: Float
    date_from: Date
    date_to: Date // fixme vincolo da gestire esternamente
    services: [Service]
}