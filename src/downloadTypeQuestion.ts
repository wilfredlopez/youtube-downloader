import { Answers, ListQuestion } from 'inquirer'
import { PREFIX } from './constants'

export type DownloadTypes = "Video" | "Audio"
interface DownloadTypeAnswers extends Answers {
    type: DownloadTypes
}

export const DOWNLOAD_TYPES: Record<DownloadTypes, DownloadTypes> = {
    Video: "Video",
    Audio: "Audio"
}

export const typeOfDownloadQuestion: ListQuestion<DownloadTypeAnswers> = {
    message: "Download Type",
    name: "type",
    type: 'list',
    prefix: PREFIX,
    choices: [DOWNLOAD_TYPES.Audio
        , DOWNLOAD_TYPES.Video],
    validate: (type) => {
        if (type !== DOWNLOAD_TYPES.Audio || type !== DOWNLOAD_TYPES.Video) {
            return 'Invalid Type'
        }
        return true
    },
}



