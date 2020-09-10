/**
 * Implements pagination, based in given items (supposed in order), and the
 * given page size and id. If omitted, default are used.
 * @param {number=} pageIdParam - the id of the page, from 0 to n, default 0.
 * @param {number=} pageSizeParam - the size of the page, default to 10.
 * @param {Object[]} items - an array of objects.
 * @return {Object[]} the items in the range, of an empty array, if they aren't.
 */
module.exports.filterByPage = (pageIdParam, pageSizeParam, items) => {
  const pageId = pageIdParam ? pageIdParam : 0;
  const pageSize = pageSizeParam ? pageSizeParam : 10;

  const pageStartIndex = pageId * pageSize;
  const pageEndIndex = pageStartIndex + pageSize - 1;

  if (items === undefined || items.length <= 0) {
    return [];
  }

  return items.filter((item, index) => index >= pageStartIndex && index <= pageEndIndex);
}


/**
 * Removes from the giver array information that are not secure to send to the
 * requester.
 * @param {Object[]} items - The array of db documents
 * @return {Object[]} The objects without sensitive information, neither db data
 */
module.exports.filterSensitiveInfo = (items) => {
  if (items === undefined) {
    return [];
  }

  return items.map(item => module.exports.filterSensitiveInfoObj(item));
}


/**
 * Removes from the given objsct information that are not secure to send to the
 * requester.
 * @param {Object} item - The db document
 * @return {Object} The object without sensitive information, neither db data
 */
module.exports.filterSensitiveInfoObj = (item) => {
  if (item === undefined) {
    return undefined;
  }

  // transform the document in a plain javascript object
  let plainItem = item.toObject();

  // removes mongoose version number
  delete plainItem['__v'];
  delete plainItem.hash;

  if (plainItem._id) {
    delete Object.assign(plainItem, {id: plainItem._id })._id;
  }

  // sensitive information, do not send to the client
  return plainItem;
}
