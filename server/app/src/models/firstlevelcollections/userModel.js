/*const Schema = mongoose.Schema;

const Float = require('mongoose-float').loadType(mongoose);

const UserSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    surname: String,
    phone: String, // fixme add validator
    email: String, // fixme add validator
    address: String,
    registered: Boolean,
    deleted: {type: Boolean, default: false},
    bookings: [{type: new Schema({
            _id: Schema.Types.ObjectID,
            umbrella_id: Schema.Types.ObjectID,
            confirmed: {type: Boolean, default: false},
            cancelled: {type: Boolean, default: false},
            price: { type: Float, $gte: 0.0 }, // fixme price > price min
            date_from: {type: Date, $gte: Date.now()}, // fixme $gte not correct
            date_to: {type: Date, $gte: Date.now()}, // fixme date_to > date_from
            services: [{type: new Schema({
                    _id: Schema.Types.ObjectID,
                    price: { type: Float, $gt: 0.0 },
                    description: {type: String, default: null}
                }), default: null}]
        }), default: null}]
});*/

module.exports = function(mongoose) {

    let Schema = mongoose.Schema;

    let Float = require('mongoose-float').loadType(mongoose);

    // it's possible also nested declaration?
    let UserSchema = new Schema({
        _id: mongoose.Types.ObjectId,
        name: String, // String is shorthand for {type: String}
        surname: String,
        phone: String, // fixme add validator from server
        email: String, // fixme add validator from server
        address: String,
        registered: Boolean,
        deleted: {type: Boolean, default: false},
        bookings: [{type: new Schema({
                _id: Schema.Types.ObjectID,
                umbrella_id: Schema.Types.ObjectID,
                confirmed: {type: Boolean, default: false},
                cancelled: {type: Boolean, default: false},
                price: { type: Float, $gte: 0.0 }, // fixme price > price min
                date_from: {type: Date, $gte: Date.now()}, // fixme $gte not correct
                date_to: {type: Date, $gte: Date.now()}, // fixme date_to > date_from
                services: [{type: new Schema({
                        _id: Schema.Types.ObjectID,
                        price: { type: Float, $gt: 0.0 },
                        description: {type: String, default: null}
                    }), default: null}]
            }), default: null}]
    });
    return mongoose.model('usermodel', UserSchema, 'users');
};