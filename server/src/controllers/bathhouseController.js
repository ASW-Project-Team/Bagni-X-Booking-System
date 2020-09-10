const Bathhouse = require('../models/bathhouseModel');
const sanitizers = require('./utils/sanitizers');
const imgUploader = require('./utils/imageUploader');
const respFilters = require('./utils/responseFilters');
const respGenerator = require('./utils/responseGenerator');


/**
 * Updates the given fields of the item. Required responses:
 *  - 200: The server updated the specified item.
 *  - 400: The request is malformed.
 *  - 401: Not an admin.
 */
module.exports.updateBathhouse = async (req, res) => {
   // Sanitization
    const name = sanitizers.toString(req.body.name);
    const seasonStart = sanitizers.toDate(req.body.seasonStart);
    const seasonEnd = sanitizers.toBool(req.body.seasonEnd);
    const logoUrl = await imgUploader.trySyncUpload(req, res, imgUploader.types.bathhouse);

    await Bathhouse.findOneAndUpdate({}, {
        name: name,
        seasonStart: seasonStart,
        seasonEnd: seasonEnd,
        logoUrl: logoUrl
    }, { omitUndefined: true, new: true })

    respGenerator.respondOK(res);
}


/**
 * Return all items, in a paginated fashion, or only the item with
 * the given id. Required responses:
 * For get by id:
 *  - 200: The server returned the specified item.
 *  - 400: The request is malformed.
 *  - 401: Not an admin.
 *  - 404: An item with the given id does not exist.
 * For get all:
 *  - 200: The server returned the paginated item list.
 *  - 400: The request is malformed.
 *  - 401: Not an admin.
 */
module.exports.readBathhouse = async (req, res) => {
    const bathhouseFromDb = await Bathhouse.findOne();
    const bathhouse = respFilters.filterSensitiveInfoObj(bathhouseFromDb);
    respGenerator.respondOK(res, bathhouse);
}
