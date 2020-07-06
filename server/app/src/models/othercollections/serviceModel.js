module.exports = function(mongoose) {

        let Schema = mongoose.Schema;
        let Float = require('mongoose-float').loadType(mongoose);

        let Service = new Schema({
                _id: Schema.Types.ObjectID,
                price: { type: Float, $gt: 0.0 },
                description: {type: String, default: null}
        });
        return mongoose.model('servicemodel', Service, 'services');

}
