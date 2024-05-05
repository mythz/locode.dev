import { html } from 'hono/html'
import Header from './Header'
import Footer from './Footer'

export default (props: { title: string; children?: any }) => {
    const title = (props.title || '') +  ' - locode.dev'
    return html`
  <!DOCTYPE html>
  <html lang="en"><head><meta charset="utf-8">
      <title>${title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <base href="/">
      <link rel="icon" href="https://assets.pvq.app/img/locode.svg" type="image/svg+xml" />
      <link rel="stylesheet" href="https://assets.pvq.app/css/app.css" />
      <link rel="stylesheet" href="https://assets.pvq.app/css/typography.css" />
      <link rel="stylesheet" href="https://assets.pvq.app/css/highlight.css" />
      <script>
        window.Blazor = {
            addEventListener: function () {}
        } //Mock
        window.BaseUrl = 'https://pvq.app'
      </script>
      <script type="importmap">
      {
        "imports": {
            "app.mjs": "https://assets.pvq.app/mjs/app.mjs",
            "dtos.mjs": "https://assets.pvq.app/mjs/dtos.mjs",
            "vue": "https://assets.pvq.app/lib/mjs/vue.min.mjs",
            "@servicestack/client": "https://assets.pvq.app/lib/mjs/servicestack-client.min.mjs",
            "@servicestack/vue": "https://assets.pvq.app/lib/mjs/servicestack-vue.min.mjs"
        }
      }
      </script>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7236493186446536"
      crossorigin="anonymous"></script>
      </head>
        <script type="module">
        import { useAuth, useMetadata } from "@servicestack/vue"
        const { signIn } = useAuth()

        const { loadMetadata } = useMetadata()
        loadMetadata({
            resolvePath: "https://assets.pvq.app/data/app.json",
            olderThan: window.Server ? null : location.search.includes('clear=metadata') ? 0 : 60 * 60 * 1000 //1hr
        })
        function assetsUrl(url) {
            return url.startsWith('http') 
                ? url 
                : 'https://assets.pvq.app' + url
        }
        </script>

        ${<Header />}

        <div class="min-h-screen sm:px-4 lg:px-6">
            <main role="main">
            ${props.children}
            </main>
        </div>

        ${<Footer />}

        <script type="module">
        import { remount } from "app.mjs"
        remount()
        </script>

    </html>`
}
