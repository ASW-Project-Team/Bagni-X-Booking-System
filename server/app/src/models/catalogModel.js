let model;

module.exports = function(mongoose) {
    if (!!!model)
        model = initializeModel(mongoose);

    return model;
};


const initializeModel = function(mongoose) {
    const serviceModel = require('./nestedSchemas/serviceModel')(mongoose);
    const umbrellaModel = require('./nestedSchemas/umbrellaModel')(mongoose);
    const rankUmbrellaModel = require('./nestedSchemas/rankUmbrellaModel')(mongoose);

    const Schema = mongoose.Schema;

    let CatalogSchema = new Schema({
        rank_umbrellas: [{type: rankUmbrellaModel, default: null}], // includes also sales
        umbrellas: [{type: umbrellaModel, default: null}],
        services: [{type: serviceModel, default: null}]
    });
    return mongoose.model('catalog', CatalogSchema, 'catalog');
};


