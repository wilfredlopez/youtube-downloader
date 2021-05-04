//@ts-check
const ytdl = require('ytdl-core')
// const path = require('path')
// const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path

const AudioController = require('express').Router()
ffmpeg.setFfmpegPath(ffmpegPath)
const { getString, removeInvalidChars } = require('../utils')
const audio_bit_rate = 128

// AudioController.get('/downloadmp3(OLD)', async (req, res) => {
//   try {
//     const url = getString(req.query.url)
//     if (!ytdl.validateURL(url)) {
//       return res.sendStatus(400)
//     }

//     const info = await ytdl.getBasicInfo(url)
//     const title = removeInvalidChars(info.player_response.videoDetails.title)

//     res.header('Content-Disposition', `attachment; filename="${title}.mp3"`)
//     ytdl(url, {
//       //@ts-ignore
//       format: 'mp3',
//       filter: 'audioonly',
//       quality: 'highestaudio',
//     }).pipe(res)
//   } catch (err) {
//     console.error(err)
//   }
// })

AudioController.get('/downloadmp3', async (req, res) => {
  try {
    const url = getString(req.query.url)
    if (!ytdl.validateURL(url)) {
      return res.sendStatus(400)
    }

    const info = await ytdl.getBasicInfo(url)
    let title = removeInvalidChars(info.player_response.videoDetails.title)
    title = `${title}.mp3`

    res.header('Content-Disposition', `attachment; filename="${title}"`)
    const videoReadableStream = ytdl(url, {
      //@ts-ignore
      // format: 'mp3',
      // filter: 'audioonly',
      quality: 'highestaudio',
    })
    ffmpeg(videoReadableStream)
      .audioBitrate(audio_bit_rate)
      .outputFormat('mp3')
      .on('error', e => {
        res.send(e)
      })
      .pipe(res, { end: true })
  } catch (err) {
    console.error(err)
  }
})

module.exports = AudioController
