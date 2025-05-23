import { getPostLink } from "../utils"

const posts = [
    { title: "Analyzing Voting Methods", slug: "individual-voting-comparison" },
    { title: "Generating the PvQ Leaderboard", slug: "leaderboard-intro" },
    { title: "Getting Help in the Age of LLMs", slug: "pvq-intro" },
]

type Props = {
    postId?: number
    tab?: string
    unsubscribe?: boolean
}

export default ({ postId, tab, unsubscribe }: Props) => (<div className="w-60 lg:w-80">
    <div class="py-2 overflow-hidden mb-4">
        <div class="bg-white">
            <div class="max-w-7xl px-6 lg:px-8">
                <h2 class="text-base font-semibold text-gray-600">
                    Sponsored By
                    <a href="https://servicestack.net" class="ml-1 text-center font-normal text-sm text-gray-700 dark:text-indigo-300 hover:text-indigo-500">servicestack.net</a>
                </h2>
                <a class="flex items-center" href="https://servicestack.net">
                    <svg class="w-12 h-12 text-gray-900 dark:text-gray-50" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M10 6c1.544 1.76 2.276 4.15 2.217 6.61c3.968 1.67 9.924 6.12 11.181 12.39H28C26.051 14.31 14.918 6.77 10 6zm-2 7c4.67 4.913.81 11.582-4 12h18.97C21.5 18.289 11.95 13.533 8 13z"></path></svg>
                    <span class="hidden sm:block text-2xl font-bold text-gray-900 dark:text-gray-50">ServiceStack</span>
                </a>
            </div>
        </div>
    </div>

    <div class="overflow-hidden rounded-xl border border-gray-200">
        <div class="flex items-center gap-x-2 lg:gap-x-4 border-b border-gray-900/5 dark:border-gray-50/5 bg-gray-50 dark:bg-gray-900 p-3 lg:p-6">
            <svg class="h-10 w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32m0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32m-96 16c0-26.5-21.5-48-48-48S0 117.5 0 144v224c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144h-16v96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48z" />
            </svg>
            <div class="text-lg lg:text-2xl font-medium leading-6 text-gray-900 dark:text-gray-50">from the blog</div>
        </div>
        <dl class="-my-3 divide-y divide-gray-100 px-3 lg:px-6 py-2 lg:py-4 leading-6 text-sm lg:text-base bg-white dark:bg-black">
            {posts.map(post => (
                <div class="flex justify-between gap-x-4 py-3">
                    <a href={getPostLink(post)} class="text-indigo-700 dark:text-indigo-300 hover:text-indigo-500">{post.title}</a>
                </div>
            ))}
        </dl>
    </div>
</div>)