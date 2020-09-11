const Bathhouse = require('../models/bathhouseModel');
const sanitizers = require('../utils/sanitizers');
const imgUploader = require('../utils/imageUpload');
const respFilters = require('../utils/responseFilters');
const respGenerator = require('../utils/responseGenerator');


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
    const logoUrl = await imgUploader.syncUpload(req, res);

    await Bathhouse.findOneAndUpdate({}, {
        name: name,
        seasonStart: seasonStart,
        seasonEnd: seasonEnd,
        logoUrl: logoUrl
    }, { omitUndefined: true, new: true })

    respGenerator.respondOK(res);
}


/**
 * Return the content of the bathhouse document.
 */
module.exports.readBathhouse = async (req, res) => {
    const bathhouseFromDb = await Bathhouse.findOne();
    const bathhouse = respFilters.cleanObject(bathhouseFromDb);
    respGenerator.respondOK(res, bathhouse);
}
