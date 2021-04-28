const path = require('path')

const DOWNLOAD_DIR_NAME = 'downloads'
const PUBLIC_FOLDER_NAME = 'public'

const DOWNLOADS_DIR = path.join(__dirname, '..', DOWNLOAD_DIR_NAME)

const PUBLIC_FOLDER = path.join(__dirname, '..', PUBLIC_FOLDER_NAME)

module.exports = {
  DOWNLOADS_DIR,
  PUBLIC_FOLDER,
}
