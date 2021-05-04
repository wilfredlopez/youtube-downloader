/**
 *
 * @param {string | qs.ParsedQs | string[] | qs.ParsedQs[]} str
 * @returns {string}
 */
function getString(str) {
  if (typeof str === 'undefined') {
    return 'undefined'
  }
  if (typeof str === 'string') {
    return str
  }

  if (Array.isArray(str)) {
    let first = str[0]
    return getString(first)
  }
  if (Object.keys(str).length > 0) {
    const key1 = Object.keys(str)[0]
    return getString(str[key1])
  }
  let first = str[0] || ''
  return getString(first)
}

module.exports = getString
