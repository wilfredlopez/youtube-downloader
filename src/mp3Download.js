//@ts-check
const readline = require('readline')
const colors = require('colors')
const ytdl = require('ytdl-core')
const ffmpeg = require('fluent-ffmpeg')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const path = require('path')
const { DOWNLOADS_DIR } = require('./constants')
const { removeInvalidChars, verifyOrMakeDir } = require('./utils')

const args = process.argv

// let id = '3niVHCdB1wA'
// const id = args[2]

// if (typeof id === 'undefined' || typeof id !== 'string') {
//   throw new Error('Please pass the youtube id as an argument')
// }
const ids = args.slice(2)

if (typeof ids[0] === 'undefined' || typeof ids[0] !== 'string') {
  throw new Error('Please pass the youtube id as an argument')
}

ffmpeg.setFfmpegPath(ffmpegPath)

const audio_bit_rate = 128
// const audio_bit_rate = 320

async function mp3Download(id, n = 1, total = 1) {
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
      .audioBitrate(audio_bit_rate)
      .save(title)
      .on('progress', p => {
        readline.cursorTo(process.stdout, 0, n + total + 1)
        process.stdout.write(
          colors.bgRed(`Audio # ${n}:`) + ` ${p.targetSize}kb downloaded`
        )
      })
      .on('end', () => {
        console.log(
          `\nnumber ${n} done.  ${(Date.now() - start) / 1000}s`.green
        )
      })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

let n = 0
for (let id of ids) {
  n++
  console.log(colors.blue('INFO: '), `downloading ${n} out of ${ids.length}`)
  mp3Download(id, n)
}

// mp3Download(id)
