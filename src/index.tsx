import { BlankInput } from 'hono/types'
import { Context, Hono } from 'hono'

import Home from './pages/index'
import Questions from './pages/questions'
import QuestionsTagged from './pages/questions/tagged'
import Question from './pages/questions/question'
import MarkdownPage from './components/MarkdownPage'
import { R2 } from './r2'
import { PvqGateway } from './api'
import { idParts } from './utils'
import { Post, Meta, QuestionAndAnswers, Answer } from './dtos'
import { lastRightPart } from '@servicestack/client'

type Bindings = {
  PVQ_BUCKET: R2Bucket
}
type Variables = {
  BASE_URL: String
  MAX_AGE: number
  LONG_MAX_AGE: number
}

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

const cache = caches.default

type AppContext = Context<{ Bindings: Bindings; Variables: Variables; }, string, BlankInput>
type CacheOptions = {
  maxAge?: number
}

async function cacheResponse(c: AppContext, fn: (c: AppContext) => Response | Promise<Response>, options: CacheOptions = {}) {
  let request = c.req.raw as Request
  let response = await cache.match(request)
  if (response) {
    return response
  } else {
    response = await fn(c)
    if (options.maxAge) {
      response.headers.append('Cache-Control', `s-maxage=${options.maxAge}`)
    }
    c.executionCtx.waitUntil(cache.put(request, response.clone()))
    return response
  }
}

const maxAge = (c:AppContext) => ({ maxAge: c.env.MAX_AGE ?? 10 })
const longMaxAge = (c:AppContext) => ({ maxAge: c.env.LONG_MAX_AGE ?? 10 })

app.get('/', async c => {
  return cacheResponse(c, async c => {
    const client = new PvqGateway(c.env.BASE_URL)
    let { tab, page, pageSize } = c.req.query()
    const api = await client.search({ tab, page, pageSize })
    return c.html(<Home tab={tab} posts={api.response.results} />)
  }, maxAge(c))
})

app.get('/questions', async c => {
  return cacheResponse(c, async c => {
    const client = new PvqGateway(c.env.BASE_URL)
    let { q, tab, page, pageSize } = c.req.query()
    const api = await client.search({ q, tab, page, pageSize })
    return c.html(<Questions q={q} tab={tab} page={page} pageSize={pageSize} {...api.response} />)
  }, maxAge(c))
})

app.get('/questions/tagged/:tag', async c => {
  return cacheResponse(c, async c => {
    const client = new PvqGateway(c.env.BASE_URL)
    let { tab, page, pageSize } = c.req.query()
    const tag = c.req.param('tag')
    const q = `[${decodeURIComponent(tag)}]`
    const api = await client.search({ q, tab, page, pageSize })
    return c.html(<QuestionsTagged tag={tag} tab={tab} page={page} pageSize={pageSize} {...api.response} />)
  }, maxAge(c))
})

app.get('/questions/:id{[0-9]+}/:slug', (c) => {
  const id = c.req.param('id')

  return cacheResponse(c, async c => {
    const r2 = new R2(c.env.PVQ_BUCKET)
    const { questionPath, metaPath, questionDir, fileId } = idParts(id)
    const prefix = `${questionDir}/${fileId}.`

    const tasks = [
      r2.contents(questionPath),
      r2.contents(metaPath),
      r2.list({ prefix }),
    ]

    const [ postJson, metaJson, answersList ] = await Promise.all(tasks)

    if (!postJson || !metaJson) return c.notFound()

    const post = JSON.parse(postJson) as Post
    const meta = JSON.parse(metaJson) as Meta

    const answerKeys = answersList?.objects
      .map(x => x.key)
      .filter(x => lastRightPart(x, '/').substring(3).startsWith('.a.')) // || x.substring('000'.length).startsWith('.h.')

    const getTasks = answerKeys.map(key => r2.contents(key))
    const answerJsons = await Promise.all(getTasks)
    const answers = answerJsons.map(x => JSON.parse(x) as Answer)

    const question = new QuestionAndAnswers({
      id: id,      
      post: post,
      meta: meta,
      viewCount: post.viewCount,
      questionScore: post.score,
      questionComments: meta.comments?.[id] ?? [],
      answers,      
    })

    return c.html(<Question question={question} />)
  }, maxAge(c))
})

app.get(`/Account/*`, c => {
  const url = new URL(c.req.url)
  url.protocol = 'https'
  url.hostname = 'pvq.app'
  return c.redirect(url.toString())
})

const Pages = [
  { path:'/about', title: 'About locode' },
  { path:'/privacy', title: 'Privacy Policy' },
]

for (const { path, title } of Pages) {
  app.get(path, c => {
    return cacheResponse(c, async c => {
      return c.html(<MarkdownPage path={path} title={title} />)
    }, longMaxAge(c))
  })
}

export default app
