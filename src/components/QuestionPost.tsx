import { formatDate, getModifiedDate, relativeTimeFromDate, toHumanReadable, getAvatarUrl } from "../utils"
import { renderMarkdown } from "../markdown"
import { QuestionAndAnswers } from "../dtos"
import PostComments from "./PostComments"
import Answer from "./Answer"

type Props = {
    question: QuestionAndAnswers
}

export default ({ question }: Props) => {
    const post = question!.post
    const pvqUrl = `https://pvq.app/questions/${question.id}/${post.slug}`
    const now = new Date()
    return (
        <div className="mb-20" data-module="mjs/question.mjs">
            <article id="question" data-postid={question.id} data-createdby={post.createdBy}>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 lg:text-4xl xl:text-5xl">
                    <span className="block xl:inline">{post.title}</span>
                </h1>
                <div className="my-4 py-2 flex justify-between border-b border-gray-200 dark:border-gray-700">
                    <div className="flex gap-x-6 text-sm text-gray-500 dark:text-gray-400">
                        <div>
                            <a className="text-indigo-700 dark:text-indigo-200 hover:underline" href={pvqUrl}>asked</a>
                            <b className="ml-1">{relativeTimeFromDate(post.creationDate)}</b>
                        </div>
                        {post.lastEditDate != null && post.lastEditDate !== post.creationDate
                            ? (<div>
                                <span>last updated</span>
                                <b className="ml-1">{relativeTimeFromDate(post.lastEditDate)}</b>
                            </div>)
                            : null}

                        {question?.viewCount ?? 0 > 1
                            ? (<div>
                                <span>viewed</span>
                                <b className="ml-1">{toHumanReadable(question?.viewCount ?? 0)} times</b>
                            </div>)
                            : null}
                    </div>
                </div>
                <div id="@post.Id" className="flex">
                    <div className="md:w-32 pr-2">
                        <div data-refid={question.id} className="voting flex flex-col items-center pr-2">
                            <svg className="up w-6 h-6 sm:w-10 sm:h-10 cursor-pointer select-none hover:text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <title>Up Vote</title><path fill="currentColor" d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19m9-12.243L19.092 17H4.908z" />
                            </svg>
                            <b className="score text-xl" data-score={question.questionScore}>{toHumanReadable(question.questionScore)}</b>
                            <svg className="down w-6 h-6 sm:w-10 sm:h-10 cursor-pointer select-none hover:text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <title>Down Vote</title><path fill="currentColor" d="M21.886 5.536A1.002 1.002 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13a.998.998 0 0 0 1.644 0l9-13a.998.998 0 0 0 .064-1.033M12 17.243L4.908 7h14.184z" />
                            </svg>
                        </div>

                        {post.createdBy
                            ? (<div className="my-4 flex flex-col items-center text-sm">
                                <img className="w-10 h-10 xl:w-16 xl:h-16 bg-cover inline-block" src={getAvatarUrl(post.createdBy)} />
                                <div className="mt-1 hidden md:block text-center whitespace-nowrap font-semibold">{post.createdBy}</div>
                                <div className="mt-1 flex items-center">
                                    <svg className="h-4 w-4 text-yellow-500" viewBox="0 0 32 32">
                                        <circle cx="16" cy="16" r="8" fill="currentColor" />
                                    </svg>
                                    <span className="font-semibold" data-rep-user={post.createdBy}>1</span>
                                </div>
                            </div>)
                            : null}

                        <div className="question-aside"></div>
                    </div>
                    <div>
                        <div id={`preview-${question.id}`} className="pb-6 preview xl:flex-grow prose">
                            {renderMarkdown(post.body!)}
                        </div>
                        <div id={`edit-${question.id}`} className="edit w-full hidden"></div>

                        <div className="question-footer flex justify-between w-full items-center">
                            <div className="flex-grow">
                                <div className="flex space-x-4 divide-x divide-gray-200 dark:divide-gray-800 text-sm sm:space-x-6 w-full">
                                    <div className="flex flex-wrap gap-x-2 gap-y-2">
                                        {(post.tags ?? []).map(tag => (
                                            <a href={`questions/tagged/${encodeURIComponent(tag)}`} className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-200 ring-1 ring-inset ring-blue-700/10">{tag}</a>
                                        ))}
                                    </div>
                                </div>
                                {post.lockedDate
                                    ? (<div data-question={question.id} className="relative mt-4 text-sm">
                                        <span className="share-link mr-2 cursor-pointer select-none text-indigo-700 dark:text-indigo-300 hover:text-indigo-500" title="Share this Question">share</span>
                                        <span className="edit-link mr-2 cursor-pointer select-none text-indigo-700 dark:text-indigo-300 hover:text-indigo-500" title="Edit this Question">edit</span>
                                        <span className="flag-link mr-2 cursor-pointer select-none text-indigo-700 dark:text-indigo-300 hover:text-indigo-500" title="Flag this Question">flag</span>
                                    </div>)
                                    : null}
                            </div>
                            <div className="ml-2 text-xs">
                                <div className="flex">
                                    <span>{!post.lastEditDate ? "created" : "edited"}</span>
                                    <dd className="ml-1 text-gray-600 dark:text-gray-300">
                                        <time datetime={getModifiedDate(post)}>{formatDate(getModifiedDate(post))}</time>
                                        {post.modifiedBy && post.modifiedBy !== post.createdBy
                                            ? (<span>
                                                <span> by </span>
                                                <b>{post.modifiedBy}</b>
                                            </span>)
                                            : null}
                                    </dd>
                                </div>
                            </div>
                        </div>
                        <div className="pb-6 flex items-end w-full">
                            {post.lockedDate
                                ? (<div className="mt-4 w-full border-l-4 border-red-400 bg-red-50 p-4">
                                    <div className="flex w-full">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m-6 9c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2M9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2z" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-red-700">
                                                This question is locked.
                                                <span className="ml-1 font-semibold">{post.lockedReason}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>)
                                : null}
                            <PostComments refId={`${question.id}`} comments={question.questionComments} />
                        </div>

                    </div>
                </div>
            </article>

            <div id="answers" className="mt-16">
                {question.answers.length
                    ? (<h3 className="text-2xl font-semibold">
                        {question.answers.length} Answers
                    </h3>)
                    : null}
                <div>

                    {question.answers.length
                        ? (question.answers.map(answer => <Answer question={question} answer={answer} />))
                        : null}
                </div>
            </div>
        </div>
    )
}
