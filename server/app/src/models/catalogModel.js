let collection;

module.exports = function(mongoose) {
    if (!!!collection)
        collection = initializeCollection();

    return collection;
};


const initializeCollection = function() {
    const serviceModel = require('./nestedSchemas/serviceModel')
    const umbrellaModel = require('./nestedSchemas/umbrellaModel')
    const rankUmbrellaModel = require('./nestedSchemas/rankUmbrellaModel')

    const Schema = mongoose.Schema;

    let CatalogSchema = new Schema({
        rank_umbrellas: [rankUmbrellaModel.schema()], // includes also sales
        umbrellas: [{type: umbrellaModel.schema(), default: null}],
        services: [{type: serviceModel.schema(), default: null}]
    });
    return mongoose.model('catalogmodel', CatalogSchema, 'catalog');
};


