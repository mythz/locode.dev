import { setQueryString, ucFirst } from '@servicestack/client'
import { ErrorSummary, Loading } from '../../components/Form'
import Layout from '../../components/Layout'
import QuestionViewTabs from '../../components/QuestionViewTabs'
import PagesNav from '../../components/PagesNav'
import Aside from '../../components/Aside'
import QuestionPosts from '../../components/QuestionPosts'
import PrimaryButton from '../../components/PrimaryButton'
import { SearchPostsResponse } from '../../dtos'

export default ({ q, tab, page, pageSize, results, total, responseStatus }: SearchPostsResponse) => {

    const tabs = q
        ? ["relevance", "newest", "oldest"]
        : ["interesting", "popular", "newest"]

    const path = setQueryString(`/questions`, { q, tab, page, pageSize })

    const active = tab ?? tabs[0]
    const title = `${ucFirst(active)} Questions`

    return (<Layout title={title}>
    <div class="pt-12 pb-24 md:grid md:grid-cols-8 md:gap-x-8 max-w-screen-xl mx-auto">
        <div class="md:col-span-6">
            {!responseStatus
                ? (<div class="mx-auto">
                    {results.length > 0
                        ? (<>
                            <div class="mb-4 flex justify-between">
                                <div>
                                    <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
                                        <span class="lg:inline hidden">
                                            All Questions
                                        </span>
                                    </h1>
                                    {q ? <h4 class="lg:mt-4 text-2xl">results for '{q}'</h4> : null}
                                </div>
                                <div class="w-full sm:w-96 text-right">
                                    <div class="mb-4">
                                        <PrimaryButton href="https://pvq.app/questions/ask">Ask Question</PrimaryButton>
                                    </div>
                                    <QuestionViewTabs path={path} tabs={tabs} active={active} />
                                </div>
                            </div>

                            {total > pageSize
                                ? (<PagesNav class="border-b" path={path} tab={tab} pageSize={pageSize} total={total} page={Math.max(1, page ?? 1)} />)
                                : null}

                            <QuestionPosts posts={results} />

                            {total > pageSize
                                ? (<PagesNav class="border-t" path={path} tab={tab} pageSize={pageSize} total={total} page={Math.max(1, page ?? 1)} />)
                                : null}
                        </>)

                        : (<div class="mt-8 text-lg">This search return no results.</div>)}

                </div>)
                : (<div class="mt-3 mb-20 mx-auto max-w-fit">
                    {responseStatus?.errorCode
                        ? (<ErrorSummary status={responseStatus} />)
                        : (<Loading />)}
                </div>)}
        </div>
        <div class="md:col-span-2 pt-8 md:pt-24 pb-12">
            <Aside />
        </div>
    </div>
</Layout>)
}
