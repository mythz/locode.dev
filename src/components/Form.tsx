import { Icon } from "@iconify/react"
import { ErrorResponse, errorResponse, errorResponseExcept, ResponseStatus, humanize, toPascalCase, classNames } from "@servicestack/client"

export function getRedirect(searchParams: URLSearchParams) {
    const redirect = searchParams.get('redirect')
    return redirect && Array.isArray(redirect)
        ? redirect[0]
        : redirect
}

const humanLabel = (s: string) => humanize(toPascalCase(s))

export type SuccessContext<T> = { response?: T }
export type SuccessEventHandler<T> = (ctx: SuccessContext<T>) => Promise<any> | void;

const input = {
    base: 'block w-full sm:text-sm rounded-md dark:text-white dark:bg-gray-900 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none',
    invalid: 'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500',
    valid: 'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600',
}

type ErrorSummaryProps = {
    status?: ResponseStatus
    className?: string
    except?: string | string[]
}
export const ErrorSummary = ({ status, className, except }:ErrorSummaryProps) => {
    const ctx = new ErrorResponse({
        responseStatus: status
    })
    const errorSummary = ctx.responseStatus ? errorResponseExcept.call(ctx, except ?? []) : null;
    if (!errorSummary) return null;

    return (<div className={classNames("bg-red-50 border-l-4 border-red-400 p-4", className)}>
        <div className="flex">
            <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41z"/></svg>
            </div>
            <div className="ml-3">
                <p className="text-sm text-red-700">{errorSummary}</p>
            </div>
        </div>
    </div>)
};

type TextInputProps = {
    status?: ResponseStatus
    id: string
    type?: string
    className?: string
    placeholder?: string
    help?: string
    label?: string
} | any
export const TextInput = ({ status, id, type, className, placeholder, help, label, ...remaining }: TextInputProps) => {

    const useType = type ?? 'text'
    const useLabel = label ?? humanLabel(id)
    const usePlaceholder = placeholder ?? useLabel
    const useHelp = help ?? ''

    const ctx = new ErrorResponse({
        responseStatus: status
    })
    const errorField = id && ctx.responseStatus && errorResponse.call(ctx, id)
    const hasErrorField = errorField != null

    const cssClass = (validCls?: string, invalidCls?: string) => [!hasErrorField ? validCls : invalidCls, className]

    if (!errorField && useHelp) {
        remaining['aria-describedby'] = `${id}-description`
    }

    return (<div>
        {!useLabel ? null : <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-200">{useLabel}</label>}
        <div className="mt-1 relative rounded-md shadow-sm">
            <input type={useType} className={classNames([input.base, ...cssClass(input.valid, input.invalid)])}
                id={id} name={id} placeholder={usePlaceholder} {...remaining} />
            {!hasErrorField ? null : <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {/*Heroicon name: solid/exclamation-circle*/}
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </div>}
        </div>
        {hasErrorField
            ? <p className="mt-2 text-sm text-red-500" id={`${id}-error`}>{errorField}</p>
            : useHelp
                ? <p id={`${id}-description`} className="text-gray-500 dark:text-gray-400">{useHelp}</p> : null}
    </div>)
}

type TextAreaInputProps = {
    status?: ResponseStatus
    id: string
    type?: string
    className?: string
    placeholder?: string
    help?: string
    label?: string
} | any
export const TextAreaInput = ({ status, id, className, placeholder, help, label, ...remaining }: TextAreaInputProps) => {

    const useLabel = label ?? humanLabel(id)
    const usePlaceholder = placeholder ?? useLabel
    const useHelp = help ?? ''

    const ctx = new ErrorResponse({
        responseStatus: status ?? useContext(ApiContext)?.error
    })
    const errorField = id && ctx.responseStatus && errorResponse.call(ctx, id)
    const hasErrorField = errorField != null

    const cssClass = (validCls?: string, invalidCls?: string) => [!hasErrorField ? validCls : invalidCls, className]

    if (!errorField && useHelp) {
        remaining['aria-describedby'] = `${id}-description`
    }

    return (<div>
        {!useLabel ? null : <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-200">{useLabel}</label>}
        <div className="mt-1 relative rounded-md shadow-sm">
            <textarea className={classNames(['shadow-sm block w-full sm:text-sm rounded-md', ...cssClass(
                'text-gray-900 dark:text-gray-50 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600',
                'text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300')])}
                id={id} name={id} placeholder={usePlaceholder} {...remaining} />
        </div>
        {hasErrorField
            ? <p className="mt-2 text-sm text-red-500" id={`${id}-error`}>{errorField}</p>
            : useHelp
                ? <p id={`${id}-description`} className="text-gray-500">{useHelp}</p> : null}
    </div>)
}

type SelectInputProps = {
    status?: ResponseStatus
    id: string
    className?: string
    placeholder?: string
    label?: string
    options?: any
    values?: string[]
} | any
export const SelectInput = ({ status, id, className, placeholder, help, label, options, values, ...remaining }:SelectInputProps) => {

    const useLabel = label ?? humanLabel(id)
    const usePlaceholder = placeholder ?? useLabel

    const ctx = new ErrorResponse({
        responseStatus: status
    })
    const errorField = id && ctx.responseStatus && errorResponse.call(ctx, id)
    const hasErrorField = errorField != null

    const cssClass = (validCls?: string, invalidCls?: string) => [!hasErrorField ? validCls : invalidCls, className]

    const kvpValues = () => values
        ? values.map((x: string) => ({ key: x, value: x }))
        : options
            ? Object.keys(options).map(key => ({ key, value: options[key] }))
            : []

    return (<>
        {!useLabel ? null : <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-200">{useLabel}</label>}
        <select className={classNames(['mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none border-gray-300 dark:border-gray-600 sm:text-sm rounded-md', ...cssClass(
            'text-gray-900 dark:text-gray-50 focus:ring-indigo-500 focus:border-indigo-500',
            'text-red-900 focus:ring-red-500 focus:border-red-500')])}
            id={id} name={id} placeholder={usePlaceholder} {...remaining}>
            {kvpValues().map(({ key, value }: { key: string, value: string }) => <option key={key} value={key}>{value}</option>)}
        </select>
        {!hasErrorField ? null : <p className="mt-2 text-sm text-red-500" id={`${id}-error`}>{errorField}</p>}
    </>)
}


type CheckboxProps = {
    status?: ResponseStatus
    id: string
    label: string
    help?: string
} | any
export const Checkbox = ({ status, id, label, help, ...remaining }:CheckboxProps) => {

    const useLabel = label ?? humanLabel(id)

    const ctx = new ErrorResponse({
        responseStatus: status
    })
    const errorField = id && ctx.responseStatus && errorResponse.call(ctx, id)
    const hasErrorField = errorField != null

    return (<div className="relative flex items-start">
        <div className="flex items-center h-5">
            <input
                id={id}
                name={id}
                type="checkbox"
                value="true"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                {...remaining} />
        </div>
        <div className="ml-3 text-sm">
            <label htmlFor={id} className="font-medium text-gray-700 dark:text-gray-200 select-none">{useLabel}</label>
            {hasErrorField
                ? <p className="mt-2 text-sm text-red-500" id="`${id}-error`">{errorField}</p>
                : help
                    ? <p className="mt-2 text-sm text-gray-500" id="`${id}-description`">{help}</p>
                    : null}
        </div>
    </div>)
}

type CloseButtonProps = {
    onClose: () => void
}
export const CloseButton = ({ onClose }:CloseButtonProps) => {
    return (<div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
        <button type="button" onClick={_ => onClose()}
            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>)
}

type LoadingProps = {
    className?: string
    loading?: boolean
    icon?: boolean
    text?: string
}
export const FormLoading = (props:LoadingProps) => {
    const loading = props.loading
    if (!loading) return null
    return Loading(props)
}

export const Loading = ({ className, icon, text }:LoadingProps) => {
    const showIcon = icon || icon === undefined;
    const showText = text === undefined ? "loading..." : text;
    let cls = ["flex", className];

    return (<div className={cls.join(' ')} title="loading...">
        {showIcon ? (<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30">
            <rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2">
                <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="8" y="10" width="4" height="10" fill="#333" opacity="0.2">
                <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="16" y="10" width="4" height="10" fill="#333" opacity="0.2">
                <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            </rect>
        </svg>) : null}
        <span className="ml-1 text-gray-400">{showText}</span>
    </div>)
}