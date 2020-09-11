/**
 * @file Enables support for image uploading, handled inside the controller.
 * As a side effect, enables also using Postman with form data.
 */

const multer = require('multer');

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
 * An object that summarizes the possible types
 */
const imageTypes = {
  homeCard: 'homeCardImg',
  service: 'serviceImg',
  rankUmbrella: 'rankUmbrellasImg',
  bathhouse: 'bathhouseImg',
  news: 'newsImg'
};


module.exports.news = multer({
  storage: storage(imageTypes.news),
  fileFilter: imageFilter
}).single(imageTypes.news);


module.exports.rankUmbrella = multer({
  storage: storage(imageTypes.rankUmbrella),
  fileFilter: imageFilter
}).single(imageTypes.rankUmbrella);


module.exports.service = multer({
  storage: storage(imageTypes.service),
  fileFilter: imageFilter
}).single(imageTypes.service);

module.exports.homeCard = multer({
  storage: storage(imageTypes.homeCard),
  fileFilter: imageFilter
}).single(imageTypes.homeCard);


module.exports.bathhouse = multer({
  storage: storage(imageTypes.bathhouse),
  fileFilter: imageFilter
}).single(imageTypes.bathhouse);

module.exports.generic = (imgType) => {
  return multer({
    storage: storage(imgType),
    fileFilter: imageFilter
  }).single(imgType);
}
