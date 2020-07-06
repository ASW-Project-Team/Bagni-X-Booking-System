let collection;

module.exports = function(mongoose) {
    if (!!!collection)
        collection = initializeCollection();

    return collection;
};


const initializeCollection = function() {
    const serviceModel = require('../othercollections/serviceModel')
    const umbrellaModel = require('../othercollections/umbrellaModel')
    const rankUmbrellaModel = require('../othercollections/rankUmbrellaModel')

    const Schema = mongoose.Schema;

    let CatalogSchema = new Schema({
        rank_umbrellas: [rankUmbrellaModel.schema()], // includes also sales
        umbrellas: [{type: umbrellaModel.schema(), default: null}],
        services: [{type: serviceModel.schema(), default: null}]
    });
    return mongoose.model('catalogmodel', CatalogSchema, 'catalog');
};


