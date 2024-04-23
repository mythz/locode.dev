export async function getResponse(path:string) {

    const object = await env.PVQ_BUCKET.get(path)

    if (object === null) {
        return new Response('Object Not Found', { status: 404 })
    }

    const headers = new Headers()
    object.writeHttpMetadata(headers)
    headers.set('etag', object.httpEtag)

    return new Response(object.body, {
        headers,
    })

}

export class R2 {
    bucket:R2Bucket

    constructor(bucket:R2Bucket) {
        this.bucket = bucket
    }

    async contents(path:string) {        
        const object = await this.bucket.get(path)
        if (object === null) return null
        return await object.text()
    }

    async list(options:R2ListOptions) {
        return await this.bucket.list(options)
    }
}
