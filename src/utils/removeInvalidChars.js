/**
 *
 * @param {string} str
 * @returns
 */
function removeInvalidChars(str) {
  return str.replace(/[^\x00-\x7F]/g, '').replace(/\"/gim, '')
}

module.exports = removeInvalidChars
