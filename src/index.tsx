import { Hono } from 'hono'
import { Page } from './pages/page'
import { Top } from './pages/top'
import Questions from './pages/questions'
import { R2 } from './r2'
import { JsonServiceClient } from '@servicestack/client'
import { SearchPosts } from './dtos'

type Bindings = {
  PVQ_BUCKET: R2Bucket
}
type Variables = {
  BASE_URL: String
}

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

function createClient(baseUrl:string) {
  console.log('baseUrl', baseUrl)
  const client = new JsonServiceClient(baseUrl)
  client.mode = undefined // Not Implemented
  client.credentials = undefined // Not Implemented
  return client
}

// Model
export type Post = {
  id: string
  title: string
  body: string
}

const posts: Post[] = [
  { id: '1', title: 'Good Morning', body: 'Let us eat breakfast' },
  { id: '2', title: 'Good Afternoon', body: 'Let us eat Lunch' },
  { id: '3', title: 'Good Evening', body: 'Let us eat Dinner' },
  { id: '4', title: 'Good Night', body: 'Let us drink Beer' },
  { id: '5', title: 'こんにちは', body: '昼からビールを飲みます' }
]

// Logic
const getPosts = () => posts

const getPost = (id: string) => {
  return posts.find((post) => post.id == id)
}

// Controller
app.get('/', async c => {
  const posts = getPosts()
  const r2 = new R2(c.env.PVQ_BUCKET)
  const json = await r2.getContents('000/000/004.json')
  return c.html(<div>
    <Top posts={posts} />
  </div>)
})

app.get('/questions', async c => {
  console.log(c.env, )
  const client = createClient(c.env.BASE_URL)
  const { q, tab } = c.req.query()
  const api = await client.api(new SearchPosts({ q, view:tab }))
  console.log('api.response', api.response, api.error)

  return c.html(<Questions {...api.response} />)
})

app.get('/post/:id{[0-9]+}', (c) => {
  const id = c.req.param('id')
  const post = getPost(id)
  if (!post) return c.notFound()
  return c.html(<Page post={post} />)
})

export default app