import manifest from '__STATIC_CONTENT_MANIFEST'
import { serveStatic } from 'hono/cloudflare-workers'
import { BlankInput } from 'hono/types'
import { Context, Hono } from 'hono'

import MarkdownPage from './components/MarkdownPage'
import Home from './pages/index'
import NotFound from './pages/404'
import Questions from './pages/questions'
import QuestionsTagged from './pages/questions/tagged'
import Question from './pages/questions/question'
import { R2 } from './r2'
import { PvqGateway } from './api'
import { idParts, modelToUser } from './utils'
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

const maxAge = (c: AppContext) => ({ maxAge: c.env.MAX_AGE ?? 11 })
const longMaxAge = (c: AppContext) => ({ maxAge: c.env.LONG_MAX_AGE ?? 11 })
const pvqGateway = (c: AppContext) => new PvqGateway(c.env.BASE_URL ?? "http://mythz.pvq.app")
const pvqBucket = (c: AppContext) => new R2(c.env.PVQ_BUCKET)
const pagingInfo = (c: AppContext) => {
  let { q, tab, page, pageSize } = c.req.query()
  pageSize = parseInt(pageSize) || 25
  page = parseInt(page) || 1
  const take = Math.min(pageSize, 50)
  const skip = isNaN(page) ? 1 : page * take
  // console.log('pagingInfo', { q, tab, skip, take, page, pageSize })
  return { q, tab, skip, take, page, pageSize }
}


app.get('/', async c => {
  return cacheResponse(c, async c => {
    const client = pvqGateway(c)
    let { tab, skip, take } = pagingInfo(c)
    const api = await client.search({ tab, skip, take })
    return c.html(<Home tab={tab} posts={api.response.results} />)
  }, maxAge(c))
})

app.get('/questions', async c => {
  return cacheResponse(c, async c => {
    const client = pvqGateway(c)
    let { q, tab, skip, take, page, pageSize } = pagingInfo(c)
    const api = await client.search({ q, tab, take, skip })
    return c.html(<Questions q={q} tab={tab} page={page} pageSize={pageSize} {...api.response} />)
  }, maxAge(c))
})

app.get('/questions/tagged/:tag', async c => {
  const tag = c.req.param('tag')
  return cacheResponse(c, async c => {
    const client = pvqGateway(c)
    let { tab, skip, take, page, pageSize } = pagingInfo(c)
    const q = `[${decodeURIComponent(tag)}]`
    const api = await client.search({ q, tab, skip, take })
    return c.html(<QuestionsTagged tag={tag} tab={tab} page={page} pageSize={pageSize} {...api.response} />)
  }, maxAge(c))
})

app.get('/questions/:id{[0-9]+}/:slug', (c) => {
  const id = c.req.param('id')

  return cacheResponse(c, async c => {
    const r2 = pvqBucket(c)
    const { questionPath, metaPath, questionDir, fileId } = idParts(id)
    const prefix = `${questionDir}/${fileId}.`

    const tasks = [
      r2.contents(questionPath),
      r2.contents(metaPath),
      r2.list({ prefix }),
    ]

    const [postJson, metaJson, answersList] = await Promise.all(tasks)

    if (!postJson || !metaJson) return c.notFound()

    const post = JSON.parse(postJson) as Post
    const meta = JSON.parse(metaJson) as Meta

    const answerKeys = answersList?.objects
      .map(x => x.key)
      .filter(x => lastRightPart(x, '/').substring(3).startsWith('.a.')) // || x.substring('000'.length).startsWith('.h.')

    const getTasks = answerKeys.map(key => r2.contents(key))
    const answerJsons = await Promise.all(getTasks)
    const answers = answerJsons.map(x => JSON.parse(x) as Answer)

    const answerVotes: Record<string, number> = {}
    answers.forEach(answer => {
      const userName = modelToUser(answer.model)
      const answerId = `${id}-${userName}`
      const modelVotes = meta?.modelVotes?.[userName] ?? 0
      const stat = meta?.statTotals?.find(x => x.id === answerId)
      const votes = !stat ? 1 : modelVotes + stat.upVotes - stat.downVotes
      answerVotes[answerId] = votes
    })
    answers.sort((a:Answer,b:Answer) => answerVotes[`${id}-${modelToUser(b.model)}`] ?? 0 - answerVotes[`${id}-${modelToUser(a.model)}`] ?? 0)

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
  { path: '/about', title: 'About locode' },
  { path: '/privacy', title: 'Privacy Policy' },
]

for (const { path, title } of Pages) {
  app.get(path, c => {
    return cacheResponse(c, async c => {
      return c.html(<MarkdownPage path={path} title={title} />)
    }, longMaxAge(c))
  })
}

// Doesn't work
//app.get('/static/*', serveStatic({ root: './', manifest }))

app.get('/:path{.*\\..*}', c => {
  const path = c.req.path
  console.log('path', path)
  return serveStatic({ path, manifest })(c)
})

app.get('*', c => c.html(<NotFound />))

export default app
