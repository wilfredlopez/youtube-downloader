import readline from 'readline'
import colors from 'colors'
import ytdl from 'ytdl-core'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg'
import path from 'path'
import { removeInvalidChars } from './utils'


const ffmpegPath = ffmpegInstaller.path
ffmpeg.setFfmpegPath(ffmpegPath)

export async function videoDownload(DOWNLOADS_DIR: string, id: string, n = 1, total = 1) {
    const info = await ytdl.getBasicInfo(id)

    let title = removeInvalidChars(info.player_response.videoDetails.title)
    const rawTitle = (info.player_response.videoDetails.title || "").slice(0, 20)

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
            // const message = colors.bgRed(`${rawTitle}:`) + ` ${p.targetSize}kb downloaded`
            const message = colors.bgRed(`${p.targetSize}kb downloaded`)
            readline.cursorTo(process.stdout, 0, n + total + 1)
            process.stdout.write(message)
        })
        .on('end', () => {
            console.log(
                `\n${rawTitle} done in ${(Date.now() - start) / 1000}s\n`
                    .green
            )
        })

    return info
}

