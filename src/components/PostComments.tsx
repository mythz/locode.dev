import { formatDate } from "../utils"
import { renderMarkdown } from "../markdown"

type Props = {
    refId: string
    comments: Comment[]
}

export default ({ refId, comments }: Props) => (<div data-comments={refId} className="mt-4 comments w-full">
{comments.length
    ? (<div className="border-t border-gray-200 dark:border-gray-700">
            {comments.map(comment => (
                <div id={`${refId}-${comment.created}`} data-id={refId} data-created={comment.created} data-createdby={comment.createdBy} className="py-2 border-b border-gray-100 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-300 prose prose-comment">
                    {renderMarkdown(comment.Body)}
                    <span className="inline-block">
                        <span className="px-1" aria-hidden="true">&middot;</span>
                        <span className="text-indigo-700">{comment.createdBy}</span>
                        <span className="ml-1 text-gray-400">{formatDate(new Date(comment.created))}</span>
                    </span>
                </div>
            ))}
        </div>)
    : null}
</div>)