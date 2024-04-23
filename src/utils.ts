import { JsonServiceClient, toDate } from "@servicestack/client"
import { Post } from "."

export function formatDate(date) {
    const d = toDate(date)
    return d.getDate() + ' ' + d.toLocaleString('en-US', { month: 'short' }) + ' at '
        + `${d.getHours()}`.padStart(2, '0') + `:${d.getMinutes()}`.padStart(2, '0')
}

export function toHumanReadable(num: number) {
    if (num < 1e3) return num
    if (num >= 1e3 && num < 1e6) return +(num / 1e3).toFixed(1) + "k"
    if (num >= 1e6 && num < 1e9) return +(num / 1e6).toFixed(1) + "m"
    if (num >= 1e9 && num < 1e12) return +(num / 1e9).toFixed(1) + "b"
    if (num >= 1e12) return +(num / 1e12).toFixed(1) + "t"
}

export function log(o) {
    console.log(o)
    return o
}

export function getPostLink(post: Post) {
    return `https://pvq.app/posts/${post.slug}`
}

export function formatNumber(num: Number) {
    return Intl.NumberFormat().format(num)
}

export function createClient(baseUrl: string) {
    const client = new JsonServiceClient(baseUrl)
    client.mode = undefined // Not Implemented
    client.credentials = undefined // Not Implemented
    return client
}

export function idParts(id: number | string) {
    const idStr = `${id}`.padStart(9, '0')
    const dir1 = idStr.substring(0, 3)
    const dir2 = idStr.substring(3, 6)
    const fileId = idStr.substring(6)
    const file = fileId + '.json'
    const questionDir = `${dir1}/${dir2}`
    const metaDir = `${dir1}/${dir2}`
    const questionPath = `${questionDir}/${file}`
    const metaPath = `${questionDir}/${fileId}.meta.json`
    const vPath = `${metaDir}/${fileId}.v.json`
    return { dir1, dir2, fileId, file, questionDir, metaDir, questionPath, metaPath, vPath }
}

export function toRelativeNumber(val: string | Date | number) {
    if (val == null) return NaN
    if (typeof val == 'number')
        return val
    if (isDate(val))
        return (val as Date).getTime() - nowMs()
    if (typeof val === 'string') {
        let num = Number(val)
        if (!isNaN(num))
            return num
        if (val[0] === 'P' || val.startsWith('-P'))
            return fromXsdDuration(val) * 1000 * -1
        if (indexOfAny(val, DateChars) >= 0)
            return toDate(val).getTime() - nowMs()
    }
    return NaN
}

const symbols = /[\r\n%#()<>?[\\\]^`{|}]/g
let nowMs = () => new Date().getTime()
let defaultRtf = new Intl.RelativeTimeFormat("en", {})
let year = 24 * 60 * 60 * 1000 * 365
let units: { [k: string | Intl.RelativeTimeFormatUnit]: number } = {
    year,
    month: year / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
}

/** Format time in ms as Relative Time from now */
export function relativeTimeFromMs(elapsedMs: number, rtf?: Intl.RelativeTimeFormat) {
    for (let u in units) {
        if (Math.abs(elapsedMs) > units[u] || u === 'second')
            return (rtf || defaultRtf).format(Math.round(elapsedMs / units[u]), u as Intl.RelativeTimeFormatUnit)
    }
}

/** Format Date as Relative Time from now */
export function relativeTime(val: string | Date | number, rtf?: Intl.RelativeTimeFormat) {
    let num = toRelativeNumber(val)
    if (!isNaN(num))
        return relativeTimeFromMs(num, rtf)
    return ''
}

/** Format difference between dates as Relative Time */
export function relativeTimeFromDate(d: Date | string, from?: Date) {
    if (typeof d == 'string') {
        d = toDate(d)
    }
    return relativeTimeFromMs(d.getTime() - (from ? from.getTime() : nowMs()))
}

export function getAvatarUrl(userName?: string) {
    return userName
        ? `https://pvq.app/avatar/${userName}`
        : `https://localhost:5001/avatar/anon`
}

export function getModifiedDate(post: Post) {
    return post.lastEditDate ?? post.creationDate
}

export function gradeLetter(votes: number) {
    return votes >= 9
        ? 'A'
        : votes >= 6
            ? 'B'
            : votes >= 3
                ? 'C'
                : votes >= 2
                    ? 'D'
                    : 'F'
}

export function gradeBgColor(grade: string) {
    return grade == 'A'
        ? '#16a34a'
        : grade == 'B'
            ? '#2563eb'
            : grade == 'C'
                ? '"#4b5563'
                : grade == 'D'
                    ? '#dc2626'
                    : '#7f1d1d'
}

export function createSvg(letter: string, bgColor?: string, textColor?: string) {
    textColor ??= "#FFF"
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" style="isolation:isolate" viewBox="0 0 32 32">
    <path d="M0 0h32v32H0V0z" fill="${bgColor}" />
    <text font-family="Helvetica" font-size="20px" x="50%" y="50%" dy="0em" fill="${textColor}" alignment-baseline="central" text-anchor="middle">${letter}</text>
</svg>`
}

/** Encode SVG XML for usage in Data URIs */
export function encodeSvg(s:string) {
    s = s.replace(/"/g, `'`)
    s = s.replace(/>\s+</g, `><`)
    s = s.replace(/\s{2,}/g, ` `)
    return s.replace(symbols, encodeURIComponent)
}

/** Convert SVG XML to data:image URL */
export function svgToDataUri(svg:string) {
    return "data:image/svg+xml;utf8," + encodeSvg(svg)
}

export function createGradeDataUri(grade: string) {
    return svgToDataUri(createSvg(grade, gradeBgColor(grade), '#fff'))
}

const userToModelMap:Record<string,string> = {
    'phi':                'phi',
    'gemma-2b':           'gemma:2b',
    'qwen-4b':            'qwen:4b',
    'codellama':          'codellama',
    'llama3-8b':          'llama3:8b',
    'llama70-8b':         'llama70:8b',
    'gemma':              'gemma',
    'deepseek-coder':     'deepseek-coder:6.7b',
    'mistral':            'mistral',
    'mixtral':            'mixtral',
    'gemini-pro':         'gemini-pro',
    'deepseek-coder-33b': 'deepseek-coder:33b',
    'gpt4-turbo':         'gpt-4-turbo',
    'gpt3.5-turbo':       'gpt-3.5-turbo',
    'claude3-haiku':      'claude-3-haiku',
    'claude3-sonnet':     'claude-3-sonnet',
    'claude3-opus':       'claude-3-opus',
    'command-r':          'command-r',
    'wizardlm':           'wizardlm2:8x22b',
}
const modelToUserMap = Object.entries(userToModelMap).reduce((acc, [k,v]) => { acc[v] = k; return acc }, {})

export function userToModel(uerName:string) { return userToModelMap[uerName] ?? userName }
export function modelToUser(model:string) { return modelToUserMap[model] ?? model }
export function isModelUser(userName:string) { return !!userToModelMap[modelToUser(userName)] }
export function isHumanUser(userName:string) { return !isModelUser(userName) }
