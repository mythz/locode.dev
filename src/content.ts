export default {
    '/about': `## Getting Help in the Age of LLMs

Like most developers we're captivated by the amazing things large language models are capable of and the potential they 
have to transform the way we interact with and use technology. One of the areas they can be immediately beneficial with
is in getting help in learning how to accomplish a task or solving a particular issue.

Previously we would need to seek out answers by scanning the Internet, reading through documentation and blogs to find
out answers for ourselves. Forums and particularly Stack Overflow have been a great resource for developers in being able
to get help from other developers who have faced similar issues. But the timeliness and quality of the responses can vary
based on the popularity of the question and the expertise of the person answering. Answers may also not be 100% relevant
to our specific situation, potentially requiring reading through multiple answers from multiple questions to get the help 
we want.

But now, with the advent of large language models, we can get help in a more natural way by simply asking a question in 
plain English and getting an immediate response that is tailored to our specific needs.

## Person vs Question

[locode.dev](https://locode.dev) is our attempt at providing a useful platform for other developers in this new age by enlisting
the help of large language models to provide immediate and relevant answers to your questions. But instead of just using
a single LLM to provide answers, we're using multiple models to provide different perspectives on the same question that
we'll use to analyze the strengths of different LLMs at answering different types of questions.

## Initial Base Line

For our initial dataset we're starting with the top 100k questions from StackOverflow and running them through a number
of quality Open LLMs that we've found to perform great for answering programming questions:

- [Phi-2](https://www.microsoft.com/en-us/research/blog/phi-2-the-surprising-power-of-small-language-models/) (2.7B) by Microsoft
- [Gemma 2B](https://ai.google.dev/gemma) (2B) by Google
- [Qwen 1.5](https://github.com/QwenLM/Qwen1.5) (4B) by Qwen Team
- [DeepSeek Coder 6.7B](https://github.com/QwenLM/Qwen1.5) (6.7B) by DeepSeek AI
- [Code Llama2 7B](https://llama.meta.com/llama2/) (7B) by Meta
- [Gemma 7B](https://ai.google.dev/gemma) (7B) by Google
- [Mistral 7B](https://mistral.ai/news/announcing-mistral-7b/) (7B) by Mistral AI
- [Mixtral 8x7B](https://mistral.ai/news/mixtral-of-experts/) (8x7B) by Mistral AI
- [DeepSeek Coder 33B](https://deepseekcoder.github.io/) (33B) by DeepSeek AI

Our initial pass will be to see how well each of these models perform on the StackOverflow dataset which we'll keep track
of and publish on our [Leaderboard](https://pvq.app/leaderboard) page which we're also comparing against the highest voted and 
accepted answers on StackOverflow to see how well they measure up against the best human answers. 

## Future Work

After establishing the initial base line we'll look towards evaluating different strategies and specialized models to 
see if we're able to improve the quality of answers that can be provided. 

## New Questions

For new questions asked we'll also include access to the best performing proprietary models to active users as they
[ask more questions](/questions/ask), including:

- [Claude 3 Haiku](https://www.anthropic.com/news/claude-3-haiku) by Anthropic
- [Gemini Pro](https://blog.google/technology/ai/google-gemini-ai/) by Google
- [Claude 3 Sonnet](https://www.anthropic.com/news/claude-3-family) by Anthropic
- [GPT 4 Turbo](https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo) by OpenAI
- [Claude 3 Opus](https://www.anthropic.com/claude) by Anthropic

## Open Questions and Answers for all

All questions, answers and comments is publicly available for everyone to freely use under the same 
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) license used by StackOverflow.

## Help us improve Answers

You can help us improve the quality of answers by providing any kind of feedback including asking new questions,
up voting good answers and down voting bad ones, correcting answers with inaccuracies or leaving comments suggesting 
improvements or adding additional context and clarifications to answers. Our most active users who help curate and improve 
the quality of questions and answers will have the opportunity to become moderators where they'll have access to
all our models.

We also welcome attempts to beat the large language models by providing your own answers to questions. We'll rank
new answers and include votes they receive from the community to determine the best answers. 

We'll use this feedback to update our leaderboard and improve the quality of answers provided.

## Feedback ❤️

We're still in the very early stages of development and would love to hear your feedback on how we can improve locode.dev 
to become a better platform for answering technical questions. You can provide feedback in our 
[GitHub Discussions](https://github.com/ServiceStack/pvq/discussions):

- [Feature Requests](https://github.com/ServiceStack/pvq/discussions/categories/ideas)
- [Report Issues](https://github.com/ServiceStack/pvq/issues)
- [General Feedback](https://github.com/ServiceStack/pvq/discussions)`,

// Privacy Policy

'/privacy':`locode is committed to providing quality services to you and this policy outlines our ongoing obligations to you in respect of how we manage your Personal Information.

We have adopted the Australian Privacy Principles (APPs) contained in the Privacy Act 1988 (Cth) (the Privacy Act). The NPPs govern the way in which we collect, use, disclose, store, secure and dispose of your Personal Information.

A copy of the Australian Privacy Principles may be obtained from the website of The Office of the Australian Information Commissioner at https://www.oaic.gov.au/.

What is Personal Information and why do we collect it?
Personal Information is information or an opinion that identifies an individual. Examples of Personal Information we collect includes names, addresses, email addresses, phone and facsimile numbers.

This Personal Information is obtained in many ways including [interviews, correspondence, by telephone and facsimile, by email, via our website locode.dev, from your website, from media and publications, from other publicly available sources, from cookies- delete all that aren’t applicable] and from third parties. We don’t guarantee website links or policy of authorised third parties.

We collect your Personal Information for the primary purpose of providing our services to you, providing information to our clients and marketing. We may also use your Personal Information for secondary purposes closely related to the primary purpose, in circumstances where you would reasonably expect such use or disclosure. You may unsubscribe from our mailing/marketing lists at any time by contacting us in writing.

When we collect Personal Information we will, where appropriate and where possible, explain to you why we are collecting the information and how we plan to use it.

Sensitive Information
Sensitive information is defined in the Privacy Act to include information or opinion about such things as an individual's racial or ethnic origin, political opinions, membership of a political association, religious or philosophical beliefs, membership of a trade union or other professional body, criminal record or health information.

Sensitive information will be used by us only:

- For the primary purpose for which it was obtained

- For a secondary purpose that is directly related to the primary purpose

- With your consent; or where required or authorised by law.

Third Parties
Where reasonable and practicable to do so, we will collect your Personal Information only from you. However, in some circumstances we may be provided with information by third parties. In such a case we will take reasonable steps to ensure that you are made aware of the information provided to us by the third party.

Disclosure of Personal Information
Your Personal Information may be disclosed in a number of circumstances including the following:

- Third parties where you consent to the use or disclosure; and

- Where required or authorised by law.

Security of Personal Information
Your Personal Information is stored in a manner that reasonably protects it from misuse and loss and from unauthorized access, modification or disclosure.

When your Personal Information is no longer needed for the purpose for which it was obtained, we will take reasonable steps to destroy or permanently de-identify your Personal Information. However, most of the Personal Information is or will be stored in client files which will be kept by us for a minimum of 7 years.

Access to your Personal Information
You may access the Personal Information we hold about you and to update and/or correct it, subject to certain exceptions. If you wish to access your Personal Information, please contact us in writing.

locode will not charge any fee for your access request, but may charge an administrative fee for providing a copy of your Personal Information.

In order to protect your Personal Information we may require identification from you before releasing the requested information.

Maintaining the Quality of your Personal Information
It is an important to us that your Personal Information is up to date. We  will  take reasonable steps to make sure that your Personal Information is accurate, complete and up-to-date. If you find that the information we have is not up to date or is inaccurate, please advise us as soon as practicable so we can update our records and ensure we can continue to provide quality services to you.

Policy Updates
This Policy may change from time to time and is available on our website.

Privacy Policy Complaints and Enquiries
If you have any queries or complaints about our Privacy Policy please contact us at:

team@locode.dev`,
} as {[path:string]:string}