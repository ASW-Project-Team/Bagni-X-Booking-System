module.exports = function(mongoose) {

        const Schema = mongoose.Schema;

        const Service = new Schema({
                _id: Schema.Types.ObjectID,
                price: Float,
                description: {type: String, default: ""}
        });
        return mongoose.model('servicemodel', ServiceSchema, 'services');

}
