import { setQueryString, leftPart } from "@servicestack/client"

type Props = {
    path: string
    tabs: string[]
    active: string
}

const tabName = (tab: string) => tab.split('-').map(x => x[0].toUpperCase() + x.substring(1)).join(' ')

export default ({ path, tabs, active }: Props) => (<div className="flex-grow max-w-sm">
    <div className="sm:hidden">
        <label for="tabs" className="sr-only">Select a tab</label>
        <select id="tabs" name="tabs" className="block sm:w-full rounded-md border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
            onchange={`location.href='${leftPart(path,'?')}?tab=' + this.value`}>
            {tabs.map(tab => (
                tab === active
                    ? <option value={tab} selected>{tabName(tab)}</option>
                    : <option value={tab}>{tabName(tab)}</option>
            ))}
        </select>
    </div>
    <div className="hidden sm:block">
        <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
                {tabs.map(tab => (
                    tab === active
                        ? <span className="border-indigo-500 text-indigo-600 dark:text-indigo-300 w-1/3 border-b-2 py-4 px-1 text-center text-sm font-medium" aria-current="page">{tabName(tab)}</span>
                        : <a href={setQueryString(path, { tab })} className="border-transparent text-gray-500 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200 w-1/3 border-b-2 py-4 px-1 text-center text-sm font-medium">{tabName(tab)}</a>
                ))}
            </nav>
        </div>
    </div>
</div>)
