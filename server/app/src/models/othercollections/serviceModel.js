// Used in booking and in catalog
export class Service {
        _id: Schema.Types.ObjectID
        service_id: Schema.Types.ObjectID
        price: Float
        description: {type: String, default: ""}
}
