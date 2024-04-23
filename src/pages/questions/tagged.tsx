import { setQueryString } from '@servicestack/client'
import { ErrorSummary, Loading } from '../../components/Form'
import Layout from '../../components/Layout'
import QuestionViewTabs from '../../components/QuestionViewTabs'
import PagesNav from '../../components/PagesNav'
import Aside from '../../components/Aside'
import QuestionPosts from '../../components/QuestionPosts'
import { SearchPostsResponse } from '../../dtos'

export default ({ tag, tab, page, pageSize, results, total, responseStatus }: SearchPostsResponse) => {

    const tabs = ["relevance", "newest", "oldest"]

    const path = setQueryString(`/questions/tagged/${encodeURIComponent(tag)}`, { tab, page, pageSize })

    const title = 'Questions'
    return (<Layout title={title}>
        <div class="pt-12 pb-24 md:grid md:grid-cols-8 md:gap-x-8 max-w-screen-xl mx-auto">

            <div class="md:col-span-6">
                {!responseStatus
                    ? (<div class="mx-auto">
                        <div class="mb-4">
                            <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
                                <span class="block xl:inline"><span class="lg:inline hidden">Questions </span>tagged [{tag}]</span>
                            </h1>
                        </div>

                        {results.length > 0
                            ? (<>
                                <div class="py-2 flex justify-end">
                                    <QuestionViewTabs path={path} tabs={tabs} active={tab ?? tabs[0]} />
                                </div>

                                {total > pageSize
                                    ? (<PagesNav class="border-b" path={path} tab={tab} pageSize={pageSize} total={total} page={Math.max(1, page ?? 1)} />)
                                    : null}

                                <QuestionPosts posts={results} />

                                {total > pageSize
                                    ? (<PagesNav class="border-t" path={path} tab={tab} pageSize={pageSize} total={total} page={Math.max(1, page ?? 1)} />)
                                    : null}
                            </>)

                            : (<div class="mt-8 text-lg">
                                There are no questions tagged with <b class="ml-2 inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900 px-2 py-1 text-sm font-medium text-blue-700 dark:text-blue-200 ring-1 ring-inset ring-blue-700/10">{tag}</b>
                            </div>)}

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
