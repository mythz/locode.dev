import { getAvatarUrl, toHumanReadable, createGradeDataUri, gradeLetter, modelToUser } from "../utils"
import { renderMarkdown } from "../markdown"
import { Answer, QuestionAndAnswers } from "../dtos"
import PostComments from "./PostComments"

type Props = {
    question: QuestionAndAnswers
    answer: Answer
}

export default ({ question, answer }: Props) => {
    
    const userName = modelToUser(answer.model)
    const answerId = `${question.id}-${userName}`
    const votes = answer.modelVotes?.[userName]
    const reason = answer.modelReasons?.[userName]
    const gradedBy = answer.gradedBy?.[userName]
    const grade = gradeLetter(votes)

    function getAnswerScore(answerId:string) {
        const stat = question.meta.statTotals?.find(x => x.id === answerId)
        return !stat ? 1 : stat.startingUpVotes + stat.upVotes - stat.downVotes
    }
    
    function getReputation(userName:string) {
        return ''
    }
    
    function getAnswerComments(answerId: string) {
        return question.meta.answerComments?.[answerId] ?? []
    }

    return (<article data-answer={answerId} data-createdby={userName} className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div id={answerId} className="flex">
            <div className="md:w-32 pr-2">
                <div data-refid={answerId} className="voting flex flex-col items-center">
                    <svg className="up w-6 h-6 sm:w-10 sm:h-10 cursor-pointer select-none hover:text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Up Vote</title><path fill="currentColor" d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19m9-12.243L19.092 17H4.908z" />
                    </svg>
                    <b className="score text-xl" data-score={getAnswerScore(answerId)}>{toHumanReadable(getAnswerScore(answerId))}</b>
                    <svg className="down w-6 h-6 sm:w-10 sm:h-10 cursor-pointer select-none hover:text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Down Vote</title><path fill="currentColor" d="M21.886 5.536A1.002 1.002 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13a.998.998 0 0 0 1.644 0l9-13a.998.998 0 0 0 .064-1.033M12 17.243L4.908 7h14.184z" />
                    </svg>
                </div>
                <div className="mt-8 flex flex-col items-center">
                    <img className="w-10 h-10 xl:w-20 xl:h-20 bg-cover inline-block" src={getAvatarUrl(userName)} />
                    <div className="mt-1 hidden md:block text-center whitespace-nowrap text-xs xl:text-sm font-semibold">{userName}</div>
                    <div className="mt-1 flex items-center">
                        <svg className="h-4 w-4 text-yellow-500" viewBox="0 0 32 32">
                            <circle cx="16" cy="16" r="8" fill="currentColor" />
                        </svg>
                        <span data-rep-user={userName} className="text-xs font-semibold">{getReputation(userName)}</span>
                    </div>
                </div>
            </div>
            <div>
                {votes != null && reason
                    ? (<div className="relative -mt-6 lg:-mr-12 ml-4 mb-4 float-right w-10 h-10">
                        <div className="absolute mt-4 group" title={`Grade: ${grade}`}>
                            <img className="cursor-help	w-10 h-10 rounded-full" src={createGradeDataUri(grade)} alt={`Grade: ${grade}`} />
                            <div className="hidden group-hover:block absolute right-0 -mr-6 z-10 mt-2 flex w-screen max-w-max px-4">
                                <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                                    <div className="p-4">
                                        {renderMarkdown(reason)}
                                    </div>
                                    <div className="bg-gray-50 flex items-center justify-center gap-x-2.5 p-3 text-gray-900">
                                        <span>
                                            <b>{gradedBy ?? "mixtral"}</b> gave this answer {grade === 'A' || grade === 'F' ? "an" : "a"} <b>@grade</b> grade
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                    : null}

                <div id={`preview-${answerId}`} className="preview xl:flex-grow prose">
                    {renderMarkdown(answer.choices[0]?.message?.content)}
                </div>
                <div id={`edit-${answerId}`} className="edit w-full pl-2 hidden"></div>

                <div className="answer-footer">
                    <div className="pt-6 flex flex-1 items-end">
                        <div className="flex justify-end w-full">
                            <div className="text-xs">
                                <div className="flex">
                                    <span>answered</span>
                                    <dd className="ml-1 text-gray-600 dark:text-gray-300">
                                        <time className="ml-1" datetime="@Markdown.GetDateTimestamp(DateTimeOffset.FromUnixTimeSeconds(answer.Created).DateTime)">@Markdown.GetDateLabel(DateTimeOffset.FromUnixTimeSeconds(answer.Created).DateTime)</time>
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </div>

                    {question.post?.lockedDate == null
                        ? (<div data-answer={answerId} className="relative mt-4 text-sm">
                            <div className="share-dialog absolute"></div>
                            <span className="share-link mr-2 cursor-pointer select-none text-indigo-700 dark:text-indigo-300 hover:text-indigo-500" title="Share this Answer">share</span>
                            <span className="edit-link mr-2 cursor-pointer select-none text-indigo-700 dark:text-indigo-300 hover:text-indigo-500" title="Edit this Answer">edit</span>
                            <span className="flag-link mr-2 cursor-pointer select-none text-indigo-700 dark:text-indigo-300 hover:text-indigo-500" title="Flag this Answer">flag</span>
                        </div>)
                        : null}

                    <PostComments refId={answerId} comments={getAnswerComments(answerId)} />
                </div>
            </div>
        </div>
    </article>)
}
