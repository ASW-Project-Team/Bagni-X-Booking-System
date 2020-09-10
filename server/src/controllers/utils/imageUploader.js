const multer = require('multer');
const imgSupport = require('../../routes/utils/imageSupport')
/**
 * An object that summarizes the possible types usable inside the param
 * image type of {@link tryUploadImage}. Use this standardized object to refer
 * to the types.
 */
const imageTypes = {
  homeCard: 'homeCardImg',
  service: 'serviceImg',
  rankUmbrella: 'rankUmbrellasImg',
  bathhouse: 'bathhouseImg',
  news: 'newsImg'
};

module.exports.defaultImage = "http://localhost:3000/assets/default-home-card-img-1.jpg";

module.exports.types = imageTypes;

/**
 * The returned object of the returned promise from {@link tryUploadImage},
 * describing the outcome.
 * @typedef TryUploadOutcome
 * @property {string} imageUrl - the url of the image, if correctly processed.
 * @property {boolean} isPresent - whether the image is present inside the
 * request.
 * @property {string} error - The error, if present.
 */

/**
 * Controls if there is an attached image inside the request, and tries to
 * upload it inside the server storage. It returns an object that summarizes the
 * outcome of the request, and the given image url.
 *
 * @param {string=} imageType the category of the image. Used to better
 * organize files inside image directory. A property of the object
 * {@link type}.
 * @param {Object} req the req field of the request.
 * @param {Object} res the res field of the request.
 * @return {Promise<TryUploadOutcome>} A promise that, if completed, returns an
 * object that summarizes the outcome of the request. In case of error, the same
 * object is thrown, but must be intercepted inside the catch block.
 */
module.exports.tryUploadImage = function(req, res, imageType) {
  let uploader = imgSupport.generic(imageType);

  return new Promise(function(resolve, reject) {
    uploader(req, res, function(err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any

      let outcome = {
        imageUrl: undefined,
        isPresent: false,
        error: undefined
      }

      outcome.isPresent = !!req.file;
      outcome.imageUrl = !!req.file ? (req.protocol + '://' + req.get('host') + "/" + req.file.path) : undefined;

      if (req.fileValidationError) {
        outcome.error = req.fileValidationError;
      } else if (err) {
        outcome.error = err;
      }

      if (!!outcome.error) {
        return reject(outcome);
      } else {
        return resolve(outcome);
      }
    });
  });
}


/**
 * Tries the upload in a synchronous way, and if no image is present, returns
 * undefined
 * @param {string=} imageType the category of the image. Used to better
 * organize files inside image directory. A property of the object
 * {@link type}.
 * @param {Object} req the req field of the request.
 * @param {Object} res the res field of the request.
 * @return {Promise<TryUploadOutcome>} A promise that, if completed, returns an
 * object that summarizes the outcome of the request. In case of error, the same
 * object is thrown, but must be intercepted inside the catch block.
 * @return {string}
 */
module.exports.trySyncUpload = async (req, res, imageType) => {
  let imageUrl;
  try {
    const upload = await module.exports.tryUploadImage(req, res, imageType);
    imageUrl = upload.imageUrl;
  } catch (e) {
    imageUrl = undefined;
  }

  return imageUrl;
}
