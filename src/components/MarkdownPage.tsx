import { renderMarkdown } from "../markdown"
import Layout from "./Layout"
import Content from '../content'

type Props = {
    title: string
    path: string
}

export default ({ title, path }: Props) => {
    const md = Content[path]
    return ((<Layout title={title}>
        <div class="mx-auto">
            <section class="text-center mt-16 mb-16 md:mb-12">
                <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-gray-50 sm:text-5xl md:text-6xl">
                    {title}
                </h1>
            </section>
            <div class="mx-auto prose lg:prose-xl mb-24">
                {renderMarkdown(md)}
            </div>
        </div>
    </Layout>))
}
