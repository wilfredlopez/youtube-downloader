import { Answers, InputQuestion } from 'inquirer'
import { PREFIX } from './constants'




interface VideoIdAnswers extends Answers {
    ids: string
}


const INVALID_MESSAGE = 'Invalid Ids'
export const videoIdsQuestion: InputQuestion<VideoIdAnswers> = {
    name: 'ids',
    type: 'input',
    prefix: PREFIX,
    message: "Enter Video ids separated by spaces\n",
    validate: (videoIds) => {
        if (typeof videoIds !== 'string') {
            return INVALID_MESSAGE
        }

        if (videoIds.trim() === '') {
            return INVALID_MESSAGE
        }

        return true
    }

}