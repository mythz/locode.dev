import { JsonServiceClient } from "@servicestack/client"
import { createClient } from "./utils"
import { SearchPosts } from "./dtos"

export class PvqGateway {
    client: JsonServiceClient
    constructor(baseUrl: string) {
        this.client = createClient(baseUrl)
    }

    async search({ q, tab, take, skip }: { q?:string, tab?:string, take?:number, skip?:number }) {
        return await this.client.api(new SearchPosts({ q, view: tab, take, skip }))
    }
}