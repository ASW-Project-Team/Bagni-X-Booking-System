import {commonModel} from "./";

module.exports = function(mongoose) {
    const Schema = commonModel.Schema;

    // it's possible also nested declaration?

    const bookings = new Schema({
        _id: Schema.Types.ObjectID,
        umbrella_id: Schema.Types.ObjectID,
        confirmed: Boolean,
        cancelled: Boolean,
        price: Float,
        date_from: Date,
        date_to: Date,
        services: [commonModel.services]
    })

    const UserSchema = new Schema({
        _id: Schema.Types.ObjectId,
        name: String, // String is shorthand for {type: String}
        surname: String,
        phone: String,
        email: String,
        address: String,
        registered: Boolean,
        deleted: {type: Boolean, default: false},
        bookings: [bookings]
    });
    return mongoose.model('usermodel', UserSchema, 'users');
};