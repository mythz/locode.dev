import { classNames, setQueryString } from "@servicestack/client"
import { formatNumber } from "../utils"

type Props = {
    className?: string
    path?: string
    tab?: string
    pageSize?: number
    total?: number
    page?: number
}
const DefaultPageSize = 25
const PageSizes = [10, 25, 50]

export default ({ className, path, tab, pageSize, total, page }: Props) => {
    const usePageSize = pageSize || DefaultPageSize
    const pages = Math.ceil((total || 0) / usePageSize)
    const startPage = page > 1 ? Math.max(0, page - 3) : 0
    const endPage = Math.min(startPage + 5, pages)

    function getRoute(page?: number = 1, pageSize?: number = undefined) {
        return setQueryString(path, { page, pageSize })
    }

    return (<div className={classNames(className, "flex items-center justify-between border-gray-200 bg-white dark:bg-black py-3")}>
        {pages > 1 && total > 9 && total > pageSize
            ? (<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        <span className="hidden lg:inline">Showing</span>
                        <span className="px-1 font-medium">{page < 2 ? 1 : 1 + (page * usePageSize)}</span>
                        to
                        <span className="px-1 font-medium">{(page < 2 ? 1 : page * usePageSize) + usePageSize}</span>
                        of
                        <span className="px-1 font-medium">{formatNumber(total)}</span>
                        <span className="hidden lg:inline">results</span>
                    </p>
                </div>
                <div className="hidden md:block">
                    <span className="isolate inline-flex rounded-md shadow-sm">
                        {PageSizes.map(size => {
                            var cls = (size == 10
                                ? "rounded-l-md "
                                : size == 50
                                    ? "rounded-r-md "
                                    : "")
                                + (size == usePageSize
                                    ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    : "relative inline-flex items-center bg-white dark:bg-black px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10");
                            return <a href={getRoute(1, size)} className={cls}>{size}</a>
                        })}
                    </span>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        {startPage > 1
                            ? (<a href={getRoute(1, pageSize)} className="relative inline-flex items-center px-2 py-2 text-gray-400 hover:text-gray-500" title="First Page">
                                <span className="sr-only">First</span>
                                <svg className="h-5 w-5 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M8.5 5v14h-2V5zm9.164 1.75L12.414 12l5.25 5.25l-1.414 1.414L9.586 12l6.664-6.664z" /></svg>
                            </a>)
                            : null}

                        {page > 1
                            ? (<a href={getRoute(page - 1, pageSize)} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                <span className="sr-only">Previous</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                                </svg>
                            </a>)
                            : null}

                        {Array.from({ length: endPage - startPage }, (_, i) => startPage + i).map(p => {
                            const pageNo = p + 1
                            return page == pageNo
                                ? <a href={getRoute(pageNo, pageSize)} className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" aria-current="page">{pageNo}</a>
                                : <a href={getRoute(pageNo, pageSize)} className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">{pageNo}</a>
                        })}
                        {pages > endPage
                            ? (<>
                                <span className="relative hidden lg:inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                                <a href={getRoute(pages, pageSize)} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">{pages}</a>
                            </>)
                            : null}
                        {page < pages
                            ? (<a href={getRoute(page + 1, pageSize)} className="relative hidden lg:inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                <span className="sr-only">Next</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                </svg>
                            </a>)
                            : null}
                    </nav>
                </div>

            </div>)
            : (<div className="-mt-8">
                <p className="text-sm text-gray-700">
                    Showing
                    <span className="font-medium">{formatNumber(total)}</span>
                    results:
                </p>
            </div>)}

    </div>)
}