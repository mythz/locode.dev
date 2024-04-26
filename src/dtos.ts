/* Options:
Date: 2024-04-24 23:43:01
Version: 8.22
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: https://localhost:5001

//GlobalNamespace: 
//MakePropertiesOptional: False
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/


export interface IReturn<T>
{
    createResponse(): T;
}

export interface IReturnVoid
{
    createResponse(): void;
}

export interface IHasSessionId
{
    sessionId?: string;
}

export interface IHasBearerToken
{
    bearerToken?: string;
}

export interface IPost
{
}

export interface ICreateDb<Table>
{
}

export interface IGet
{
}

export interface IPatchDb<Table>
{
}

export interface IDeleteDb<Table>
{
}

export interface IUpdateDb<Table>
{
}

export class MailTo
{
    public email: string;
    public name: string;

    public constructor(init?: Partial<MailTo>) { (Object as any).assign(this, init); }
}

export class EmailMessage
{
    public to: MailTo[];
    public cc: MailTo[];
    public bcc: MailTo[];
    public from?: MailTo;
    public subject: string;
    public body?: string;
    public bodyHtml?: string;
    public bodyText?: string;

    public constructor(init?: Partial<EmailMessage>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseError
{
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public fieldName: string;

    // @DataMember(Order=3)
    public message: string;

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ResponseError>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseStatus
{
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public message: string;

    // @DataMember(Order=3)
    public stackTrace: string;

    // @DataMember(Order=4)
    public errors: ResponseError[];

    // @DataMember(Order=5)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ResponseStatus>) { (Object as any).assign(this, init); }
}

export class MailMessage
{
    public id: number;
    public email: string;
    public layout?: string;
    public template?: string;
    public renderer: string;
    public rendererArgs: { [index: string]: Object; };
    public message: EmailMessage;
    public draft: boolean;
    public externalRef: string;
    public createdDate: string;
    public startedDate?: string;
    public completedDate?: string;
    public error?: ResponseStatus;

    public constructor(init?: Partial<MailMessage>) { (Object as any).assign(this, init); }
}

export class SendMailMessages
{
    public ids?: number[];
    public messages?: MailMessage[];

    public constructor(init?: Partial<SendMailMessages>) { (Object as any).assign(this, init); }
}

export class CreateEmailBase
{
    // @Validate(Validator="NotEmpty")
    public email: string;

    // @Validate(Validator="NotEmpty")
    public firstName: string;

    // @Validate(Validator="NotEmpty")
    public lastName: string;

    public constructor(init?: Partial<CreateEmailBase>) { (Object as any).assign(this, init); }
}

export enum Source
{
    Unknown = 'Unknown',
    UI = 'UI',
    Website = 'Website',
    System = 'System',
    Migration = 'Migration',
}

// @Flags()
export enum MailingList
{
    None = 0,
    TestGroup = 1,
    MonthlyNewsletter = 2,
    BlogPostReleases = 4,
    VideoReleases = 8,
    ProductReleases = 16,
    YearlyUpdates = 32,
}

export class Contact
{
    public id: number;
    public email: string;
    public firstName: string;
    public lastName?: string;
    public source: Source;
    public mailingLists: MailingList;
    public token: string;
    public emailLower: string;
    public nameLower: string;
    public externalRef: string;
    public appUserId?: number;
    public createdDate: string;
    public verifiedDate?: string;
    public deletedDate?: string;
    public unsubscribedDate?: string;

    public constructor(init?: Partial<Contact>) { (Object as any).assign(this, init); }
}

export enum ImportSite
{
    Unknown = 'Unknown',
    StackOverflow = 'StackOverflow',
    Discourse = 'Discourse',
    Reddit = 'Reddit',
    GitHubDiscussions = 'GitHubDiscussions',
}

export enum FlagType
{
    Unknown = 'Unknown',
    Spam = 'Spam',
    Offensive = 'Offensive',
    Duplicate = 'Duplicate',
    NotRelevant = 'NotRelevant',
    LowQuality = 'LowQuality',
    Plagiarized = 'Plagiarized',
    NeedsReview = 'NeedsReview',
}

export class RegenerateMeta
{
    public ifPostModified?: number;
    public forPost?: number;

    public constructor(init?: Partial<RegenerateMeta>) { (Object as any).assign(this, init); }
}

/** @description StackOverflow Question */
export class Post
{
    public id: number;
    // @Required()
    public postTypeId: number;

    public acceptedAnswerId?: number;
    public parentId?: number;
    public score: number;
    public viewCount?: number;
    public title: string;
    public favoriteCount?: number;
    public creationDate: string;
    public lastActivityDate: string;
    public lastEditDate?: string;
    public lastEditorUserId?: number;
    public ownerUserId?: number;
    public tags: string[];
    public slug: string;
    public summary: string;
    public rankDate?: string;
    public answerCount?: number;
    public createdBy?: string;
    public modifiedBy?: string;
    public refId?: string;
    public body?: string;
    public modifiedReason?: string;
    public lockedDate?: string;
    public lockedReason?: string;

    public constructor(init?: Partial<Post>) { (Object as any).assign(this, init); }
}

export class RenderHome
{
    public tab?: string;
    public posts: Post[];

    public constructor(init?: Partial<RenderHome>) { (Object as any).assign(this, init); }
}

// @DataContract
export class QueryBase
{
    // @DataMember(Order=1)
    public skip?: number;

    // @DataMember(Order=2)
    public take?: number;

    // @DataMember(Order=3)
    public orderBy: string;

    // @DataMember(Order=4)
    public orderByDesc: string;

    // @DataMember(Order=5)
    public include: string;

    // @DataMember(Order=6)
    public fields: string;

    // @DataMember(Order=7)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<QueryBase>) { (Object as any).assign(this, init); }
}

export class QueryDb<T> extends QueryBase
{

    public constructor(init?: Partial<QueryDb<T>>) { super(init); (Object as any).assign(this, init); }
}

export enum InvalidEmailStatus
{
    Invalid = 'Invalid',
    AcceptAll = 'AcceptAll',
    Unknown = 'Unknown',
    Disposable = 'Disposable',
}

export class InvalidEmail
{
    public id: number;
    public email: string;
    public emailLower: string;
    public status: InvalidEmailStatus;

    public constructor(init?: Partial<InvalidEmail>) { (Object as any).assign(this, init); }
}

export class ArchiveMessage extends MailMessage
{

    public constructor(init?: Partial<ArchiveMessage>) { super(init); (Object as any).assign(this, init); }
}

export class MailRun
{
    public id: number;
    public mailingList: MailingList;
    public generator: string;
    public generatorArgs: { [index: string]: Object; };
    public layout: string;
    public template: string;
    public externalRef: string;
    public createdDate: string;
    public generatedDate?: string;
    public sentDate?: string;
    public completedDate?: string;
    public emailsCount: number;

    public constructor(init?: Partial<MailRun>) { (Object as any).assign(this, init); }
}

export class ArchiveRun extends MailRun
{

    public constructor(init?: Partial<ArchiveRun>) { super(init); (Object as any).assign(this, init); }
}

export class ArchiveMessageRun
{
    public id: number;
    public mailRunId: number;
    public contactId: number;
    public renderer: string;
    public rendererArgs: { [index: string]: Object; };
    public externalRef: string;
    public message: EmailMessage;
    public createdDate: string;
    public startedDate?: string;
    public completedDate?: string;
    public error?: ResponseStatus;

    public constructor(init?: Partial<ArchiveMessageRun>) { (Object as any).assign(this, init); }
}

export class MailMessageRun
{
    public id: number;
    public mailRunId: number;
    public contactId: number;
    public contact: Contact;
    public renderer: string;
    public rendererArgs: { [index: string]: Object; };
    public externalRef: string;
    public message: EmailMessage;
    public createdDate: string;
    public startedDate?: string;
    public completedDate?: string;
    public error?: ResponseStatus;

    public constructor(init?: Partial<MailMessageRun>) { (Object as any).assign(this, init); }
}

export class PageStats
{
    public label: string;
    public total: number;

    public constructor(init?: Partial<PageStats>) { (Object as any).assign(this, init); }
}

export class Comment
{
    public body: string;
    public created: number;
    public createdBy: string;
    public upVotes?: number;
    public reports?: number;

    public constructor(init?: Partial<Comment>) { (Object as any).assign(this, init); }
}

export class PostJob
{
    public id: number;
    public postId: number;
    public model: string;
    public title: string;
    public createdBy: string;
    public createdDate: string;
    public startedDate?: string;
    public worker?: string;
    public workerIp?: string;
    public completedDate?: string;
    public error?: string;
    public retryCount: number;

    public constructor(init?: Partial<PostJob>) { (Object as any).assign(this, init); }
}

export class ModelTotalStartUpVotes
{
    public id: string;
    public startingUpVotes: number;

    public constructor(init?: Partial<ModelTotalStartUpVotes>) { (Object as any).assign(this, init); }
}

export class LeaderBoardWinRate
{
    public id: string;
    public winRate: number;
    public numberOfQuestions: number;

    public constructor(init?: Partial<LeaderBoardWinRate>) { (Object as any).assign(this, init); }
}

export class ModelTotalScore
{
    public id: string;
    public totalScore: number;

    public constructor(init?: Partial<ModelTotalScore>) { (Object as any).assign(this, init); }
}

export class ModelWinRate
{
    public id: string;
    public winRate: number;
    public numberOfQuestions: number;

    public constructor(init?: Partial<ModelWinRate>) { (Object as any).assign(this, init); }
}

export class StatTotals
{
    public id: string;
    public postId: number;
    public createdBy?: string;
    public favoriteCount: number;
    public viewCount: number;
    public upVotes: number;
    public downVotes: number;
    public startingUpVotes: number;

    public constructor(init?: Partial<StatTotals>) { (Object as any).assign(this, init); }
}

export enum NotificationType
{
    Unknown = 'Unknown',
    NewComment = 'NewComment',
    NewAnswer = 'NewAnswer',
    QuestionMention = 'QuestionMention',
    AnswerMention = 'AnswerMention',
    CommentMention = 'CommentMention',
}

export class Notification
{
    public id: number;
    public userName: string;
    public type: NotificationType;
    public postId: number;
    public refId: string;
    public summary: string;
    public createdDate: string;
    public read: boolean;
    public href?: string;
    public title?: string;
    public refUserName?: string;

    public constructor(init?: Partial<Notification>) { (Object as any).assign(this, init); }
}

export enum AchievementType
{
    Unknown = 'Unknown',
    NewAnswer = 'NewAnswer',
    AnswerUpVote = 'AnswerUpVote',
    AnswerDownVote = 'AnswerDownVote',
    NewQuestion = 'NewQuestion',
    QuestionUpVote = 'QuestionUpVote',
    QuestionDownVote = 'QuestionDownVote',
}

export class Achievement
{
    public id: number;
    public userName: string;
    public type: AchievementType;
    public postId: number;
    public refId: string;
    public refUserName?: string;
    public score: number;
    public read: boolean;
    public href?: string;
    public title?: string;
    public createdDate: string;

    public constructor(init?: Partial<Achievement>) { (Object as any).assign(this, init); }
}

export class FindContactResponse
{
    public result: Contact;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<FindContactResponse>) { (Object as any).assign(this, init); }
}

export class ViewMailRunInfoResponse
{
    public messagesSent: number;
    public totalMessages: number;
    public timeTaken: string;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<ViewMailRunInfoResponse>) { (Object as any).assign(this, init); }
}

export class ViewAppDataResponse
{
    public websiteBaseUrl: string;
    public baseUrl: string;
    public vars: { [index: string]: { [index:string]: string; }; };
    public bannedUserIds: number[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<ViewAppDataResponse>) { (Object as any).assign(this, init); }
}

export class ViewAppStatsResponse
{
    public totals: { [index: string]: number; };
    public before30DayTotals: { [index: string]: number; };
    public last30DayTotals: { [index: string]: number; };
    public archivedTotals: { [index: string]: number; };
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<ViewAppStatsResponse>) { (Object as any).assign(this, init); }
}

export class ArchiveMailResponse
{
    public archivedMessageIds: number[];
    public archivedMailRunIds: number[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<ArchiveMailResponse>) { (Object as any).assign(this, init); }
}

export class HelloResponse
{
    public result: string;

    public constructor(init?: Partial<HelloResponse>) { (Object as any).assign(this, init); }
}

export class AdminDataResponse
{
    public pageStats: PageStats[];

    public constructor(init?: Partial<AdminDataResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class StringResponse
{
    // @DataMember(Order=1)
    public result: string;

    // @DataMember(Order=2)
    public meta: { [index: string]: string; };

    // @DataMember(Order=3)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<StringResponse>) { (Object as any).assign(this, init); }
}

export class Meta
{
    public id: number;
    public modelVotes: { [index: string]: number; };
    public modelReasons: { [index: string]: string; };
    public gradedBy: { [index: string]: string; };
    public comments: { [index: string]: Comment[]; };
    public statTotals: StatTotals[];
    public modifiedDate: string;

    public constructor(init?: Partial<Meta>) { (Object as any).assign(this, init); }
}

export class QuestionAndAnswers
{
    public id: number;
    public post: Post;
    public meta?: Meta;
    public answers: Post[];
    public viewCount: number;
    public questionScore: number;
    public questionComments: Comment[];

    public constructor(init?: Partial<QuestionAndAnswers>) { (Object as any).assign(this, init); }
}

export class SearchPostsResponse
{
    public total: number;
    public results: Post[];
    public responseStatus?: ResponseStatus;

    public constructor(init?: Partial<SearchPostsResponse>) { (Object as any).assign(this, init); }
}

export class ViewModelQueuesResponse
{
    public jobs: PostJob[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<ViewModelQueuesResponse>) { (Object as any).assign(this, init); }
}

export class GetNextJobsResponse
{
    public results: PostJob[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetNextJobsResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class StringsResponse
{
    // @DataMember(Order=1)
    public results: string[];

    // @DataMember(Order=2)
    public meta: { [index: string]: string; };

    // @DataMember(Order=3)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<StringsResponse>) { (Object as any).assign(this, init); }
}

export class CalculateLeaderboardResponse
{
    public mostLikedModelsByLlm: ModelTotalStartUpVotes[];
    public answererWinRate: LeaderBoardWinRate[];
    public modelTotalScore: ModelTotalScore[];
    public modelWinRate: ModelWinRate[];

    public constructor(init?: Partial<CalculateLeaderboardResponse>) { (Object as any).assign(this, init); }
}

export class GetAllAnswerModelsResponse
{
    public results: string[];

    public constructor(init?: Partial<GetAllAnswerModelsResponse>) { (Object as any).assign(this, init); }
}

export class FindSimilarQuestionsResponse
{
    public results: Post[];
    public responseStatus?: ResponseStatus;

    public constructor(init?: Partial<FindSimilarQuestionsResponse>) { (Object as any).assign(this, init); }
}

export class AskQuestionResponse
{
    public id: number;
    public slug: string;
    public redirectTo?: string;
    public responseStatus?: ResponseStatus;

    public constructor(init?: Partial<AskQuestionResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class EmptyResponse
{
    // @DataMember(Order=1)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<EmptyResponse>) { (Object as any).assign(this, init); }
}

export class AnswerQuestionResponse
{
    public responseStatus?: ResponseStatus;

    public constructor(init?: Partial<AnswerQuestionResponse>) { (Object as any).assign(this, init); }
}

export class UpdateQuestionResponse
{
    public result: Post;
    public responseStatus?: ResponseStatus;

    public constructor(init?: Partial<UpdateQuestionResponse>) { (Object as any).assign(this, init); }
}

export class UpdateAnswerResponse
{
    public responseStatus?: ResponseStatus;

    public constructor(init?: Partial<UpdateAnswerResponse>) { (Object as any).assign(this, init); }
}

export class GetQuestionResponse
{
    public result: Post;
    public responseStatus?: ResponseStatus;

    public constructor(init?: Partial<GetQuestionResponse>) { (Object as any).assign(this, init); }
}

export class GetAnswerResponse
{
    public result: Post;

    public constructor(init?: Partial<GetAnswerResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class IdResponse
{
    // @DataMember(Order=1)
    public id: string;

    // @DataMember(Order=2)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<IdResponse>) { (Object as any).assign(this, init); }
}

export class CommentsResponse
{
    public comments: Comment[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<CommentsResponse>) { (Object as any).assign(this, init); }
}

export class GetUserReputationsResponse
{
    public results: { [index: string]: string; };
    public responseStatus?: ResponseStatus;

    public constructor(init?: Partial<GetUserReputationsResponse>) { (Object as any).assign(this, init); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class AskQuestion implements IReturn<AskQuestionResponse>, IPost
{
    // @Validate(Validator="NotEmpty")
    // @Validate(Validator="MinimumLength(20)")
    // @Validate(Validator="MaximumLength(120)")
    public title: string;

    // @Validate(Validator="NotEmpty")
    // @Validate(Validator="MinimumLength(30)")
    // @Validate(Validator="MaximumLength(32768)")
    public body: string;

    // @Validate(Validator="NotEmpty")
    // @Validate(Validator="MinimumLength(2)", Message="At least 1 tag required")
    // @Validate(Validator="MaximumLength(120)")
    public tags: string[];

    public refId?: string;

    public constructor(init?: Partial<AskQuestion>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'AskQuestion'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new AskQuestionResponse(); }
}

export class ImportQuestionResponse
{
    public result: AskQuestion;
    public responseStatus?: ResponseStatus;

    public constructor(init?: Partial<ImportQuestionResponse>) { (Object as any).assign(this, init); }
}

export class UpdateUserProfileResponse
{
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UpdateUserProfileResponse>) { (Object as any).assign(this, init); }
}

export class UserPostDataResponse
{
    public watching: boolean;
    public upVoteIds: string[];
    public downVoteIds: string[];
    public responseStatus?: ResponseStatus;

    public constructor(init?: Partial<UserPostDataResponse>) { (Object as any).assign(this, init); }
}

export class GetLatestNotificationsResponse
{
    public hasUnread: boolean;
    public results: Notification[];
    public responseStatus?: ResponseStatus;

    public constructor(init?: Partial<GetLatestNotificationsResponse>) { (Object as any).assign(this, init); }
}

export class GetLatestAchievementsResponse
{
    public hasUnread: boolean;
    public results: Achievement[];
    public responseStatus?: ResponseStatus;

    public constructor(init?: Partial<GetLatestAchievementsResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class BoolResponse
{
    // @DataMember(Order=1)
    public result: boolean;

    // @DataMember(Order=2)
    public meta: { [index: string]: string; };

    // @DataMember(Order=3)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<BoolResponse>) { (Object as any).assign(this, init); }
}

export class GetWatchedTagsResponse
{
    public results: string[];
    public responseStatus?: ResponseStatus;

    public constructor(init?: Partial<GetWatchedTagsResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class AuthenticateResponse implements IHasSessionId, IHasBearerToken
{
    // @DataMember(Order=1)
    public userId: string;

    // @DataMember(Order=2)
    public sessionId: string;

    // @DataMember(Order=3)
    public userName: string;

    // @DataMember(Order=4)
    public displayName: string;

    // @DataMember(Order=5)
    public referrerUrl: string;

    // @DataMember(Order=6)
    public bearerToken: string;

    // @DataMember(Order=7)
    public refreshToken: string;

    // @DataMember(Order=8)
    public refreshTokenExpiry?: string;

    // @DataMember(Order=9)
    public profileUrl: string;

    // @DataMember(Order=10)
    public roles: string[];

    // @DataMember(Order=11)
    public permissions: string[];

    // @DataMember(Order=12)
    public responseStatus: ResponseStatus;

    // @DataMember(Order=13)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<AuthenticateResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class QueryResponse<Post>
{
    // @DataMember(Order=1)
    public offset: number;

    // @DataMember(Order=2)
    public total: number;

    // @DataMember(Order=3)
    public results: Post[];

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    // @DataMember(Order=5)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<QueryResponse<Post>>) { (Object as any).assign(this, init); }
}

export class CreatorKitTasks
{
    public sendMessages?: SendMailMessages;

    public constructor(init?: Partial<CreatorKitTasks>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreatorKitTasks'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @ValidateRequest(Validator="IsAdmin")
export class PreviewEmail implements IReturn<string>, IPost
{
    public request?: string;
    public renderer?: string;
    // @Validate(Validator="NotNull")
    public requestArgs: { [index: string]: Object; };

    public constructor(init?: Partial<PreviewEmail>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PreviewEmail'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return ''; }
}

// @ValidateRequest(Validator="IsAdmin")
export class UpdateMailMessageDraft implements IReturn<MailMessage>
{
    public id: number;
    public email: string;
    public renderer: string;
    public layout?: string;
    public template?: string;
    // @Validate(Validator="NotEmpty")
    public subject: string;

    public body?: string;
    public send?: boolean;

    public constructor(init?: Partial<UpdateMailMessageDraft>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateMailMessageDraft'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new MailMessage(); }
}

/** @description Simple Text Email */
// @ValidateRequest(Validator="IsAdmin")
export class SimpleTextEmail extends CreateEmailBase implements IReturn<MailMessage>, IPost
{
    // @Validate(Validator="NotEmpty")
    public subject: string;

    // @Validate(Validator="NotEmpty")
    public body: string;

    public draft?: boolean;

    public constructor(init?: Partial<SimpleTextEmail>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'SimpleTextEmail'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new MailMessage(); }
}

/** @description Custom HTML Email */
// @ValidateRequest(Validator="IsAdmin")
export class CustomHtmlEmail extends CreateEmailBase implements IReturn<MailMessage>, IPost
{
    // @Validate(Validator="NotEmpty")
    public layout: string;

    // @Validate(Validator="NotEmpty")
    public template: string;

    // @Validate(Validator="NotEmpty")
    public subject: string;

    public body?: string;
    public draft?: boolean;

    public constructor(init?: Partial<CustomHtmlEmail>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'CustomHtmlEmail'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new MailMessage(); }
}

export class SubscribeToMailingList implements IReturnVoid, IPost
{
    // @Validate(Validator="NotEmpty")
    public email: string;

    // @Validate(Validator="NotEmpty")
    public firstName: string;

    // @Validate(Validator="NotEmpty")
    public lastName: string;

    public source: Source;
    public mailingLists?: string[];

    public constructor(init?: Partial<SubscribeToMailingList>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SubscribeToMailingList'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

export class CreateContact implements IReturn<Contact>, ICreateDb<Contact>
{
    // @Validate(Validator="NotEmpty")
    public email: string;

    // @Validate(Validator="NotEmpty")
    public firstName: string;

    // @Validate(Validator="NotEmpty")
    public lastName: string;

    public source: Source;
    public mailingLists?: string[];

    public constructor(init?: Partial<CreateContact>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateContact'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new Contact(); }
}

// @ValidateRequest(Validator="IsAdmin")
export class AdminCreateContact implements IReturn<Contact>
{
    // @Validate(Validator="NotEmpty")
    public email: string;

    // @Validate(Validator="NotEmpty")
    public firstName: string;

    // @Validate(Validator="NotEmpty")
    public lastName: string;

    public source: Source;
    // @Validate(Validator="NotEmpty")
    public mailingLists: string[];

    public verifiedDate?: string;
    public appUserId?: number;
    public createdDate?: string;

    public constructor(init?: Partial<AdminCreateContact>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'AdminCreateContact'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new Contact(); }
}

export class UpdateContactMailingLists implements IReturnVoid, IPost
{
    // @Validate(Validator="NotEmpty")
    public ref: string;

    public mailingLists: string[];
    public unsubscribeAll?: boolean;

    public constructor(init?: Partial<UpdateContactMailingLists>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContactMailingLists'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

export class FindContact implements IReturn<FindContactResponse>, IGet
{
    public email?: string;
    public ref?: string;

    public constructor(init?: Partial<FindContact>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'FindContact'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new FindContactResponse(); }
}

// @Route("/message/send/{id}")
// @ValidateRequest(Validator="IsAdmin")
export class SendMailMessage implements IReturn<MailMessage>, IGet
{
    // @Validate(Validator="GreaterThan(0)")
    public id: number;

    public force?: boolean;

    public constructor(init?: Partial<SendMailMessage>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SendMailMessage'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new MailMessage(); }
}

// @Route("/messagerun/send/{id}")
// @ValidateRequest(Validator="IsAdmin")
export class SendMailMessageRun implements IReturn<MailMessage>, IGet
{
    // @Validate(Validator="GreaterThan(0)")
    public id: number;

    public force?: boolean;

    public constructor(init?: Partial<SendMailMessageRun>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SendMailMessageRun'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new MailMessage(); }
}

// @Route("/verify/email/{ExternalRef}")
export class VerifyEmailAddress implements IReturnVoid
{
    public externalRef: string;

    public constructor(init?: Partial<VerifyEmailAddress>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'VerifyEmailAddress'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @ValidateRequest(Validator="IsAdmin")
export class SendMailRun implements IReturnVoid, IPost
{
    public id: number;

    public constructor(init?: Partial<SendMailRun>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SendMailRun'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @ValidateRequest(Validator="IsAdmin")
export class ViewMailRunInfo implements IReturn<ViewMailRunInfoResponse>, IGet
{
    public id: number;

    public constructor(init?: Partial<ViewMailRunInfo>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ViewMailRunInfo'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ViewMailRunInfoResponse(); }
}

// @Route("/mail/vars")
// @ValidateRequest(Validator="IsAdmin")
export class ViewAppData implements IReturn<ViewAppDataResponse>, IGet
{

    public constructor(init?: Partial<ViewAppData>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ViewAppData'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ViewAppDataResponse(); }
}

// @ValidateRequest(Validator="IsAdmin")
export class ViewAppStats implements IReturn<ViewAppStatsResponse>, IGet
{

    public constructor(init?: Partial<ViewAppStats>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ViewAppStats'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ViewAppStatsResponse(); }
}

export class ArchiveMail implements IReturn<ArchiveMailResponse>, IPost
{
    public messages?: boolean;
    public mailRuns?: boolean;
    // @Validate(Validator="NotNull")
    public olderThanDays: number;

    public constructor(init?: Partial<ArchiveMail>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ArchiveMail'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new ArchiveMailResponse(); }
}

// @Route("/hello/{Name}")
export class Hello implements IReturn<HelloResponse>, IGet
{
    public name?: string;

    public constructor(init?: Partial<Hello>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'Hello'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new HelloResponse(); }
}

export class AdminData implements IReturn<AdminDataResponse>, IGet
{

    public constructor(init?: Partial<AdminData>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'AdminData'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new AdminDataResponse(); }
}

export class GetRequestInfo implements IReturn<string>, IGet
{

    public constructor(init?: Partial<GetRequestInfo>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetRequestInfo'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return ''; }
}

// @ValidateRequest(Validator="HasRole(`Moderator`)")
export class Sync implements IReturn<StringResponse>, IGet
{
    public tasks?: string[];

    public constructor(init?: Partial<Sync>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'Sync'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new StringResponse(); }
}

// @ValidateRequest(Validator="HasRole(`Moderator`)")
export class GenerateMeta implements IReturn<QuestionAndAnswers>, IGet
{
    // @Validate(Validator="GreaterThan(0)")
    public id: number;

    public constructor(init?: Partial<GenerateMeta>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GenerateMeta'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QuestionAndAnswers(); }
}

// @Route("/search")
export class SearchPosts implements IReturn<SearchPostsResponse>, IGet
{
    public q?: string;
    public view?: string;
    public skip?: number;
    public take?: number;

    public constructor(init?: Partial<SearchPosts>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SearchPosts'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new SearchPostsResponse(); }
}

// @ValidateRequest(Validator="HasRole(`Moderator`)")
export class DeleteCdnFilesMq
{
    public files: string[];

    public constructor(init?: Partial<DeleteCdnFilesMq>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteCdnFilesMq'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @ValidateRequest(Validator="HasRole(`Moderator`)")
export class DeleteCdnFile implements IReturnVoid
{
    public file: string;

    public constructor(init?: Partial<DeleteCdnFile>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteCdnFile'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @ValidateRequest(Validator="HasRole(`Moderator`)")
export class GetCdnFile
{
    public file: string;

    public constructor(init?: Partial<GetCdnFile>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetCdnFile'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @ValidateRequest(Validator="HasRole(`Moderator`)")
export class SendNewAnswerEmail implements IReturn<StringResponse>, IGet
{
    public userName: string;
    public answerId: string;

    public constructor(init?: Partial<SendNewAnswerEmail>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'SendNewAnswerEmail'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new StringResponse(); }
}

// @ValidateRequest(Validator="HasRole(`Moderator`)")
export class ViewModelQueues implements IReturn<ViewModelQueuesResponse>, IGet
{
    public models: string[];

    public constructor(init?: Partial<ViewModelQueues>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ViewModelQueues'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ViewModelQueuesResponse(); }
}

export class GetNextJobs implements IReturn<GetNextJobsResponse>, IGet
{
    // @Validate(Validator="NotEmpty")
    public models: string[];

    public worker?: string;
    public take?: number;

    public constructor(init?: Partial<GetNextJobs>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetNextJobs'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetNextJobsResponse(); }
}

// @ValidateRequest(Validator="HasRole(`Moderator`)")
export class FailJob implements IReturnVoid, IPost
{
    public id: number;
    // @Validate(Validator="NotEmpty")
    public error: string;

    public constructor(init?: Partial<FailJob>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'FailJob'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @ValidateRequest(Validator="HasRole(`Moderator`)")
export class RestoreModelQueues implements IReturn<StringsResponse>, IGet
{
    public restoreFailedJobs?: boolean;

    public constructor(init?: Partial<RestoreModelQueues>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'RestoreModelQueues'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new StringsResponse(); }
}

export class CalculateLeaderBoard implements IReturn<CalculateLeaderboardResponse>, IGet
{
    public modelsToExclude?: string;

    public constructor(init?: Partial<CalculateLeaderBoard>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CalculateLeaderBoard'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new CalculateLeaderboardResponse(); }
}

export class GetLeaderboardStatsByTag
{
    public tag: string;
    public modelsToExclude?: string;

    public constructor(init?: Partial<GetLeaderboardStatsByTag>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetLeaderboardStatsByTag'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @ValidateRequest(Validator="IsAuthenticated")
export class GetAllAnswerModels implements IReturn<GetAllAnswerModelsResponse>, IGet
{
    public id: number;

    public constructor(init?: Partial<GetAllAnswerModels>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetAllAnswerModels'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetAllAnswerModelsResponse(); }
}

export class FindSimilarQuestions implements IReturn<FindSimilarQuestionsResponse>, IGet
{
    // @Validate(Validator="NotEmpty")
    // @Validate(Validator="MinimumLength(20)")
    public text: string;

    public constructor(init?: Partial<FindSimilarQuestions>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'FindSimilarQuestions'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new FindSimilarQuestionsResponse(); }
}

// @ValidateRequest(Validator="HasRole(`Moderator`)")
export class DeleteQuestion implements IReturn<EmptyResponse>, IGet
{
    // @Validate(Validator="GreaterThan(0)")
    public id: number;

    public returnUrl?: string;

    public constructor(init?: Partial<DeleteQuestion>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteQuestion'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new EmptyResponse(); }
}

/** @description Your Answer */
// @ValidateRequest(Validator="IsAuthenticated")
export class AnswerQuestion implements IReturn<AnswerQuestionResponse>, IPost
{
    // @Validate(Validator="GreaterThan(0)")
    public postId: number;

    // @Validate(Validator="NotEmpty")
    // @Validate(Validator="MinimumLength(30)")
    // @Validate(Validator="MaximumLength(32768)")
    public body: string;

    public refId?: string;

    public constructor(init?: Partial<AnswerQuestion>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'AnswerQuestion'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new AnswerQuestionResponse(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class UpdateQuestion implements IReturn<UpdateQuestionResponse>, IPost
{
    // @Validate(Validator="GreaterThan(0)")
    public id: number;

    // @Validate(Validator="NotEmpty")
    // @Validate(Validator="MinimumLength(20)")
    // @Validate(Validator="MaximumLength(120)")
    public title: string;

    // @Validate(Validator="NotEmpty")
    // @Validate(Validator="MinimumLength(30)")
    // @Validate(Validator="MaximumLength(32768)")
    public body: string;

    // @Validate(Validator="NotEmpty")
    // @Validate(Validator="MinimumLength(2)", Message="At least 1 tag required")
    // @Validate(Validator="MaximumLength(120)")
    public tags: string[];

    // @Validate(Validator="NotEmpty")
    // @Validate(Validator="MinimumLength(4)")
    public editReason: string;

    public constructor(init?: Partial<UpdateQuestion>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateQuestion'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new UpdateQuestionResponse(); }
}

/** @description Your Answer */
// @ValidateRequest(Validator="IsAuthenticated")
export class UpdateAnswer implements IReturn<UpdateAnswerResponse>, IPost
{
    // @Validate(Validator="NotEmpty")
    public id: string;

    // @Validate(Validator="NotEmpty")
    // @Validate(Validator="MinimumLength(30)")
    // @Validate(Validator="MaximumLength(32768)")
    public body: string;

    // @Validate(Validator="NotEmpty")
    // @Validate(Validator="MinimumLength(4)")
    public editReason: string;

    public constructor(init?: Partial<UpdateAnswer>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateAnswer'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new UpdateAnswerResponse(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class GetQuestion implements IReturn<GetQuestionResponse>, IGet
{
    public id: number;

    public constructor(init?: Partial<GetQuestion>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetQuestion'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetQuestionResponse(); }
}

export class GetQuestionFile implements IReturn<string>, IGet
{
    public id: number;

    public constructor(init?: Partial<GetQuestionFile>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetQuestionFile'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return ''; }
}

// @ValidateRequest(Validator="HasRole(`Moderator`)")
export class GetAnswerFile implements IReturn<string>, IGet
{
    public id: string;

    public constructor(init?: Partial<GetAnswerFile>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetAnswerFile'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return ''; }
}

export class GetAnswer implements IReturn<GetAnswerResponse>, IGet
{
    public id: string;

    public constructor(init?: Partial<GetAnswer>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetAnswer'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetAnswerResponse(); }
}

export class GetAnswerBody implements IReturn<string>, IGet
{
    public id: string;

    public constructor(init?: Partial<GetAnswerBody>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetAnswerBody'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return ''; }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class CreateRankingPostJob implements IReturn<EmptyResponse>
{
    public postId: number;

    public constructor(init?: Partial<CreateRankingPostJob>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateRankingPostJob'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new EmptyResponse(); }
}

// @ValidateRequest(Validator="HasRole(`Moderator`)")
export class CreateWorkerAnswer implements IReturn<IdResponse>, IPost
{
    public postId: number;
    // @Validate(Validator="NotEmpty")
    public model: string;

    public json: string;
    public postJobId?: number;

    public constructor(init?: Partial<CreateWorkerAnswer>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateWorkerAnswer'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new IdResponse(); }
}

// @ValidateRequest(Validator="HasRole(`Moderator`)")
export class RankAnswers implements IReturn<IdResponse>, IPost
{
    // @Validate(Validator="GreaterThan(0)")
    public postId: number;

    public model: string;
    public modelVotes: { [index: string]: number; };
    public postJobId?: number;

    public constructor(init?: Partial<RankAnswers>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'RankAnswers'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new IdResponse(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class CreateComment implements IReturn<CommentsResponse>, IPost
{
    // @Validate(Validator="NotEmpty")
    public id: string;

    // @Validate(Validator="NotEmpty")
    // @Validate(Validator="MinimumLength(15)")
    public body: string;

    public constructor(init?: Partial<CreateComment>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateComment'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CommentsResponse(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class DeleteComment implements IReturn<CommentsResponse>, IPost
{
    // @Validate(Validator="NotEmpty")
    public id: string;

    // @Validate(Validator="NotEmpty")
    public createdBy: string;

    // @Validate(Validator="GreaterThan(0)")
    public created: number;

    public constructor(init?: Partial<DeleteComment>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteComment'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new CommentsResponse(); }
}

export class GetMeta implements IReturn<Meta>, IGet
{
    // @Validate(Validator="NotEmpty")
    public id: string;

    public constructor(init?: Partial<GetMeta>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetMeta'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new Meta(); }
}

export class GetUserReputations implements IReturn<GetUserReputationsResponse>, IGet
{
    public userNames: string[];

    public constructor(init?: Partial<GetUserReputations>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUserReputations'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetUserReputationsResponse(); }
}

export class ImportQuestion implements IReturn<ImportQuestionResponse>, IGet
{
    public url: string;
    public site: ImportSite;
    public tags?: string[];

    public constructor(init?: Partial<ImportQuestion>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ImportQuestion'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new ImportQuestionResponse(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class UpdateUserProfile implements IReturn<UpdateUserProfileResponse>, IPost
{

    public constructor(init?: Partial<UpdateUserProfile>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateUserProfile'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new UpdateUserProfileResponse(); }
}

// @Route("/avatar/{UserName}", "GET")
export class GetUserAvatar implements IReturn<Blob>, IGet
{
    public userName: string;

    public constructor(init?: Partial<GetUserAvatar>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetUserAvatar'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new Blob(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class UserPostData implements IReturn<UserPostDataResponse>, IGet
{
    public postId: number;

    public constructor(init?: Partial<UserPostData>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UserPostData'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new UserPostDataResponse(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class PostVote implements IReturnVoid
{
    public refId: string;
    public up?: boolean;
    public down?: boolean;

    public constructor(init?: Partial<PostVote>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PostVote'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @ValidateRequest(Validator="IsAuthenticated")
export class CommentVote implements IReturnVoid
{
    public refId: string;
    public up?: boolean;
    public down?: boolean;

    public constructor(init?: Partial<CommentVote>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CommentVote'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

export class CreateAvatar implements IReturn<string>, IGet
{
    // @Validate(Validator="NotEmpty")
    public userName: string;

    public textColor?: string;
    public bgColor?: string;

    public constructor(init?: Partial<CreateAvatar>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateAvatar'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return ''; }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class GetLatestNotifications implements IReturn<GetLatestNotificationsResponse>, IGet
{

    public constructor(init?: Partial<GetLatestNotifications>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetLatestNotifications'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetLatestNotificationsResponse(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class GetLatestAchievements implements IReturn<GetLatestAchievementsResponse>, IGet
{

    public constructor(init?: Partial<GetLatestAchievements>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetLatestAchievements'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetLatestAchievementsResponse(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class MarkAsRead implements IReturn<EmptyResponse>, IPost
{
    public notificationIds?: number[];
    public allNotifications?: boolean;
    public achievementIds?: number[];
    public allAchievements?: boolean;

    public constructor(init?: Partial<MarkAsRead>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'MarkAsRead'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new EmptyResponse(); }
}

// @Route("/q/{RefId}")
// @Route("/q/{RefId}/{UserId}")
export class ShareContent implements IReturn<string>, IGet
{
    // @Validate(Validator="NotEmpty")
    public refId: string;

    public userId?: number;

    public constructor(init?: Partial<ShareContent>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ShareContent'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return ''; }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class FlagContent implements IReturn<EmptyResponse>, IPost
{
    // @Validate(Validator="NotEmpty")
    public refId: string;

    public type: FlagType;
    public reason?: string;

    public constructor(init?: Partial<FlagContent>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'FlagContent'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new EmptyResponse(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class WatchContent implements IReturn<EmptyResponse>, IPost
{
    public postId?: number;
    public tag?: string;

    public constructor(init?: Partial<WatchContent>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'WatchContent'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new EmptyResponse(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class UnwatchContent implements IReturn<EmptyResponse>, IPost
{
    public postId?: number;
    public tag?: string;

    public constructor(init?: Partial<UnwatchContent>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UnwatchContent'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new EmptyResponse(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class WatchStatus implements IReturn<BoolResponse>, IGet
{
    public postId?: number;
    public tag?: string;

    public constructor(init?: Partial<WatchStatus>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'WatchStatus'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new BoolResponse(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class WatchTags implements IReturn<EmptyResponse>, IPost
{
    public subscribe?: string[];
    public unsubscribe?: string[];

    public constructor(init?: Partial<WatchTags>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'WatchTags'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new EmptyResponse(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class GetWatchedTags implements IReturn<GetWatchedTagsResponse>, IGet
{

    public constructor(init?: Partial<GetWatchedTags>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetWatchedTags'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new GetWatchedTagsResponse(); }
}

export class RenderComponent implements IReturnVoid
{
    public regenerateMeta?: RegenerateMeta;
    public question?: QuestionAndAnswers;
    public home?: RenderHome;

    public constructor(init?: Partial<RenderComponent>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'RenderComponent'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

export class PreviewMarkdown implements IReturn<string>, IPost
{
    public markdown: string;

    public constructor(init?: Partial<PreviewMarkdown>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PreviewMarkdown'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return ''; }
}

/** @description Sign In */
// @Route("/auth", "GET,POST")
// @Route("/auth/{provider}", "POST")
// @Api(Description="Sign In")
// @DataContract
export class Authenticate implements IReturn<AuthenticateResponse>, IPost
{
    /** @description AuthProvider, e.g. credentials */
    // @DataMember(Order=1)
    public provider: string;

    // @DataMember(Order=2)
    public userName: string;

    // @DataMember(Order=3)
    public password: string;

    // @DataMember(Order=4)
    public rememberMe?: boolean;

    // @DataMember(Order=5)
    public accessToken: string;

    // @DataMember(Order=6)
    public accessTokenSecret: string;

    // @DataMember(Order=7)
    public returnUrl: string;

    // @DataMember(Order=8)
    public errorView: string;

    // @DataMember(Order=9)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<Authenticate>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'Authenticate'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new AuthenticateResponse(); }
}

export class QueryPosts extends QueryDb<Post> implements IReturn<QueryResponse<Post>>
{

    public constructor(init?: Partial<QueryPosts>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryPosts'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<Post>(); }
}

// @ValidateRequest(Validator="IsAdmin")
export class QueryContacts extends QueryDb<Contact> implements IReturn<QueryResponse<Contact>>
{
    public search?: string;

    public constructor(init?: Partial<QueryContacts>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryContacts'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<Contact>(); }
}

// @ValidateRequest(Validator="IsAdmin")
export class QueryInvalidEmails extends QueryDb<InvalidEmail> implements IReturn<QueryResponse<InvalidEmail>>
{

    public constructor(init?: Partial<QueryInvalidEmails>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryInvalidEmails'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<InvalidEmail>(); }
}

// @ValidateRequest(Validator="IsAdmin")
export class QueryMailMessages extends QueryDb<MailMessage> implements IReturn<QueryResponse<MailMessage>>
{

    public constructor(init?: Partial<QueryMailMessages>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryMailMessages'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<MailMessage>(); }
}

// @ValidateRequest(Validator="IsAdmin")
export class QueryMailRuns extends QueryDb<MailRun> implements IReturn<QueryResponse<MailRun>>
{
    public id?: number;

    public constructor(init?: Partial<QueryMailRuns>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryMailRuns'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<MailRun>(); }
}

// @ValidateRequest(Validator="IsAdmin")
export class QueryMailRunMessages extends QueryDb<MailMessageRun> implements IReturn<QueryResponse<MailMessageRun>>
{

    public constructor(init?: Partial<QueryMailRunMessages>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryMailRunMessages'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<MailMessageRun>(); }
}

// @ValidateRequest(Validator="IsAdmin")
export class QueryArchiveMessages extends QueryDb<ArchiveMessage> implements IReturn<QueryResponse<ArchiveMessage>>
{

    public constructor(init?: Partial<QueryArchiveMessages>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryArchiveMessages'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<ArchiveMessage>(); }
}

// @ValidateRequest(Validator="IsAdmin")
export class QueryArchiveRuns extends QueryDb<ArchiveRun> implements IReturn<QueryResponse<ArchiveRun>>
{

    public constructor(init?: Partial<QueryArchiveRuns>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryArchiveRuns'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<ArchiveRun>(); }
}

// @ValidateRequest(Validator="IsAdmin")
export class QueryArchiveMessageRuns extends QueryDb<ArchiveMessageRun> implements IReturn<QueryResponse<ArchiveMessageRun>>
{

    public constructor(init?: Partial<QueryArchiveMessageRuns>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryArchiveMessageRuns'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<ArchiveMessageRun>(); }
}

// @ValidateRequest(Validator="IsAdmin")
export class UpdateContact implements IReturn<Contact>, IPatchDb<Contact>
{
    public id: number;
    public email?: string;
    public firstName?: string;
    public lastName?: string;
    public source?: Source;
    public mailingLists?: string[];
    public externalRef?: string;
    public appUserId?: number;
    public createdDate?: string;
    public verifiedDate?: string;
    public deletedDate?: string;
    public unsubscribedDate?: string;

    public constructor(init?: Partial<UpdateContact>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateContact'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new Contact(); }
}

// @ValidateRequest(Validator="IsAdmin")
export class DeleteContact implements IReturnVoid, IDeleteDb<Contact>
{
    public id: number;

    public constructor(init?: Partial<DeleteContact>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteContact'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() {}
}

// @ValidateRequest(Validator="IsAdmin")
export class UpdateMailMessage implements IReturn<MailMessage>, IPatchDb<MailMessage>
{
    public id: number;
    public email?: string;
    public layout?: string;
    public template?: string;
    public renderer?: string;
    public rendererArgs?: { [index: string]: Object; };
    public message?: EmailMessage;
    public completedDate?: string;

    public constructor(init?: Partial<UpdateMailMessage>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateMailMessage'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new MailMessage(); }
}

// @ValidateRequest(Validator="IsAdmin")
export class DeleteMailMessages implements IReturnVoid, IDeleteDb<MailMessage>
{
    public id: number;

    public constructor(init?: Partial<DeleteMailMessages>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteMailMessages'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() {}
}

// @ValidateRequest(Validator="IsAdmin")
export class CreateMailRun implements IReturn<MailRun>, ICreateDb<MailRun>
{
    public mailingList: MailingList;
    public layout: string;
    public template: string;
    public generator: string;
    public generatorArgs: { [index: string]: Object; };

    public constructor(init?: Partial<CreateMailRun>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateMailRun'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new MailRun(); }
}

// @ValidateRequest(Validator="IsAdmin")
export class UpdateMailRun implements IReturn<MailRun>, IUpdateDb<MailRun>
{
    public id: number;
    public mailingList?: MailingList;
    public layout?: string;
    public template?: string;
    public generator?: string;
    public generatorArgs?: { [index: string]: Object; };
    public createdDate: string;
    public generatedDate?: string;
    public sentDate?: string;
    public completedDate?: string;
    public emailsCount?: number;

    public constructor(init?: Partial<UpdateMailRun>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateMailRun'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new MailRun(); }
}

// @ValidateRequest(Validator="IsAdmin")
export class DeleteMailRun implements IReturnVoid, IDeleteDb<MailRun>
{
    public id: number;

    public constructor(init?: Partial<DeleteMailRun>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteMailRun'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() {}
}

// @ValidateRequest(Validator="IsAdmin")
export class UpdateMailRunMessage implements IReturn<MailMessageRun>, IPatchDb<MailMessageRun>
{
    public id: number;
    public mailRunId: number;
    public contactId: number;
    public renderer: string;
    public rendererArgs: { [index: string]: Object; };
    public message?: EmailMessage;
    public startedDate?: string;
    public completedDate?: string;

    public constructor(init?: Partial<UpdateMailRunMessage>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateMailRunMessage'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new MailMessageRun(); }
}

// @ValidateRequest(Validator="IsAdmin")
export class DeleteMailRunMessage implements IReturnVoid, IDeleteDb<MailMessageRun>
{
    public id: number;

    public constructor(init?: Partial<DeleteMailRunMessage>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteMailRunMessage'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() {}
}

