//@ts-check
const AudioController = require('express').Router()
const ytdl = require('ytdl-core')
const { getString, removeInvalidChars } = require('../utils')

AudioController.get('/downloadmp3', async (req, res) => {
  try {
    const url = getString(req.query.url)
    if (!ytdl.validateURL(url)) {
      return res.sendStatus(400)
    }

    const info = await ytdl.getBasicInfo(url)
    const title = removeInvalidChars(info.player_response.videoDetails.title)

    res.header('Content-Disposition', `attachment; filename="${title}.mp3"`)
    ytdl(url, {
      //@ts-ignore
      format: 'mp3',
      filter: 'audioonly',
      quality: 'highestaudio',
    }).pipe(res)
  } catch (err) {
    console.error(err)
  }
})

module.exports = AudioController
