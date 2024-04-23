import { ucFirst } from "@servicestack/client"
import Aside from "../components/Aside"
import Layout from "../components/Layout"
import PrimaryButton from "../components/PrimaryButton"
import QuestionPosts from "../components/QuestionPosts"
import QuestionViewTabs from "../components/QuestionViewTabs"
import { Post } from "../dtos"

const Tabs = ["interesting", "popular", "newest"]

type Props = {
    tab?: string
    posts: Post[]
}

export default ({ tab, posts }: Props) => {
    const active = tab ?? Tabs[0]
    const title = `${ucFirst(active)} Questions`

    return (<Layout title={title}>
        <div className="pt-12 pb-24 md:grid md:grid-cols-8 md:gap-x-8 max-w-screen-xl mx-auto">
            <div className="md:col-span-6">

                <div className="">
                    <div className="mb-4 flex justify-between">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
                            <span className="block xl:inline"><span className="lg:inline hidden">Top </span>Questions</span>
                        </h1>
                        <div className="w-full sm:w-96 text-right">
                            <div className="mb-4">
                                <PrimaryButton href="https://pvq.app/questions/ask">Ask Question</PrimaryButton>
                            </div>
                            <QuestionViewTabs path="/" tabs={Tabs} active={active} />
                        </div>
                    </div>

                    <QuestionPosts posts={posts} />
                </div>

            </div>
            <div className="md:col-span-2 pt-8 md:pt-24 pb-12">
                <Aside />
            </div>
        </div>
    </Layout>)
}