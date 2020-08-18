let model;

module.exports = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    const serviceModel = require('./nestedSchemas/serviceModel')(mongoose).schema;
    const umbrellaModel = require('./nestedSchemas/umbrellaModel')(mongoose).schema;
    const rankUmbrellaModel = require('./nestedSchemas/rankUmbrellaModel')(mongoose).schema;

    const Schema = mongoose.Schema;

    let CatalogSchema = new Schema({
        rank_umbrellas: [{type: rankUmbrellaModel, default: null}], // includes also sales
        services: [{type: serviceModel, default: null}]
    });
    return mongoose.model('catalog', CatalogSchema, 'catalog');
};


