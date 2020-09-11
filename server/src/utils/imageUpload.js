const multer = require('multer');


/**
 * Creates the storage object.
 * @return used to store the image.
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/');
  },

  // By default, multer removes file extensions. This add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  }
});


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
 * Controls if there is an attached image inside the request, and tries to
 * upload it inside the server storage. Returns undefined, in case of error or
 * missing image.
 *
 * @param {Object} req the req field of the request.
 * @param {Object} res the res field of the request.
 * @return {Promise<string>} A promise that, if completed, returns
 * the new image url. Undefined, if there was an error, or the image is missing.
 */
const upload = function(req, res) {
  return new Promise(function(resolve, reject) {
    const uploader = module.exports.addSupport;

    uploader(req, res, function(err) {
      if (req.file) {
        resolve(req.protocol + '://' + req.get('host') + "/" + req.file.path);
      } else {
        reject(err);
      }
    });
  });
}

module.exports.defaultImage = "http://localhost:3000/assets/default-home-card-img-1.jpg";

/**
 * Used to add the image upload support to a route. Also used as uploader, using
 * the multer library.
 */
module.exports.addSupport = multer({
  storage: storage,
  fileFilter: imageFilter
}).single('image');

/**
 * Tries the upload in a synchronous way, and if no image is present, returns
 * undefined.
 * {@link type}.
 * @param {Object} req the req field of the request.
 * @param {Object} res the res field of the request.
 * @return {Promise<string|undefined>} A promise that, if completed, returns an
 * object that summarizes the outcome of the request. In case of error, the same
 * object is thrown, but must be intercepted inside the catch block.
 * @return {string}
 */
module.exports.syncUpload = async (req, res) => {
  let imageUrl;
  try {
    const upload = await upload(req, res);
    imageUrl = upload.imageUrl;
  } catch (e) {
    imageUrl = undefined;
  }

  return imageUrl;
}
