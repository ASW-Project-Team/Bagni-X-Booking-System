/**
 * Static codes used to refer to errors and various HTTP statuses.
 * @type {{CREATED: number, SERVER_ERROR: number, UNAUTHORIZED: number,
 * BAD_REQUEST: number, NOT_FOUND: number, OK: number}}
 */
const HttpCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
}

/**
 * Returns an object, with a single field set with the given value, with key
 * 'description'.
 * @param description The value of the description field.
 * @return {{description: string}}
 */
const createDescription = function(description) {
  return { 'description' : description };
}

/**
 * Responds with a generic error from the server.
 * @param {Object} res The Express res object.
 * @param {string=} error The error string. If omitted, a standard response
 * is generated.
 */
module.exports.respondServerError = function (res, error) {
  const body = error
    ? createDescription(`Server error: ${error}`)
    : createDescription('Server error.');
  res.status(HttpCodes.SERVER_ERROR).json(body);
}

/**
 * Responds with a generic error from the server.
 * @param {Object} res The Express res object.
 * @param {string=} error The error string. If omitted, a standard response
 * is generated.
 */
module.exports.respondRequestError = function (res, error) {
  const body = error
    ? createDescription(`Error in the request: ${error}`)
    : createDescription('Error in the request.');
  res.status(HttpCodes.SERVER_ERROR).json(body);
}

/**
 * Responds to the sender with a 404 error.
 * @param {Object} res The Express res object.
 * @param {string=} referringItem The item to refer to. If omitted, a standard
 * response is generated.
 */
module.exports.respondNotFound = function (res, referringItem) {
  const item = referringItem ? referringItem : 'The item';
  const body = createDescription(`${item} not present.`);
  res.status(HttpCodes.NOT_FOUND).json(body);
}

/**
 * Responds with a 400 error, saying that the item is already present.
 * @param {Object} res The Express res object.
 * @param {string=} referringItem The item to refer to. If omitted, a standard
 * response is generated.
 */
module.exports.respondAlreadyPresent = function (res, referringItem) {
  const item = referringItem ? referringItem : 'The item';
  const body = createDescription(`${item} already present.`);
  res.status(HttpCodes.BAD_REQUEST).json(body);
}

/**
 * Responds with a 400 error, saying that the item is missing some required
 * fields.
 * @param {Object} res The Express res object.
 * @param {string=} referringItem The item to refer to. If omitted, a standard
 * response is generated.
 */
module.exports.respondMissingFields = function (res, referringItem) {
  const item = referringItem ? referringItem : 'The item';
  const body = createDescription(`${item} is missing some required fields.`);
  res.status(HttpCodes.BAD_REQUEST).json(body);
}

/**
 * Responds with a 401 error, saying that the request is malformed.
 * @param {Object} res The Express res object.
 */
module.exports.respondMalformedRequest = function (res) {
  const body = createDescription('Malformed request.');
  res.status(HttpCodes.BAD_REQUEST).json(body);
}

/**
 * Responds with a 401 error, saying that the user is not authorized to access
 * the content.
 * @param {Object} res The Express res object.
 */
module.exports.respondUnauthorized = function (res) {
  const body = createDescription(
    'You do not have permissions to access this content.'
  );

  res.status(HttpCodes.BAD_REQUEST).json(body);
}

/**
 * Responds with a status 200, including the response content for the client.
 * If omitted, a standard text is included.
 * @param {Object} res The Express res object.
 * @param {Object=} jsonBody The body of the response.
 */
module.exports.respondOK = function (res, jsonBody) {
  const body = jsonBody ? jsonBody : createDescription('Request served correctly.');
  res.status(HttpCodes.OK).json(body);
}

/**
 * Responds with a status 200, including the response content for the client.
 * If omitted, a standard text is included.
 * @param {Object} res The Express res object.
 * @param {Object=} jsonBody The body of the response. If omitted, a standard
 * text is used.
 * @param {string=} referringItem The name of the created item. If omitted, a
 * standard text is used.
 */
module.exports.respondCreated = function (res, jsonBody, referringItem) {
  const item = referringItem ? referringItem : 'The item';
  const body = jsonBody ? jsonBody : createDescription(`${item} has been correctly created.` );
  res.status(HttpCodes.CREATED).json(body);
}

