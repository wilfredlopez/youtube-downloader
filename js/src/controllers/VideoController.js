//@ts-check
const ytdl = require('ytdl-core')
const { getString, removeInvalidChars } = require('../utils')

const VideoController = require('express').Router()

VideoController.get('/downloadmp4', async (req, res) => {
  try {
    const url = getString(req.query.url)
    if (!ytdl.validateURL(url)) {
      return res.sendStatus(400)
    }

    const info = await ytdl.getBasicInfo(url)
    const title = removeInvalidChars(info.player_response.videoDetails.title)

    res.header('Content-Disposition', `attachment; filename="${title}.mp4"`)
    ytdl(url, {
      //@ts-ignore
      format: 'mp4',
      quality: 'highest',
    }).pipe(res)
  } catch (err) {
    console.error(err)
  }
})

module.exports = VideoController
