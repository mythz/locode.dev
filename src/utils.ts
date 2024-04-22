import { toDate } from "@servicestack/client"
import { Post } from "."

export function formatDate(date) {
    const d = toDate(date)
    return d.getDate() + ' ' + d.toLocaleString('en-US', {month: 'short'}) + ' at '
        + `${d.getHours()}`.padStart(2, '0') + `:${d.getMinutes()}`.padStart(2, '0')
}

export function toHumanReadable(num:number) {
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

export function getPostLink(post:Post) {
    return `https://pvq.app/posts/${post.slug}`
}
