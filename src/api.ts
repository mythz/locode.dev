import { JsonServiceClient } from "@servicestack/client"
import { createClient } from "./utils"
import { SearchPosts } from "./dtos"

export class PvqGateway {
    client: JsonServiceClient
    constructor(baseUrl: string) {
        this.client = createClient(baseUrl)
    }

    async search({ q, tab, page, pageSize }: { q?:string, tab?:string, page?:number, pageSize?:number }) {
        let take = Math.min(parseInt(pageSize) || 25, 50)
        let skip = isNaN(page) ? 1 : parseInt(page) * take
        const api = await this.client.api(new SearchPosts({ q, view: tab, take, skip }))
        return api
    }
}