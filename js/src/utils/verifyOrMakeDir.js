const fs = require('fs')

/**
 *
 * @param {string} dir
 */
function verifyOrMakeDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

module.exports = verifyOrMakeDir
