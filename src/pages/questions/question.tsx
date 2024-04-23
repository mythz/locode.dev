import { ErrorSummary } from "../../components/Form"
import Layout from "../../components/Layout"
import Aside from "../../components/Aside"
import QuestionPost from "../../components/QuestionPost"
import { QuestionAndAnswers, ResponseStatus } from "../../dtos"

type Props = {
    question?: QuestionAndAnswers
    error?: ResponseStatus
}

export default ({ question, error }: Props) => (
    <Layout title={question?.post?.title}>
        <div class="pt-12 pb-24 lg:grid lg:grid-cols-8 lg:gap-x-8 max-w-screen-xl mx-auto">
            <div class="lg:col-span-6">
                {question
                    ? <QuestionPost question={question} />
                    : (<div class="mt-3 mb-20 mx-auto max-w-fit">
                        <ErrorSummary status={error} />
                    </div>)}
            </div>
            <div class="lg:col-span-2 pt-8 lg:pt-24 pb-12">
                <Aside />
            </div>
        </div>
    </Layout>
)