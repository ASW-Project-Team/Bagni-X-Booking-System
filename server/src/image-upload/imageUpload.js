const multer = require('multer');
const path = require('path');

/**
 * In a string in Kebab case, words are separated by an hyphen. This function
 * converts from camelCase to kebab-case. This is useful for crating file names.
 * @param camelCaseString the string in CamelCase
 * @return {string} the same string in kebab-case
 */
const camelToKebab = function(camelCaseString) {
  return camelCaseString
           .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
           .toLowerCase();
};


/**
 * Creates the storage object.
 * of the object {@link imageTypes}.
 * @return used to store the image.
 */
const storage = function() {
  const destDir = 'assets/';

  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destDir);
    },

    // By default, multer removes file extensions. This add them back
    filename: function (req, file, cb) {
      cb(
        null,
        camelToKebab(file.fieldname) + '-' + Date.now() + path.extname(file.originalname)
      );
    }
  });
}

/**
 * Ensures that the sent file is an image. Used inside the storage object.
 */
const imageFilter = function(req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};


/**
 * An object that summarizes the possible types usable inside the param
 * image type of {@link tryUploadImage}. Use this standardized object to refer
 * to the types.
 * @type {{bathhouse: string, news: string, homeCard: string, service: string,
 * rankUmbrella: string}}
 */
module.exports.imageTypes = {
  homeCard: 'homeCardImg',
  service: 'serviceImg',
  rankUmbrella: 'rankUmbrellaImg',
  bathhouse: 'bathhouseImg',
  news: 'newsImg'
};


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
 * {@link imageTypes}.
 * @param {Object} req the req field of the request.
 * @param {Object} res the res field of the request.
 * @return {Promise<TryUploadOutcome>} A promise that, if completed, returns an
 * object that summarizes the outcome of the request. In case of error, the same
 * object is thrown, but must be intercepted inside the catch block.
 */
module.exports.tryUploadImage = function(req, res, imageType) {
  let upload = multer({
    storage: storage(imageType),
    fileFilter: imageFilter
  }).single(imageType);

  return new Promise(function(resolve, reject) {
    upload(req, res, function(err) {
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

