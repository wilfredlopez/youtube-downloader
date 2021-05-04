#!/usr/bin/env node
import inquirer from 'inquirer'
import { downloadFolderQuestion } from './downloadFolderQuestion'
import { typeOfDownloadQuestion, DownloadTypes, DOWNLOAD_TYPES } from './downloadTypeQuestion'
import { mp3Download } from './mp3-download'
import { getAbsolutePathTo } from './utils'
import { videoDownload } from './video-download'
import { videoIdsQuestion } from './videoIdsQuestion'


async function main() {
    try {
        const downloadPath = await getDownloadPath()
        const videoIds = await getVideoIds()
        const type = await getAudioType()

        switch (type) {
            case DOWNLOAD_TYPES.Audio:
                execDownloads('Audio', videoIds, downloadPath)
                break
            case DOWNLOAD_TYPES.Video:
                execDownloads('Video', videoIds, downloadPath)
                break
            default:
                console.log("Unreachable Code...")
                break
        }
    } catch (error) {
        console.log(error)
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    }
}




async function execDownloads(type: DownloadTypes, videoIds: string[], downloadPath: string) {
    let startDownload = type === DOWNLOAD_TYPES.Audio ? mp3Download : videoDownload
    console.clear()
    console.log(`Starting ${type} download process\n`)
    let n = 0
    for (const id of videoIds) {
        n++
        try {
            await startDownload(downloadPath, id, n, videoIds.length)
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message)
            }
        }
    }
}



async function getDownloadPath() {
    const downloadFolderAnswer = await inquirer.prompt([downloadFolderQuestion])
    const downloadFolder = downloadFolderAnswer.folder
    const [downloadPath] = getAbsolutePathTo(downloadFolder)
    return downloadPath
}

async function getVideoIds() {
    const answers = await inquirer
        .prompt([
            videoIdsQuestion
        ])
    const ids = answers.ids.split(' ').map(id => id.trim()).filter(id => id.trim() !== '')
    return ids
}


async function getAudioType() {
    const answers = await inquirer
        .prompt([
            typeOfDownloadQuestion
        ])
    return answers.type
}


main()
