import { Post } from '../dtos'
import { formatDate, log, toHumanReadable } from '../utils'

type Props = {
    posts: Post[]
}

function getHref(post: Post) {
    return `questions/${post.id}/${post.slug}`
}

function getModifiedDate(post: Post) {
    return post.lastEditDate ?? post.creationDate
}

export default ({ posts }: Props) => (<div> 
    {posts.map(post => (
        <div className="flex sm:space-x-6 border-b border-gray-200 dark:border-gray-700 py-4">
            <div className="hidden md:flex flex-col text-center align-middle shrink-0 w-28">
                {post.postTypeId === 2
                    ? (<div className="pt-4 w-full flex justify-center">
                        <a href={getHref(post)} title="Answer">
                            <svg className="w-10 h-10 text-green-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm8 2a2 2 0 0 0-2 2v8h2v-4h2v4h2V9a2 2 0 0 0-2-2zm0 2h2v2h-2z" /></svg>
                        </a>
                    </div>)
                    : (<>
                        <div className="text-gray-600 dark:text-gray-300 whitespace-nowrap">{toHumanReadable(post.score)} votes</div>
                        <div className="my-2 text-center items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20 whitespace-nowrap">
                            <a href={getHref(post)}>
                                {post.answerCount != 1 ? `${post.answerCount ?? 0} answers` : "1 answer"}
                            </a>
                        </div>
                        <div className="text-gray-600 dark:text-gray-300 whitespace-nowrap">{toHumanReadable(post.viewCount)} views</div>
                    </>)}
            </div>
            <div>
                <div>
                    <h4 className="font-medium text-indigo-700 dark:text-indigo-300 hover:text-indigo-500 sm:text-lg">
                        <a href={getHref(post)}>{post.title}</a>
                    </h4>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{post.summary}</p>
                </div>
                <div className="mt-6 flex sm:flex-1 items-end">
                    <dl className="flex space-x-4 divide-x divide-gray-200 dark:divide-gray-800 text-sm sm:space-x-6 w-full">
                        <div className="flex flex-wrap gap-x-2 gap-y-2">
                            {(post.tags ?? []).map(tag => (
                                <a href={`questions/tagged/${encodeURIComponent(tag)}`} className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-200 ring-1 ring-inset ring-blue-700/10">{tag}</a>
                            ))}
                        </div>
                        <div className="flex flex-grow px-4 sm:px-6 text-xs justify-end">
                            <dt className="hidden sm:inline font-medium text-gray-600 dark:text-gray-300">Modified</dt>
                            <dd className="ml-2 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                                {formatDate(getModifiedDate(post))}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    ))}
</div>)