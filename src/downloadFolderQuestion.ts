import { Answers, InputQuestion } from 'inquirer'
import { PREFIX } from './constants'

import { getAbsolutePathTo } from './utils'
interface DownloadFolderAnswer extends Answers {
    folder: string
}

export const downloadFolderQuestion: InputQuestion<DownloadFolderAnswer> = {
    name: 'folder',
    type: 'input',
    prefix: PREFIX,
    message: "Enter the download path or '.' for CWD:\n",
    validate: (downloadFolder) => {
        const [, exists] = getAbsolutePathTo(downloadFolder)
        if (exists) {
            return true
        }
        return 'Please enter a valid folder'
    }

}