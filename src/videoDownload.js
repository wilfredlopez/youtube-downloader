//@ts-check
const readline = require('readline')
const colors = require('colors')
const ytdl = require('ytdl-core')
const ffmpeg = require('fluent-ffmpeg')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const path = require('path')
const { removeInvalidChars, verifyOrMakeDir } = require('./utils')
const { DOWNLOADS_DIR } = require('./constants')

const args = process.argv

// let id = '3niVHCdB1wA'
// const id = args[2]

const ids = args.slice(2)

if (typeof ids[0] === 'undefined' || typeof ids[0] !== 'string') {
  throw new Error('Please pass the youtube id as an argument')
}

ffmpeg.setFfmpegPath(ffmpegPath)

async function videoDownload(id, n = 1, total = 1) {
  try {
    verifyOrMakeDir(DOWNLOADS_DIR)
    const info = await ytdl.getBasicInfo(id)

    let title = removeInvalidChars(info.player_response.videoDetails.title)

    title = path.join(DOWNLOADS_DIR, `${title}.mp4`)

    let stream = ytdl(id, {
      //@ts-ignore
      format: 'mp4',
      quality: 'highest',
    })

    let start = Date.now()

    ffmpeg(stream)
      .audioBitrate(128)
      .save(title)
      .on('progress', p => {
        readline.cursorTo(process.stdout, 0, n + total + 1)
        process.stdout.write(
          colors.bgRed(`Video #${n}:`) + ` ${p.targetSize}kb downloaded`
        )
      })
      .on('end', () => {
        console.log(
          `\nvideo number ${n} done, thanks - ${(Date.now() - start) / 1000}s\n`
            .green
        )
      })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

async function init() {
  let n = 0
  for (let id of ids) {
    n++
    console.log(
      colors.blue('INFO: '),
      `downloading ${n} out of ${ids.length}. ID: ${id}`
    )
    videoDownload(id, n, ids.length)
  }
}

init()
