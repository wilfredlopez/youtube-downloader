//@ts-check
const readline = require('readline')
const ytdl = require('ytdl-core')
const ffmpeg = require('fluent-ffmpeg')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const path = require('path')
const { DOWNLOADS_DIR } = require('./constants')
const { removeInvalidChars, verifyOrMakeDir } = require('./utils')

const args = process.argv

// let id = '3niVHCdB1wA'
const id = args[2]

if (typeof id === 'undefined' || typeof id !== 'string') {
  throw new Error('Please pass the youtube id as an argument')
}

ffmpeg.setFfmpegPath(ffmpegPath)

async function mp3Download(id) {
  try {
    verifyOrMakeDir(DOWNLOADS_DIR)
    const info = await ytdl.getBasicInfo(id)

    let title = removeInvalidChars(info.player_response.videoDetails.title)

    title = path.join(DOWNLOADS_DIR, `${title}.mp3`)

    let stream = ytdl(id, {
      quality: 'highestaudio',
    })

    let start = Date.now()
    ffmpeg(stream)
      .audioBitrate(128)
      .save(title)
      .on('progress', p => {
        readline.cursorTo(process.stdout, 0)
        process.stdout.write(`${p.targetSize}kb downloaded`)
      })
      .on('end', () => {
        console.log(`\ndone.  ${(Date.now() - start) / 1000}s`)
      })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

mp3Download(id)
