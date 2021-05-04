import path from 'path'
import fs from 'fs'

export function getAbsolutePathTo(folder: string) {
    const cwd = process.cwd()
    const dp = path.resolve(cwd, folder)
    const exists = fs.existsSync(dp)
    return [dp, exists] as const
}

/**
 *
 * @param {string} str
 * @returns
 */
export function removeInvalidChars(str: string) {
    return str
        .replace(/[^\x00-\x7F]/gim, '')
        .replace(/\"/gim, '')
        .replace(/[\']?[\!]?[\|]?[\?]?/gim, '')
}

