import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { MercuriusContext } from 'mercurius';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => Promise<TResult> | TResult;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** Date custom scalar type */
    Date: any;
    _FieldSet: any;
};

export type PageInfo = {
    __typename?: 'PageInfo';
    hasNextPage: Scalars['Boolean'];
    hasPreviousPage: Scalars['Boolean'];
    startCursor?: Maybe<Scalars['String']>;
    endCursor?: Maybe<Scalars['String']>;
};

export type Node = {
    id: Scalars['ID'];
};

export type Query = {
    __typename?: 'Query';
    node?: Maybe<Node>;
    /** Fetch user data about the current user */
    me?: Maybe<User>;
    /** Fetch all events */
    events?: Maybe<Array<Event>>;
    myFeedback?: Maybe<Array<Maybe<EventLiveFeedback>>>;
    validateInvite: ValidateInviteQueryResponse;
    questionsByEventId?: Maybe<Array<EventQuestion>>;
};

export type QuerynodeArgs = {
    id: Scalars['ID'];
};

export type QuerymyFeedbackArgs = {
    eventId: Scalars['ID'];
};

export type QueryvalidateInviteArgs = {
    input: ValidateInvite;
};

export type QueryquestionsByEventIdArgs = {
    eventId: Scalars['ID'];
};

export type Error = {
    __typename?: 'Error';
    message: Scalars['String'];
};

export type MutationResponse = {
    isError: Scalars['Boolean'];
    message: Scalars['String'];
};

export enum Operation {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

/** User Data */
export type User = Node & {
    __typename?: 'User';
    id: Scalars['ID'];
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    isEmailVerified?: Maybe<Scalars['Boolean']>;
    /** Avatar URL if null then no avatar is uploaded */
    avatar?: Maybe<Scalars['String']>;
    /** Organizations that this user belongs to */
    organizations?: Maybe<OrganizationConnection>;
    /** Events that this user is a moderator of, or has been invited to */
    events?: Maybe<EventConnection>;
};

/** User Data */
export type UserorganizationsArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
};

/** User Data */
export type UsereventsArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
};

export type UserSettings = {
    __typename?: 'UserSettings';
    currentEmail: Scalars['String'];
    updateEmail?: Maybe<Scalars['String']>;
    updatePassword?: Maybe<Scalars['String']>;
    deleteAccount: Scalars['Boolean'];
    isAnonymous: Scalars['Boolean'];
    isNotificationsEnabled: Scalars['Boolean'];
};

export type UserEdge = {
    __typename?: 'UserEdge';
    node: User;
    cursor: Scalars['String'];
};

export type UserConnection = {
    __typename?: 'UserConnection';
    edges?: Maybe<Array<UserEdge>>;
    pageInfo: PageInfo;
};

export type RegistrationForm = {
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    password: Scalars['String'];
    confirmPassword: Scalars['String'];
    email: Scalars['String'];
};

export type UpdateEmailForm = {
    currentEmail: Scalars['String'];
    newEmail: Scalars['String'];
};

export type UpdatePasswordForm = {
    email: Scalars['String'];
    oldPassword: Scalars['String'];
    newPassword: Scalars['String'];
    confirmNewPassword: Scalars['String'];
};

export type DeleteAccountForm = {
    email: Scalars['String'];
    password: Scalars['String'];
    confirmPassword: Scalars['String'];
};

export type LoginForm = {
    email: Scalars['String'];
    password: Scalars['String'];
};

export type UserMutationResponse = MutationResponse & {
    __typename?: 'UserMutationResponse';
    isError: Scalars['Boolean'];
    message: Scalars['String'];
    body?: Maybe<User>;
};

export type Mutation = {
    __typename?: 'Mutation';
    register: UserMutationResponse;
    login: UserMutationResponse;
    updateEmail: UserMutationResponse;
    updatePassword: UserMutationResponse;
    deleteAccount: UserMutationResponse;
    /** The logout just returns the timestamp of the logout action */
    logout: Scalars['Date'];
    createEvent: EventMutationResponse;
    updateEvent: EventMutationResponse;
    deleteEvent: EventMutationResponse;
    /** Start the event so that it is "live" */
    startEvent: EventMutationResponse;
    /** End the event so that it is not live */
    endEvent: EventMutationResponse;
    createOrganization: OrganizationMutationResponse;
    updateOrganization: OrganizationMutationResponse;
    deleteOrganization: OrganizationMutationResponse;
    /** Adds a new member and returns the new user added */
    createMember: UserMutationResponse;
    /** Delete a member from the organization */
    deleteMember: UserMutationResponse;
    createFeedback?: Maybe<EventFeedbackMutationResponse>;
    createInvite: InviteMutationResponse;
    hideQuestion?: Maybe<EventQuestion>;
    updateQuestionPosition: EventQuestionMutationResponse;
    addQuestionToQueue: EventQuestionMutationResponse;
    removeQuestionFromQueue: EventQuestionMutationResponse;
    /** Add a new moderator to the given event */
    createModerator: ModeratorMutationResponse;
    updateModerator: ModeratorMutationResponse;
    /** Removes a moderator from a given event */
    deleteModerator: ModeratorMutationResponse;
    /**
     * Advance the current question
     * TODO: make this an EventMutationResponse
     */
    nextQuestion: Event;
    /**
     * Go to the previous question
     * TODO: make this an EventMutationResponse
     */
    prevQuestion: Event;
    createQuestion: EventQuestionMutationResponse;
    deleteQuestion: EventQuestionMutationResponse;
    alterLike: EventQuestionMutationResponse;
    createSpeaker: EventSpeakerMutationResponse;
    deleteSpeaker: EventSpeakerMutationResponse;
    updateSpeaker: EventSpeakerMutationResponse;
    createVideo: EventVideoMutationResponse;
    deleteVideo: EventVideoMutationResponse;
    updateVideo: EventVideoMutationResponse;
};

export type MutationregisterArgs = {
    input: RegistrationForm;
};

export type MutationloginArgs = {
    input: LoginForm;
};

export type MutationupdateEmailArgs = {
    input: UpdateEmailForm;
};

export type MutationupdatePasswordArgs = {
    input: UpdatePasswordForm;
};

export type MutationdeleteAccountArgs = {
    input: DeleteAccountForm;
};

export type MutationcreateEventArgs = {
    event: CreateEvent;
};

export type MutationupdateEventArgs = {
    event: UpdateEvent;
};

export type MutationdeleteEventArgs = {
    event: DeleteEvent;
};

export type MutationstartEventArgs = {
    eventId: Scalars['String'];
};

export type MutationendEventArgs = {
    eventId: Scalars['String'];
};

export type MutationcreateOrganizationArgs = {
    input: CreateOrganization;
};

export type MutationupdateOrganizationArgs = {
    input: UpdateOrganization;
};

export type MutationdeleteOrganizationArgs = {
    input: DeleteOrganization;
};

export type MutationcreateMemberArgs = {
    input: CreateMember;
};

export type MutationdeleteMemberArgs = {
    input: DeleteMember;
};

export type MutationcreateFeedbackArgs = {
    input?: Maybe<CreateFeedback>;
};

export type MutationcreateInviteArgs = {
    input: CreateInvite;
};

export type MutationhideQuestionArgs = {
    input: HideQuestion;
};

export type MutationupdateQuestionPositionArgs = {
    input: UpdateQuestionPosition;
};

export type MutationaddQuestionToQueueArgs = {
    input: AddQuestionToQueue;
};

export type MutationremoveQuestionFromQueueArgs = {
    input: RemoveQuestionFromQueue;
};

export type MutationcreateModeratorArgs = {
    input: CreateModerator;
};

export type MutationupdateModeratorArgs = {
    input: UpdateModerator;
};

export type MutationdeleteModeratorArgs = {
    input: DeleteModerator;
};

export type MutationnextQuestionArgs = {
    eventId: Scalars['ID'];
};

export type MutationprevQuestionArgs = {
    eventId: Scalars['ID'];
};

export type MutationcreateQuestionArgs = {
    input: CreateQuestion;
};

export type MutationdeleteQuestionArgs = {
    input: DeleteQuestion;
};

export type MutationalterLikeArgs = {
    input: AlterLike;
};

export type MutationcreateSpeakerArgs = {
    input: CreateSpeaker;
};

export type MutationdeleteSpeakerArgs = {
    input: DeleteSpeaker;
};

export type MutationupdateSpeakerArgs = {
    input: UpdateSpeaker;
};

export type MutationcreateVideoArgs = {
    input: CreateVideo;
};

export type MutationdeleteVideoArgs = {
    input: DeleteVideo;
};

export type MutationupdateVideoArgs = {
    input: UpdateVideo;
};

export type Event = Node & {
    __typename?: 'Event';
    id: Scalars['ID'];
    /** Creator of this event */
    createdBy?: Maybe<User>;
    /** The owning organization */
    organization?: Maybe<Organization>;
    createdAt?: Maybe<Scalars['Date']>;
    updatedAt?: Maybe<Scalars['Date']>;
    title?: Maybe<Scalars['String']>;
    /** The planned start date time string */
    startDateTime?: Maybe<Scalars['Date']>;
    /** The planned end date time string */
    endDateTime?: Maybe<Scalars['Date']>;
    description?: Maybe<Scalars['String']>;
    topic?: Maybe<Scalars['String']>;
    /** Whether or not the Event is live */
    isActive?: Maybe<Scalars['Boolean']>;
    /** Let all users see what questions have been submitted */
    isQuestionFeedVisible?: Maybe<Scalars['Boolean']>;
    /** Collect user ratings after the event has ended */
    isCollectRatingsEnabled?: Maybe<Scalars['Boolean']>;
    /** Display a forum-like interface once the "live" part of the event is over */
    isForumEnabled?: Maybe<Scalars['Boolean']>;
    /** Is the event private, ie invite only */
    isPrivate?: Maybe<Scalars['Boolean']>;
    /** All questions relating to this event */
    questions?: Maybe<EventQuestionConnection>;
    /** Speakers for this event */
    speakers?: Maybe<EventSpeakerConnection>;
    /** Registrants for this event -- individuals invited */
    registrants?: Maybe<UserConnection>;
    /** Participants of the event -- individuals who showed up */
    participants?: Maybe<EventParticipantConnection>;
    /** Video feeds and the languages */
    videos?: Maybe<EventVideoConnection>;
    /** Live Feedback given during the event */
    liveFeedback?: Maybe<EventLiveFeedbackConnection>;
    /** List of moderators for this particular event */
    moderators?: Maybe<UserConnection>;
    /** Whether or not the viewer is a moderator */
    isViewerModerator?: Maybe<Scalars['Boolean']>;
    /** List of users who can view event when private */
    invited?: Maybe<UserConnection>;
    /** Whether or not the viewer is invited */
    isViewerInvited?: Maybe<Scalars['Boolean']>;
    /** Questions having to do with the queue */
    questionQueue?: Maybe<EventQuestionQueue>;
    /** The question currently being asked, corresponds to a "position" value on the event question */
    currentQuestion?: Maybe<Scalars['Int']>;
};

export type EventquestionsArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
};

export type EventspeakersArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
};

export type EventparticipantsArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
};

export type EventvideosArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
};

export type EventliveFeedbackArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
};

export type EventmoderatorsArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
};

export type EventinvitedArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
};

export type EventquestionQueueArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
};

/** Event Edge */
export type EventEdge = {
    __typename?: 'EventEdge';
    node: Event;
    cursor: Scalars['String'];
};

/** Connection to Events */
export type EventConnection = {
    __typename?: 'EventConnection';
    edges?: Maybe<Array<EventEdge>>;
    pageInfo: PageInfo;
};

export type CreateEvent = {
    title: Scalars['String'];
    startDateTime: Scalars['Date'];
    endDateTime: Scalars['Date'];
    description: Scalars['String'];
    topic: Scalars['String'];
    orgId: Scalars['String'];
};

export type UpdateEvent = {
    title?: Maybe<Scalars['String']>;
    startDateTime?: Maybe<Scalars['Date']>;
    endDateTime?: Maybe<Scalars['Date']>;
    description?: Maybe<Scalars['String']>;
    topic?: Maybe<Scalars['String']>;
    isQuestionFeedVisible?: Maybe<Scalars['Boolean']>;
    isCollectRatingsEnabled?: Maybe<Scalars['Boolean']>;
    isForumEnabled?: Maybe<Scalars['Boolean']>;
    isPrivate?: Maybe<Scalars['Boolean']>;
    eventId: Scalars['String'];
};

/** In order to delete an event, user must provide a title and a confirmation title, similar to account deletion. */
export type DeleteEvent = {
    eventId: Scalars['String'];
    title: Scalars['String'];
    confirmTitle: Scalars['String'];
};

export type EventMutationResponse = MutationResponse & {
    __typename?: 'EventMutationResponse';
    isError: Scalars['Boolean'];
    message: Scalars['String'];
    body?: Maybe<Event>;
};

export type Subscription = {
    __typename?: 'Subscription';
    eventUpdates: Event;
    /** subscription for whenever a new org is added */
    orgUpdated: OrganizationSubscription;
    feedbackCRUD: FeedbackOperation;
    /** New messages as feedback is given */
    eventLiveFeedbackCreated: EventLiveFeedback;
    /** Question subscription for all operations performed on questions */
    questionCreated: EventQuestionEdgeContainer;
    questionUpdated: EventQuestionEdgeContainer;
    questionDeleted: EventQuestionEdgeContainer;
    questionAddedToRecord: EventQuestionEdgeContainer;
    questionRemovedFromRecord: EventQuestionEdgeContainer;
    /**
     * Do not need to control the order that things
     * are removed since we cannot control that on the frontend
     * We need to control the order that things are added since
     * we control that with append or prepend ont he frontend
     */
    recordPushQuestion: EventQuestionEdgeContainer;
    recordUnshiftQuestion: EventQuestionEdgeContainer;
    recordRemoveQuestion: EventQuestionEdgeContainer;
    enqueuedPushQuestion: EventQuestionEdgeContainer;
    enqueuedUnshiftQuestion: EventQuestionEdgeContainer;
    enqueuedRemoveQuestion: EventQuestionEdgeContainer;
    questionAddedToEnqueued: EventQuestionEdgeContainer;
    questionRemovedFromEnqueued: EventQuestionEdgeContainer;
};

export type SubscriptioneventUpdatesArgs = {
    eventId: Scalars['ID'];
};

export type SubscriptionfeedbackCRUDArgs = {
    eventId: Scalars['ID'];
};

export type SubscriptioneventLiveFeedbackCreatedArgs = {
    eventId: Scalars['ID'];
};

export type SubscriptionquestionCreatedArgs = {
    eventId: Scalars['ID'];
};

export type SubscriptionquestionUpdatedArgs = {
    eventId: Scalars['ID'];
};

export type SubscriptionquestionDeletedArgs = {
    eventId: Scalars['ID'];
};

export type SubscriptionquestionAddedToRecordArgs = {
    eventId: Scalars['ID'];
};

export type SubscriptionquestionRemovedFromRecordArgs = {
    eventId: Scalars['ID'];
};

export type SubscriptionrecordPushQuestionArgs = {
    eventId: Scalars['ID'];
};

export type SubscriptionrecordUnshiftQuestionArgs = {
    eventId: Scalars['ID'];
};

export type SubscriptionrecordRemoveQuestionArgs = {
    eventId: Scalars['ID'];
};

export type SubscriptionenqueuedPushQuestionArgs = {
    eventId: Scalars['ID'];
};

export type SubscriptionenqueuedUnshiftQuestionArgs = {
    eventId: Scalars['ID'];
};

export type SubscriptionenqueuedRemoveQuestionArgs = {
    eventId: Scalars['ID'];
};

export type SubscriptionquestionAddedToEnqueuedArgs = {
    eventId: Scalars['ID'];
};

export type SubscriptionquestionRemovedFromEnqueuedArgs = {
    eventId: Scalars['ID'];
};

export type Organization = Node & {
    __typename?: 'Organization';
    /** Unique identifier for this org */
    id: Scalars['ID'];
    /** name of the org */
    name: Scalars['String'];
    /** When this org was created */
    createdAt?: Maybe<Scalars['Date']>;
    /** all members of this org */
    members?: Maybe<UserConnection>;
    /** Events owned by this organization */
    events?: Maybe<EventConnection>;
    /** Whether or not the current viewer is a member */
    isViewerMember?: Maybe<Scalars['Boolean']>;
};

export type OrganizationmembersArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
};

export type OrganizationeventsArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
};

export type OrganizationEdge = {
    __typename?: 'OrganizationEdge';
    node: Organization;
    cursor: Scalars['String'];
};

export type OrganizationConnection = {
    __typename?: 'OrganizationConnection';
    edges?: Maybe<Array<OrganizationEdge>>;
    pageInfo: PageInfo;
};

export type OrganizationSubscription = {
    __typename?: 'OrganizationSubscription';
    orgId: Scalars['ID'];
    userId?: Maybe<Scalars['ID']>;
    deleteMember: Scalars['Boolean'];
};

/** Necessary information for org creation */
export type CreateOrganization = {
    name: Scalars['String'];
};

/** Information that may be updated by the user */
export type UpdateOrganization = {
    orgId: Scalars['ID'];
    name: Scalars['String'];
};

/** Information necessary for deleting an org */
export type DeleteOrganization = {
    orgId: Scalars['ID'];
};

/** Info necessary for adding a member to an organization */
export type CreateMember = {
    email: Scalars['String'];
    orgId: Scalars['ID'];
};

export type DeleteMember = {
    userId: Scalars['ID'];
    orgId: Scalars['ID'];
};

export type OrganizationMutationResponse = MutationResponse & {
    __typename?: 'OrganizationMutationResponse';
    isError: Scalars['Boolean'];
    message: Scalars['String'];
    body?: Maybe<OrganizationEdge>;
};

export type EventLiveFeedback = Node & {
    __typename?: 'EventLiveFeedback';
    id: Scalars['ID'];
    message: Scalars['String'];
    event?: Maybe<Event>;
    createdAt?: Maybe<Scalars['Date']>;
    createdBy?: Maybe<User>;
    createdById?: Maybe<Scalars['ID']>;
    isReply?: Maybe<Scalars['Boolean']>;
    refFeedback?: Maybe<EventLiveFeedback>;
};

export type EventLiveFeedbackEdge = {
    __typename?: 'EventLiveFeedbackEdge';
    node: EventLiveFeedback;
    cursor: Scalars['String'];
};

export type EventLiveFeedbackConnection = {
    __typename?: 'EventLiveFeedbackConnection';
    edges?: Maybe<Array<EventLiveFeedbackEdge>>;
    pageInfo: PageInfo;
};

export type FeedbackOperation = {
    __typename?: 'FeedbackOperation';
    operationType: Operation;
    edge: EventLiveFeedbackEdge;
};

export type EventFeedbackMutationResponse = MutationResponse & {
    __typename?: 'EventFeedbackMutationResponse';
    isError: Scalars['Boolean'];
    message: Scalars['String'];
    body?: Maybe<EventLiveFeedbackEdge>;
};

export type CreateFeedback = {
    message: Scalars['String'];
    eventId: Scalars['ID'];
    refFeedbackId?: Maybe<Scalars['ID']>;
    isReply?: Maybe<Scalars['Boolean']>;
};

export type CreateInvite = {
    email: Scalars['String'];
    eventId: Scalars['ID'];
};

export type ValidateInvite = {
    token: Scalars['String'];
    eventId: Scalars['ID'];
};

export type InviteMutationResponse = MutationResponse & {
    __typename?: 'InviteMutationResponse';
    isError: Scalars['Boolean'];
    message: Scalars['String'];
};

export type ValidateInviteQueryResponse = {
    __typename?: 'ValidateInviteQueryResponse';
    valid: Scalars['Boolean'];
};

export type HideQuestion = {
    questionId: Scalars['ID'];
    eventId: Scalars['ID'];
    /** Goal state. If we want to change the state to hidden, toggleTo is true; false otherwise. */
    toggleTo: Scalars['Boolean'];
};

export type UpdateQuestionPosition = {
    questionId: Scalars['ID'];
    position: Scalars['Int'];
    eventId: Scalars['ID'];
};

export type CreateModerator = {
    email: Scalars['String'];
    eventId: Scalars['ID'];
};

export type DeleteModerator = {
    userId: Scalars['ID'];
    eventId: Scalars['ID'];
};

export type UpdateModerator = {
    email: Scalars['String'];
    eventId: Scalars['ID'];
};

export type AddQuestionToQueue = {
    questionId: Scalars['ID'];
    eventId: Scalars['ID'];
};

export type RemoveQuestionFromQueue = {
    questionId: Scalars['ID'];
    eventId: Scalars['ID'];
};

export type UpdateQuestionQueue = {
    questionId: Scalars['ID'];
    eventId: Scalars['ID'];
    adding: Scalars['Boolean'];
};

export type ModeratorMutationResponse = MutationResponse & {
    __typename?: 'ModeratorMutationResponse';
    isError: Scalars['Boolean'];
    message: Scalars['String'];
    body?: Maybe<User>;
};

export type EventParticipant = {
    __typename?: 'EventParticipant';
    user?: Maybe<User>;
    questions?: Maybe<Array<Maybe<EventQuestion>>>;
    liveFeedBack?: Maybe<Array<Maybe<EventLiveFeedback>>>;
};

export type EventParticipantEdge = {
    __typename?: 'EventParticipantEdge';
    node: EventParticipant;
    cursor: Scalars['String'];
};

export type EventParticipantConnection = {
    __typename?: 'EventParticipantConnection';
    edges?: Maybe<Array<EventParticipantEdge>>;
    pageInfo: PageInfo;
};

export type EventQuestion = Node & {
    __typename?: 'EventQuestion';
    id: Scalars['ID'];
    event?: Maybe<Event>;
    /** The user id of the creator */
    createdById?: Maybe<Scalars['ID']>;
    /** User information on the person asking the question */
    createdBy?: Maybe<User>;
    createdAt?: Maybe<Scalars['Date']>;
    refQuestion?: Maybe<EventQuestion>;
    /** The actual content of the question */
    question?: Maybe<Scalars['String']>;
    position?: Maybe<Scalars['Int']>;
    isVisible?: Maybe<Scalars['Boolean']>;
    isAsked?: Maybe<Scalars['Boolean']>;
    lang?: Maybe<Scalars['String']>;
    isFollowUp?: Maybe<Scalars['Boolean']>;
    isQuote?: Maybe<Scalars['Boolean']>;
    /** The users who have liked this question */
    likedBy?: Maybe<UserConnection>;
    /** Find the count of the likes only */
    likedByCount?: Maybe<Scalars['Int']>;
    /** Whether or not the current user likes the question */
    isLikedByViewer?: Maybe<Scalars['Boolean']>;
    /** If the question is owned by the current viewer */
    isMyQuestion?: Maybe<Scalars['Boolean']>;
};

/** EventQuestionQueue is the entire queue of the event */
export type EventQuestionQueue = {
    __typename?: 'EventQuestionQueue';
    /** last index is current question */
    questionRecord?: Maybe<EventQuestionConnection>;
    enqueuedQuestions?: Maybe<EventQuestionConnection>;
};

/** EventQuestionQueue is the entire queue of the event */
export type EventQuestionQueuequestionRecordArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
};

/** EventQuestionQueue is the entire queue of the event */
export type EventQuestionQueueenqueuedQuestionsArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
};

export type EventQuestionEdge = {
    __typename?: 'EventQuestionEdge';
    node: EventQuestion;
    cursor: Scalars['String'];
};

export type EventQuestionConnection = {
    __typename?: 'EventQuestionConnection';
    edges?: Maybe<Array<EventQuestionEdge>>;
    pageInfo: PageInfo;
};

export type Like = {
    __typename?: 'Like';
    user: User;
    question: EventQuestion;
};

export type CreateQuestion = {
    question: Scalars['String'];
    isQuote?: Maybe<Scalars['Boolean']>;
    isFollowUp?: Maybe<Scalars['Boolean']>;
    refQuestion?: Maybe<Scalars['ID']>;
    eventId: Scalars['ID'];
};

export type DeleteQuestion = {
    questionId: Scalars['ID'];
    isVisible: Scalars['Boolean'];
};

export type AlterLike = {
    questionId: Scalars['ID'];
    /** True if the user is attempting to like the question; false if they are trying to remove a like */
    to: Scalars['Boolean'];
};

export type EventQuestionMutationResponse = MutationResponse & {
    __typename?: 'EventQuestionMutationResponse';
    isError: Scalars['Boolean'];
    message: Scalars['String'];
    body?: Maybe<EventQuestionEdge>;
};

/** Required to reduce frontend complexity due to relay limitation https://github.com/facebook/relay/issues/3457 */
export type EventQuestionEdgeContainer = {
    __typename?: 'EventQuestionEdgeContainer';
    edge: EventQuestionEdge;
};

export type EventSpeaker = Node & {
    __typename?: 'EventSpeaker';
    /** Speaker id */
    id: Scalars['ID'];
    /** email of the speaker */
    email?: Maybe<Scalars['String']>;
    /** Event eventId that this user is speaking at */
    eventId?: Maybe<Scalars['ID']>;
    /** The related user account associated with the speaker */
    user?: Maybe<User>;
    /** Name set by the organizer of the event */
    name?: Maybe<Scalars['String']>;
    /** Description set by the organizer of the event */
    description?: Maybe<Scalars['String']>;
    /** Title set by the organizer of the event */
    title?: Maybe<Scalars['String']>;
    /** Picture set by the organizer of the event */
    pictureUrl?: Maybe<Scalars['String']>;
};

export type EventSpeakerEdge = {
    __typename?: 'EventSpeakerEdge';
    node: EventSpeaker;
    cursor: Scalars['String'];
};

export type EventSpeakerConnection = {
    __typename?: 'EventSpeakerConnection';
    edges?: Maybe<Array<EventSpeakerEdge>>;
    pageInfo: PageInfo;
};

export type CreateSpeaker = {
    eventId: Scalars['String'];
    name: Scalars['String'];
    title: Scalars['String'];
    description: Scalars['String'];
    pictureUrl: Scalars['String'];
    /** This is for matching the speaker to an account */
    email: Scalars['String'];
};

export type UpdateSpeaker = {
    name?: Maybe<Scalars['String']>;
    title?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    pictureUrl?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    id: Scalars['String'];
    eventId: Scalars['String'];
};

export type DeleteSpeaker = {
    /** Necessary for verifying user permissions */
    eventId: Scalars['String'];
    id: Scalars['String'];
};

export type EventSpeakerMutationResponse = MutationResponse & {
    __typename?: 'EventSpeakerMutationResponse';
    isError: Scalars['Boolean'];
    message: Scalars['String'];
    body?: Maybe<EventSpeaker>;
};

export type EventVideo = Node & {
    __typename?: 'EventVideo';
    id: Scalars['ID'];
    url: Scalars['String'];
    lang: Scalars['String'];
    event?: Maybe<Event>;
};

export type EventVideoEdge = {
    __typename?: 'EventVideoEdge';
    node: EventVideo;
    cursor: Scalars['String'];
};

export type EventVideoConnection = {
    __typename?: 'EventVideoConnection';
    edges?: Maybe<Array<EventVideoEdge>>;
    pageInfo: PageInfo;
};

export type CreateVideo = {
    url: Scalars['String'];
    lang: Scalars['String'];
    eventId: Scalars['String'];
};

export type UpdateVideo = {
    videoId: Scalars['String'];
    eventId: Scalars['String'];
    url?: Maybe<Scalars['String']>;
    lang?: Maybe<Scalars['String']>;
};

export type DeleteVideo = {
    eventId: Scalars['String'];
    id: Scalars['String'];
};

export type EventVideoMutationResponse = MutationResponse & {
    __typename?: 'EventVideoMutationResponse';
    isError: Scalars['Boolean'];
    message: Scalars['String'];
    body?: Maybe<EventVideo>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
    selectionSet: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
    | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
    | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | ResolverWithResolve<TResult, TParent, TContext, TArgs>
    | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
    | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
    obj: T,
    context: TContext,
    info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
    Date: ResolverTypeWrapper<Scalars['Date']>;
    PageInfo: ResolverTypeWrapper<PageInfo>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    String: ResolverTypeWrapper<Scalars['String']>;
    Node:
        | ResolversTypes['User']
        | ResolversTypes['Event']
        | ResolversTypes['Organization']
        | ResolversTypes['EventLiveFeedback']
        | ResolversTypes['EventQuestion']
        | ResolversTypes['EventSpeaker']
        | ResolversTypes['EventVideo'];
    ID: ResolverTypeWrapper<Scalars['ID']>;
    Query: ResolverTypeWrapper<{}>;
    Error: ResolverTypeWrapper<Error>;
    MutationResponse:
        | ResolversTypes['UserMutationResponse']
        | ResolversTypes['EventMutationResponse']
        | ResolversTypes['OrganizationMutationResponse']
        | ResolversTypes['EventFeedbackMutationResponse']
        | ResolversTypes['InviteMutationResponse']
        | ResolversTypes['ModeratorMutationResponse']
        | ResolversTypes['EventQuestionMutationResponse']
        | ResolversTypes['EventSpeakerMutationResponse']
        | ResolversTypes['EventVideoMutationResponse'];
    Operation: Operation;
    User: ResolverTypeWrapper<User>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    UserSettings: ResolverTypeWrapper<UserSettings>;
    UserEdge: ResolverTypeWrapper<UserEdge>;
    UserConnection: ResolverTypeWrapper<UserConnection>;
    RegistrationForm: RegistrationForm;
    UpdateEmailForm: UpdateEmailForm;
    UpdatePasswordForm: UpdatePasswordForm;
    DeleteAccountForm: DeleteAccountForm;
    LoginForm: LoginForm;
    UserMutationResponse: ResolverTypeWrapper<UserMutationResponse>;
    Mutation: ResolverTypeWrapper<{}>;
    Event: ResolverTypeWrapper<Event>;
    EventEdge: ResolverTypeWrapper<EventEdge>;
    EventConnection: ResolverTypeWrapper<EventConnection>;
    CreateEvent: CreateEvent;
    UpdateEvent: UpdateEvent;
    DeleteEvent: DeleteEvent;
    EventMutationResponse: ResolverTypeWrapper<EventMutationResponse>;
    Subscription: ResolverTypeWrapper<{}>;
    Organization: ResolverTypeWrapper<Organization>;
    OrganizationEdge: ResolverTypeWrapper<OrganizationEdge>;
    OrganizationConnection: ResolverTypeWrapper<OrganizationConnection>;
    OrganizationSubscription: ResolverTypeWrapper<OrganizationSubscription>;
    CreateOrganization: CreateOrganization;
    UpdateOrganization: UpdateOrganization;
    DeleteOrganization: DeleteOrganization;
    CreateMember: CreateMember;
    DeleteMember: DeleteMember;
    OrganizationMutationResponse: ResolverTypeWrapper<OrganizationMutationResponse>;
    EventLiveFeedback: ResolverTypeWrapper<EventLiveFeedback>;
    EventLiveFeedbackEdge: ResolverTypeWrapper<EventLiveFeedbackEdge>;
    EventLiveFeedbackConnection: ResolverTypeWrapper<EventLiveFeedbackConnection>;
    FeedbackOperation: ResolverTypeWrapper<FeedbackOperation>;
    EventFeedbackMutationResponse: ResolverTypeWrapper<EventFeedbackMutationResponse>;
    CreateFeedback: CreateFeedback;
    CreateInvite: CreateInvite;
    ValidateInvite: ValidateInvite;
    InviteMutationResponse: ResolverTypeWrapper<InviteMutationResponse>;
    ValidateInviteQueryResponse: ResolverTypeWrapper<ValidateInviteQueryResponse>;
    HideQuestion: HideQuestion;
    UpdateQuestionPosition: UpdateQuestionPosition;
    CreateModerator: CreateModerator;
    DeleteModerator: DeleteModerator;
    UpdateModerator: UpdateModerator;
    AddQuestionToQueue: AddQuestionToQueue;
    RemoveQuestionFromQueue: RemoveQuestionFromQueue;
    UpdateQuestionQueue: UpdateQuestionQueue;
    ModeratorMutationResponse: ResolverTypeWrapper<ModeratorMutationResponse>;
    EventParticipant: ResolverTypeWrapper<EventParticipant>;
    EventParticipantEdge: ResolverTypeWrapper<EventParticipantEdge>;
    EventParticipantConnection: ResolverTypeWrapper<EventParticipantConnection>;
    EventQuestion: ResolverTypeWrapper<EventQuestion>;
    EventQuestionQueue: ResolverTypeWrapper<EventQuestionQueue>;
    EventQuestionEdge: ResolverTypeWrapper<EventQuestionEdge>;
    EventQuestionConnection: ResolverTypeWrapper<EventQuestionConnection>;
    Like: ResolverTypeWrapper<Like>;
    CreateQuestion: CreateQuestion;
    DeleteQuestion: DeleteQuestion;
    AlterLike: AlterLike;
    EventQuestionMutationResponse: ResolverTypeWrapper<EventQuestionMutationResponse>;
    EventQuestionEdgeContainer: ResolverTypeWrapper<EventQuestionEdgeContainer>;
    EventSpeaker: ResolverTypeWrapper<EventSpeaker>;
    EventSpeakerEdge: ResolverTypeWrapper<EventSpeakerEdge>;
    EventSpeakerConnection: ResolverTypeWrapper<EventSpeakerConnection>;
    CreateSpeaker: CreateSpeaker;
    UpdateSpeaker: UpdateSpeaker;
    DeleteSpeaker: DeleteSpeaker;
    EventSpeakerMutationResponse: ResolverTypeWrapper<EventSpeakerMutationResponse>;
    EventVideo: ResolverTypeWrapper<EventVideo>;
    EventVideoEdge: ResolverTypeWrapper<EventVideoEdge>;
    EventVideoConnection: ResolverTypeWrapper<EventVideoConnection>;
    CreateVideo: CreateVideo;
    UpdateVideo: UpdateVideo;
    DeleteVideo: DeleteVideo;
    EventVideoMutationResponse: ResolverTypeWrapper<EventVideoMutationResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    Date: Scalars['Date'];
    PageInfo: PageInfo;
    Boolean: Scalars['Boolean'];
    String: Scalars['String'];
    Node:
        | ResolversParentTypes['User']
        | ResolversParentTypes['Event']
        | ResolversParentTypes['Organization']
        | ResolversParentTypes['EventLiveFeedback']
        | ResolversParentTypes['EventQuestion']
        | ResolversParentTypes['EventSpeaker']
        | ResolversParentTypes['EventVideo'];
    ID: Scalars['ID'];
    Query: {};
    Error: Error;
    MutationResponse:
        | ResolversParentTypes['UserMutationResponse']
        | ResolversParentTypes['EventMutationResponse']
        | ResolversParentTypes['OrganizationMutationResponse']
        | ResolversParentTypes['EventFeedbackMutationResponse']
        | ResolversParentTypes['InviteMutationResponse']
        | ResolversParentTypes['ModeratorMutationResponse']
        | ResolversParentTypes['EventQuestionMutationResponse']
        | ResolversParentTypes['EventSpeakerMutationResponse']
        | ResolversParentTypes['EventVideoMutationResponse'];
    User: User;
    Int: Scalars['Int'];
    UserSettings: UserSettings;
    UserEdge: UserEdge;
    UserConnection: UserConnection;
    RegistrationForm: RegistrationForm;
    UpdateEmailForm: UpdateEmailForm;
    UpdatePasswordForm: UpdatePasswordForm;
    DeleteAccountForm: DeleteAccountForm;
    LoginForm: LoginForm;
    UserMutationResponse: UserMutationResponse;
    Mutation: {};
    Event: Event;
    EventEdge: EventEdge;
    EventConnection: EventConnection;
    CreateEvent: CreateEvent;
    UpdateEvent: UpdateEvent;
    DeleteEvent: DeleteEvent;
    EventMutationResponse: EventMutationResponse;
    Subscription: {};
    Organization: Organization;
    OrganizationEdge: OrganizationEdge;
    OrganizationConnection: OrganizationConnection;
    OrganizationSubscription: OrganizationSubscription;
    CreateOrganization: CreateOrganization;
    UpdateOrganization: UpdateOrganization;
    DeleteOrganization: DeleteOrganization;
    CreateMember: CreateMember;
    DeleteMember: DeleteMember;
    OrganizationMutationResponse: OrganizationMutationResponse;
    EventLiveFeedback: EventLiveFeedback;
    EventLiveFeedbackEdge: EventLiveFeedbackEdge;
    EventLiveFeedbackConnection: EventLiveFeedbackConnection;
    FeedbackOperation: FeedbackOperation;
    EventFeedbackMutationResponse: EventFeedbackMutationResponse;
    CreateFeedback: CreateFeedback;
    CreateInvite: CreateInvite;
    ValidateInvite: ValidateInvite;
    InviteMutationResponse: InviteMutationResponse;
    ValidateInviteQueryResponse: ValidateInviteQueryResponse;
    HideQuestion: HideQuestion;
    UpdateQuestionPosition: UpdateQuestionPosition;
    CreateModerator: CreateModerator;
    DeleteModerator: DeleteModerator;
    UpdateModerator: UpdateModerator;
    AddQuestionToQueue: AddQuestionToQueue;
    RemoveQuestionFromQueue: RemoveQuestionFromQueue;
    UpdateQuestionQueue: UpdateQuestionQueue;
    ModeratorMutationResponse: ModeratorMutationResponse;
    EventParticipant: EventParticipant;
    EventParticipantEdge: EventParticipantEdge;
    EventParticipantConnection: EventParticipantConnection;
    EventQuestion: EventQuestion;
    EventQuestionQueue: EventQuestionQueue;
    EventQuestionEdge: EventQuestionEdge;
    EventQuestionConnection: EventQuestionConnection;
    Like: Like;
    CreateQuestion: CreateQuestion;
    DeleteQuestion: DeleteQuestion;
    AlterLike: AlterLike;
    EventQuestionMutationResponse: EventQuestionMutationResponse;
    EventQuestionEdgeContainer: EventQuestionEdgeContainer;
    EventSpeaker: EventSpeaker;
    EventSpeakerEdge: EventSpeakerEdge;
    EventSpeakerConnection: EventSpeakerConnection;
    CreateSpeaker: CreateSpeaker;
    UpdateSpeaker: UpdateSpeaker;
    DeleteSpeaker: DeleteSpeaker;
    EventSpeakerMutationResponse: EventSpeakerMutationResponse;
    EventVideo: EventVideo;
    EventVideoEdge: EventVideoEdge;
    EventVideoConnection: EventVideoConnection;
    CreateVideo: CreateVideo;
    UpdateVideo: UpdateVideo;
    DeleteVideo: DeleteVideo;
    EventVideoMutationResponse: EventVideoMutationResponse;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
    name: 'Date';
}

export type PageInfoResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = {
    hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NodeResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']
> = {
    __resolveType: TypeResolveFn<
        'User' | 'Event' | 'Organization' | 'EventLiveFeedback' | 'EventQuestion' | 'EventSpeaker' | 'EventVideo',
        ParentType,
        ContextType
    >;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type QueryResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
    node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QuerynodeArgs, 'id'>>;
    me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    events?: Resolver<Maybe<Array<ResolversTypes['Event']>>, ParentType, ContextType>;
    myFeedback?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['EventLiveFeedback']>>>,
        ParentType,
        ContextType,
        RequireFields<QuerymyFeedbackArgs, 'eventId'>
    >;
    validateInvite?: Resolver<
        ResolversTypes['ValidateInviteQueryResponse'],
        ParentType,
        ContextType,
        RequireFields<QueryvalidateInviteArgs, 'input'>
    >;
    questionsByEventId?: Resolver<
        Maybe<Array<ResolversTypes['EventQuestion']>>,
        ParentType,
        ContextType,
        RequireFields<QueryquestionsByEventIdArgs, 'eventId'>
    >;
};

export type ErrorResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']
> = {
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResponseResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']
> = {
    __resolveType: TypeResolveFn<
        | 'UserMutationResponse'
        | 'EventMutationResponse'
        | 'OrganizationMutationResponse'
        | 'EventFeedbackMutationResponse'
        | 'InviteMutationResponse'
        | 'ModeratorMutationResponse'
        | 'EventQuestionMutationResponse'
        | 'EventSpeakerMutationResponse'
        | 'EventVideoMutationResponse',
        ParentType,
        ContextType
    >;
    isError?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type UserResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    isEmailVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    organizations?: Resolver<
        Maybe<ResolversTypes['OrganizationConnection']>,
        ParentType,
        ContextType,
        RequireFields<UserorganizationsArgs, never>
    >;
    events?: Resolver<
        Maybe<ResolversTypes['EventConnection']>,
        ParentType,
        ContextType,
        RequireFields<UsereventsArgs, never>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['UserSettings'] = ResolversParentTypes['UserSettings']
> = {
    currentEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    updateEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    updatePassword?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    deleteAccount?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    isAnonymous?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    isNotificationsEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEdgeResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']
> = {
    node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserConnectionResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']
> = {
    edges?: Resolver<Maybe<Array<ResolversTypes['UserEdge']>>, ParentType, ContextType>;
    pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserMutationResponseResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['UserMutationResponse'] = ResolversParentTypes['UserMutationResponse']
> = {
    isError?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    body?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
    register?: Resolver<
        ResolversTypes['UserMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationregisterArgs, 'input'>
    >;
    login?: Resolver<
        ResolversTypes['UserMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationloginArgs, 'input'>
    >;
    updateEmail?: Resolver<
        ResolversTypes['UserMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationupdateEmailArgs, 'input'>
    >;
    updatePassword?: Resolver<
        ResolversTypes['UserMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationupdatePasswordArgs, 'input'>
    >;
    deleteAccount?: Resolver<
        ResolversTypes['UserMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationdeleteAccountArgs, 'input'>
    >;
    logout?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
    createEvent?: Resolver<
        ResolversTypes['EventMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationcreateEventArgs, 'event'>
    >;
    updateEvent?: Resolver<
        ResolversTypes['EventMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationupdateEventArgs, 'event'>
    >;
    deleteEvent?: Resolver<
        ResolversTypes['EventMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationdeleteEventArgs, 'event'>
    >;
    startEvent?: Resolver<
        ResolversTypes['EventMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationstartEventArgs, 'eventId'>
    >;
    endEvent?: Resolver<
        ResolversTypes['EventMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationendEventArgs, 'eventId'>
    >;
    createOrganization?: Resolver<
        ResolversTypes['OrganizationMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationcreateOrganizationArgs, 'input'>
    >;
    updateOrganization?: Resolver<
        ResolversTypes['OrganizationMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationupdateOrganizationArgs, 'input'>
    >;
    deleteOrganization?: Resolver<
        ResolversTypes['OrganizationMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationdeleteOrganizationArgs, 'input'>
    >;
    createMember?: Resolver<
        ResolversTypes['UserMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationcreateMemberArgs, 'input'>
    >;
    deleteMember?: Resolver<
        ResolversTypes['UserMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationdeleteMemberArgs, 'input'>
    >;
    createFeedback?: Resolver<
        Maybe<ResolversTypes['EventFeedbackMutationResponse']>,
        ParentType,
        ContextType,
        RequireFields<MutationcreateFeedbackArgs, never>
    >;
    createInvite?: Resolver<
        ResolversTypes['InviteMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationcreateInviteArgs, 'input'>
    >;
    hideQuestion?: Resolver<
        Maybe<ResolversTypes['EventQuestion']>,
        ParentType,
        ContextType,
        RequireFields<MutationhideQuestionArgs, 'input'>
    >;
    updateQuestionPosition?: Resolver<
        ResolversTypes['EventQuestionMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationupdateQuestionPositionArgs, 'input'>
    >;
    addQuestionToQueue?: Resolver<
        ResolversTypes['EventQuestionMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationaddQuestionToQueueArgs, 'input'>
    >;
    removeQuestionFromQueue?: Resolver<
        ResolversTypes['EventQuestionMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationremoveQuestionFromQueueArgs, 'input'>
    >;
    createModerator?: Resolver<
        ResolversTypes['ModeratorMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationcreateModeratorArgs, 'input'>
    >;
    updateModerator?: Resolver<
        ResolversTypes['ModeratorMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationupdateModeratorArgs, 'input'>
    >;
    deleteModerator?: Resolver<
        ResolversTypes['ModeratorMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationdeleteModeratorArgs, 'input'>
    >;
    nextQuestion?: Resolver<
        ResolversTypes['Event'],
        ParentType,
        ContextType,
        RequireFields<MutationnextQuestionArgs, 'eventId'>
    >;
    prevQuestion?: Resolver<
        ResolversTypes['Event'],
        ParentType,
        ContextType,
        RequireFields<MutationprevQuestionArgs, 'eventId'>
    >;
    createQuestion?: Resolver<
        ResolversTypes['EventQuestionMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationcreateQuestionArgs, 'input'>
    >;
    deleteQuestion?: Resolver<
        ResolversTypes['EventQuestionMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationdeleteQuestionArgs, 'input'>
    >;
    alterLike?: Resolver<
        ResolversTypes['EventQuestionMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationalterLikeArgs, 'input'>
    >;
    createSpeaker?: Resolver<
        ResolversTypes['EventSpeakerMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationcreateSpeakerArgs, 'input'>
    >;
    deleteSpeaker?: Resolver<
        ResolversTypes['EventSpeakerMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationdeleteSpeakerArgs, 'input'>
    >;
    updateSpeaker?: Resolver<
        ResolversTypes['EventSpeakerMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationupdateSpeakerArgs, 'input'>
    >;
    createVideo?: Resolver<
        ResolversTypes['EventVideoMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationcreateVideoArgs, 'input'>
    >;
    deleteVideo?: Resolver<
        ResolversTypes['EventVideoMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationdeleteVideoArgs, 'input'>
    >;
    updateVideo?: Resolver<
        ResolversTypes['EventVideoMutationResponse'],
        ParentType,
        ContextType,
        RequireFields<MutationupdateVideoArgs, 'input'>
    >;
};

export type EventResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']
> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    startDateTime?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    endDateTime?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    topic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    isQuestionFeedVisible?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    isCollectRatingsEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    isForumEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    isPrivate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    questions?: Resolver<
        Maybe<ResolversTypes['EventQuestionConnection']>,
        ParentType,
        ContextType,
        RequireFields<EventquestionsArgs, never>
    >;
    speakers?: Resolver<
        Maybe<ResolversTypes['EventSpeakerConnection']>,
        ParentType,
        ContextType,
        RequireFields<EventspeakersArgs, never>
    >;
    registrants?: Resolver<Maybe<ResolversTypes['UserConnection']>, ParentType, ContextType>;
    participants?: Resolver<
        Maybe<ResolversTypes['EventParticipantConnection']>,
        ParentType,
        ContextType,
        RequireFields<EventparticipantsArgs, never>
    >;
    videos?: Resolver<
        Maybe<ResolversTypes['EventVideoConnection']>,
        ParentType,
        ContextType,
        RequireFields<EventvideosArgs, never>
    >;
    liveFeedback?: Resolver<
        Maybe<ResolversTypes['EventLiveFeedbackConnection']>,
        ParentType,
        ContextType,
        RequireFields<EventliveFeedbackArgs, never>
    >;
    moderators?: Resolver<
        Maybe<ResolversTypes['UserConnection']>,
        ParentType,
        ContextType,
        RequireFields<EventmoderatorsArgs, never>
    >;
    isViewerModerator?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    invited?: Resolver<
        Maybe<ResolversTypes['UserConnection']>,
        ParentType,
        ContextType,
        RequireFields<EventinvitedArgs, never>
    >;
    isViewerInvited?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    questionQueue?: Resolver<
        Maybe<ResolversTypes['EventQuestionQueue']>,
        ParentType,
        ContextType,
        RequireFields<EventquestionQueueArgs, never>
    >;
    currentQuestion?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventEdgeResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventEdge'] = ResolversParentTypes['EventEdge']
> = {
    node?: Resolver<ResolversTypes['Event'], ParentType, ContextType>;
    cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventConnectionResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventConnection'] = ResolversParentTypes['EventConnection']
> = {
    edges?: Resolver<Maybe<Array<ResolversTypes['EventEdge']>>, ParentType, ContextType>;
    pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventMutationResponseResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventMutationResponse'] = ResolversParentTypes['EventMutationResponse']
> = {
    isError?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    body?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
    eventUpdates?: SubscriptionResolver<
        ResolversTypes['Event'],
        'eventUpdates',
        ParentType,
        ContextType,
        RequireFields<SubscriptioneventUpdatesArgs, 'eventId'>
    >;
    orgUpdated?: SubscriptionResolver<
        ResolversTypes['OrganizationSubscription'],
        'orgUpdated',
        ParentType,
        ContextType
    >;
    feedbackCRUD?: SubscriptionResolver<
        ResolversTypes['FeedbackOperation'],
        'feedbackCRUD',
        ParentType,
        ContextType,
        RequireFields<SubscriptionfeedbackCRUDArgs, 'eventId'>
    >;
    eventLiveFeedbackCreated?: SubscriptionResolver<
        ResolversTypes['EventLiveFeedback'],
        'eventLiveFeedbackCreated',
        ParentType,
        ContextType,
        RequireFields<SubscriptioneventLiveFeedbackCreatedArgs, 'eventId'>
    >;
    questionCreated?: SubscriptionResolver<
        ResolversTypes['EventQuestionEdgeContainer'],
        'questionCreated',
        ParentType,
        ContextType,
        RequireFields<SubscriptionquestionCreatedArgs, 'eventId'>
    >;
    questionUpdated?: SubscriptionResolver<
        ResolversTypes['EventQuestionEdgeContainer'],
        'questionUpdated',
        ParentType,
        ContextType,
        RequireFields<SubscriptionquestionUpdatedArgs, 'eventId'>
    >;
    questionDeleted?: SubscriptionResolver<
        ResolversTypes['EventQuestionEdgeContainer'],
        'questionDeleted',
        ParentType,
        ContextType,
        RequireFields<SubscriptionquestionDeletedArgs, 'eventId'>
    >;
    questionAddedToRecord?: SubscriptionResolver<
        ResolversTypes['EventQuestionEdgeContainer'],
        'questionAddedToRecord',
        ParentType,
        ContextType,
        RequireFields<SubscriptionquestionAddedToRecordArgs, 'eventId'>
    >;
    questionRemovedFromRecord?: SubscriptionResolver<
        ResolversTypes['EventQuestionEdgeContainer'],
        'questionRemovedFromRecord',
        ParentType,
        ContextType,
        RequireFields<SubscriptionquestionRemovedFromRecordArgs, 'eventId'>
    >;
    recordPushQuestion?: SubscriptionResolver<
        ResolversTypes['EventQuestionEdgeContainer'],
        'recordPushQuestion',
        ParentType,
        ContextType,
        RequireFields<SubscriptionrecordPushQuestionArgs, 'eventId'>
    >;
    recordUnshiftQuestion?: SubscriptionResolver<
        ResolversTypes['EventQuestionEdgeContainer'],
        'recordUnshiftQuestion',
        ParentType,
        ContextType,
        RequireFields<SubscriptionrecordUnshiftQuestionArgs, 'eventId'>
    >;
    recordRemoveQuestion?: SubscriptionResolver<
        ResolversTypes['EventQuestionEdgeContainer'],
        'recordRemoveQuestion',
        ParentType,
        ContextType,
        RequireFields<SubscriptionrecordRemoveQuestionArgs, 'eventId'>
    >;
    enqueuedPushQuestion?: SubscriptionResolver<
        ResolversTypes['EventQuestionEdgeContainer'],
        'enqueuedPushQuestion',
        ParentType,
        ContextType,
        RequireFields<SubscriptionenqueuedPushQuestionArgs, 'eventId'>
    >;
    enqueuedUnshiftQuestion?: SubscriptionResolver<
        ResolversTypes['EventQuestionEdgeContainer'],
        'enqueuedUnshiftQuestion',
        ParentType,
        ContextType,
        RequireFields<SubscriptionenqueuedUnshiftQuestionArgs, 'eventId'>
    >;
    enqueuedRemoveQuestion?: SubscriptionResolver<
        ResolversTypes['EventQuestionEdgeContainer'],
        'enqueuedRemoveQuestion',
        ParentType,
        ContextType,
        RequireFields<SubscriptionenqueuedRemoveQuestionArgs, 'eventId'>
    >;
    questionAddedToEnqueued?: SubscriptionResolver<
        ResolversTypes['EventQuestionEdgeContainer'],
        'questionAddedToEnqueued',
        ParentType,
        ContextType,
        RequireFields<SubscriptionquestionAddedToEnqueuedArgs, 'eventId'>
    >;
    questionRemovedFromEnqueued?: SubscriptionResolver<
        ResolversTypes['EventQuestionEdgeContainer'],
        'questionRemovedFromEnqueued',
        ParentType,
        ContextType,
        RequireFields<SubscriptionquestionRemovedFromEnqueuedArgs, 'eventId'>
    >;
};

export type OrganizationResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']
> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    members?: Resolver<
        Maybe<ResolversTypes['UserConnection']>,
        ParentType,
        ContextType,
        RequireFields<OrganizationmembersArgs, never>
    >;
    events?: Resolver<
        Maybe<ResolversTypes['EventConnection']>,
        ParentType,
        ContextType,
        RequireFields<OrganizationeventsArgs, never>
    >;
    isViewerMember?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationEdgeResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['OrganizationEdge'] = ResolversParentTypes['OrganizationEdge']
> = {
    node?: Resolver<ResolversTypes['Organization'], ParentType, ContextType>;
    cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationConnectionResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['OrganizationConnection'] = ResolversParentTypes['OrganizationConnection']
> = {
    edges?: Resolver<Maybe<Array<ResolversTypes['OrganizationEdge']>>, ParentType, ContextType>;
    pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationSubscriptionResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['OrganizationSubscription'] = ResolversParentTypes['OrganizationSubscription']
> = {
    orgId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    deleteMember?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationMutationResponseResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['OrganizationMutationResponse'] = ResolversParentTypes['OrganizationMutationResponse']
> = {
    isError?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    body?: Resolver<Maybe<ResolversTypes['OrganizationEdge']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventLiveFeedbackResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventLiveFeedback'] = ResolversParentTypes['EventLiveFeedback']
> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    createdById?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    isReply?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    refFeedback?: Resolver<Maybe<ResolversTypes['EventLiveFeedback']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventLiveFeedbackEdgeResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventLiveFeedbackEdge'] = ResolversParentTypes['EventLiveFeedbackEdge']
> = {
    node?: Resolver<ResolversTypes['EventLiveFeedback'], ParentType, ContextType>;
    cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventLiveFeedbackConnectionResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventLiveFeedbackConnection'] = ResolversParentTypes['EventLiveFeedbackConnection']
> = {
    edges?: Resolver<Maybe<Array<ResolversTypes['EventLiveFeedbackEdge']>>, ParentType, ContextType>;
    pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedbackOperationResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['FeedbackOperation'] = ResolversParentTypes['FeedbackOperation']
> = {
    operationType?: Resolver<ResolversTypes['Operation'], ParentType, ContextType>;
    edge?: Resolver<ResolversTypes['EventLiveFeedbackEdge'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventFeedbackMutationResponseResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventFeedbackMutationResponse'] = ResolversParentTypes['EventFeedbackMutationResponse']
> = {
    isError?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    body?: Resolver<Maybe<ResolversTypes['EventLiveFeedbackEdge']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InviteMutationResponseResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['InviteMutationResponse'] = ResolversParentTypes['InviteMutationResponse']
> = {
    isError?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidateInviteQueryResponseResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['ValidateInviteQueryResponse'] = ResolversParentTypes['ValidateInviteQueryResponse']
> = {
    valid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModeratorMutationResponseResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['ModeratorMutationResponse'] = ResolversParentTypes['ModeratorMutationResponse']
> = {
    isError?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    body?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventParticipantResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventParticipant'] = ResolversParentTypes['EventParticipant']
> = {
    user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    questions?: Resolver<Maybe<Array<Maybe<ResolversTypes['EventQuestion']>>>, ParentType, ContextType>;
    liveFeedBack?: Resolver<Maybe<Array<Maybe<ResolversTypes['EventLiveFeedback']>>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventParticipantEdgeResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventParticipantEdge'] = ResolversParentTypes['EventParticipantEdge']
> = {
    node?: Resolver<ResolversTypes['EventParticipant'], ParentType, ContextType>;
    cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventParticipantConnectionResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventParticipantConnection'] = ResolversParentTypes['EventParticipantConnection']
> = {
    edges?: Resolver<Maybe<Array<ResolversTypes['EventParticipantEdge']>>, ParentType, ContextType>;
    pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventQuestionResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventQuestion'] = ResolversParentTypes['EventQuestion']
> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
    createdById?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    refQuestion?: Resolver<Maybe<ResolversTypes['EventQuestion']>, ParentType, ContextType>;
    question?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    position?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    isVisible?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    isAsked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    lang?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    isFollowUp?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    isQuote?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    likedBy?: Resolver<Maybe<ResolversTypes['UserConnection']>, ParentType, ContextType>;
    likedByCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    isLikedByViewer?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    isMyQuestion?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventQuestionQueueResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventQuestionQueue'] = ResolversParentTypes['EventQuestionQueue']
> = {
    questionRecord?: Resolver<
        Maybe<ResolversTypes['EventQuestionConnection']>,
        ParentType,
        ContextType,
        RequireFields<EventQuestionQueuequestionRecordArgs, never>
    >;
    enqueuedQuestions?: Resolver<
        Maybe<ResolversTypes['EventQuestionConnection']>,
        ParentType,
        ContextType,
        RequireFields<EventQuestionQueueenqueuedQuestionsArgs, never>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventQuestionEdgeResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventQuestionEdge'] = ResolversParentTypes['EventQuestionEdge']
> = {
    node?: Resolver<ResolversTypes['EventQuestion'], ParentType, ContextType>;
    cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventQuestionConnectionResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventQuestionConnection'] = ResolversParentTypes['EventQuestionConnection']
> = {
    edges?: Resolver<Maybe<Array<ResolversTypes['EventQuestionEdge']>>, ParentType, ContextType>;
    pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']
> = {
    user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    question?: Resolver<ResolversTypes['EventQuestion'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventQuestionMutationResponseResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventQuestionMutationResponse'] = ResolversParentTypes['EventQuestionMutationResponse']
> = {
    isError?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    body?: Resolver<Maybe<ResolversTypes['EventQuestionEdge']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventQuestionEdgeContainerResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventQuestionEdgeContainer'] = ResolversParentTypes['EventQuestionEdgeContainer']
> = {
    edge?: Resolver<ResolversTypes['EventQuestionEdge'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventSpeakerResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventSpeaker'] = ResolversParentTypes['EventSpeaker']
> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    eventId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    pictureUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventSpeakerEdgeResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventSpeakerEdge'] = ResolversParentTypes['EventSpeakerEdge']
> = {
    node?: Resolver<ResolversTypes['EventSpeaker'], ParentType, ContextType>;
    cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventSpeakerConnectionResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventSpeakerConnection'] = ResolversParentTypes['EventSpeakerConnection']
> = {
    edges?: Resolver<Maybe<Array<ResolversTypes['EventSpeakerEdge']>>, ParentType, ContextType>;
    pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventSpeakerMutationResponseResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventSpeakerMutationResponse'] = ResolversParentTypes['EventSpeakerMutationResponse']
> = {
    isError?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    body?: Resolver<Maybe<ResolversTypes['EventSpeaker']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventVideoResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventVideo'] = ResolversParentTypes['EventVideo']
> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    lang?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventVideoEdgeResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventVideoEdge'] = ResolversParentTypes['EventVideoEdge']
> = {
    node?: Resolver<ResolversTypes['EventVideo'], ParentType, ContextType>;
    cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventVideoConnectionResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventVideoConnection'] = ResolversParentTypes['EventVideoConnection']
> = {
    edges?: Resolver<Maybe<Array<ResolversTypes['EventVideoEdge']>>, ParentType, ContextType>;
    pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventVideoMutationResponseResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['EventVideoMutationResponse'] = ResolversParentTypes['EventVideoMutationResponse']
> = {
    isError?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    body?: Resolver<Maybe<ResolversTypes['EventVideo']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MercuriusContext> = {
    Date?: GraphQLScalarType;
    PageInfo?: PageInfoResolvers<ContextType>;
    Node?: NodeResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    Error?: ErrorResolvers<ContextType>;
    MutationResponse?: MutationResponseResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
    UserSettings?: UserSettingsResolvers<ContextType>;
    UserEdge?: UserEdgeResolvers<ContextType>;
    UserConnection?: UserConnectionResolvers<ContextType>;
    UserMutationResponse?: UserMutationResponseResolvers<ContextType>;
    Mutation?: MutationResolvers<ContextType>;
    Event?: EventResolvers<ContextType>;
    EventEdge?: EventEdgeResolvers<ContextType>;
    EventConnection?: EventConnectionResolvers<ContextType>;
    EventMutationResponse?: EventMutationResponseResolvers<ContextType>;
    Subscription?: SubscriptionResolvers<ContextType>;
    Organization?: OrganizationResolvers<ContextType>;
    OrganizationEdge?: OrganizationEdgeResolvers<ContextType>;
    OrganizationConnection?: OrganizationConnectionResolvers<ContextType>;
    OrganizationSubscription?: OrganizationSubscriptionResolvers<ContextType>;
    OrganizationMutationResponse?: OrganizationMutationResponseResolvers<ContextType>;
    EventLiveFeedback?: EventLiveFeedbackResolvers<ContextType>;
    EventLiveFeedbackEdge?: EventLiveFeedbackEdgeResolvers<ContextType>;
    EventLiveFeedbackConnection?: EventLiveFeedbackConnectionResolvers<ContextType>;
    FeedbackOperation?: FeedbackOperationResolvers<ContextType>;
    EventFeedbackMutationResponse?: EventFeedbackMutationResponseResolvers<ContextType>;
    InviteMutationResponse?: InviteMutationResponseResolvers<ContextType>;
    ValidateInviteQueryResponse?: ValidateInviteQueryResponseResolvers<ContextType>;
    ModeratorMutationResponse?: ModeratorMutationResponseResolvers<ContextType>;
    EventParticipant?: EventParticipantResolvers<ContextType>;
    EventParticipantEdge?: EventParticipantEdgeResolvers<ContextType>;
    EventParticipantConnection?: EventParticipantConnectionResolvers<ContextType>;
    EventQuestion?: EventQuestionResolvers<ContextType>;
    EventQuestionQueue?: EventQuestionQueueResolvers<ContextType>;
    EventQuestionEdge?: EventQuestionEdgeResolvers<ContextType>;
    EventQuestionConnection?: EventQuestionConnectionResolvers<ContextType>;
    Like?: LikeResolvers<ContextType>;
    EventQuestionMutationResponse?: EventQuestionMutationResponseResolvers<ContextType>;
    EventQuestionEdgeContainer?: EventQuestionEdgeContainerResolvers<ContextType>;
    EventSpeaker?: EventSpeakerResolvers<ContextType>;
    EventSpeakerEdge?: EventSpeakerEdgeResolvers<ContextType>;
    EventSpeakerConnection?: EventSpeakerConnectionResolvers<ContextType>;
    EventSpeakerMutationResponse?: EventSpeakerMutationResponseResolvers<ContextType>;
    EventVideo?: EventVideoResolvers<ContextType>;
    EventVideoEdge?: EventVideoEdgeResolvers<ContextType>;
    EventVideoConnection?: EventVideoConnectionResolvers<ContextType>;
    EventVideoMutationResponse?: EventVideoMutationResponseResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = MercuriusContext> = Resolvers<ContextType>;

type Loader<TReturn, TObj, TParams, TContext> = (
    queries: Array<{
        obj: TObj;
        params: TParams;
    }>,
    context: TContext & {
        reply: import('fastify').FastifyReply;
    }
) => Promise<Array<import('mercurius-codegen').DeepPartial<TReturn>>>;
type LoaderResolver<TReturn, TObj, TParams, TContext> =
    | Loader<TReturn, TObj, TParams, TContext>
    | {
          loader: Loader<TReturn, TObj, TParams, TContext>;
          opts?: {
              cache?: boolean;
          };
      };
export interface Loaders<TContext = import('mercurius').MercuriusContext & { reply: import('fastify').FastifyReply }> {
    PageInfo?: {
        hasNextPage?: LoaderResolver<Scalars['Boolean'], PageInfo, {}, TContext>;
        hasPreviousPage?: LoaderResolver<Scalars['Boolean'], PageInfo, {}, TContext>;
        startCursor?: LoaderResolver<Maybe<Scalars['String']>, PageInfo, {}, TContext>;
        endCursor?: LoaderResolver<Maybe<Scalars['String']>, PageInfo, {}, TContext>;
    };

    Error?: {
        message?: LoaderResolver<Scalars['String'], Error, {}, TContext>;
    };

    User?: {
        id?: LoaderResolver<Scalars['ID'], User, {}, TContext>;
        firstName?: LoaderResolver<Maybe<Scalars['String']>, User, {}, TContext>;
        lastName?: LoaderResolver<Maybe<Scalars['String']>, User, {}, TContext>;
        email?: LoaderResolver<Maybe<Scalars['String']>, User, {}, TContext>;
        isEmailVerified?: LoaderResolver<Maybe<Scalars['Boolean']>, User, {}, TContext>;
        avatar?: LoaderResolver<Maybe<Scalars['String']>, User, {}, TContext>;
        organizations?: LoaderResolver<Maybe<OrganizationConnection>, User, UserorganizationsArgs, TContext>;
        events?: LoaderResolver<Maybe<EventConnection>, User, UsereventsArgs, TContext>;
    };

    UserSettings?: {
        currentEmail?: LoaderResolver<Scalars['String'], UserSettings, {}, TContext>;
        updateEmail?: LoaderResolver<Maybe<Scalars['String']>, UserSettings, {}, TContext>;
        updatePassword?: LoaderResolver<Maybe<Scalars['String']>, UserSettings, {}, TContext>;
        deleteAccount?: LoaderResolver<Scalars['Boolean'], UserSettings, {}, TContext>;
        isAnonymous?: LoaderResolver<Scalars['Boolean'], UserSettings, {}, TContext>;
        isNotificationsEnabled?: LoaderResolver<Scalars['Boolean'], UserSettings, {}, TContext>;
    };

    UserEdge?: {
        node?: LoaderResolver<User, UserEdge, {}, TContext>;
        cursor?: LoaderResolver<Scalars['String'], UserEdge, {}, TContext>;
    };

    UserConnection?: {
        edges?: LoaderResolver<Maybe<Array<UserEdge>>, UserConnection, {}, TContext>;
        pageInfo?: LoaderResolver<PageInfo, UserConnection, {}, TContext>;
    };

    UserMutationResponse?: {
        isError?: LoaderResolver<Scalars['Boolean'], UserMutationResponse, {}, TContext>;
        message?: LoaderResolver<Scalars['String'], UserMutationResponse, {}, TContext>;
        body?: LoaderResolver<Maybe<User>, UserMutationResponse, {}, TContext>;
    };

    Event?: {
        id?: LoaderResolver<Scalars['ID'], Event, {}, TContext>;
        createdBy?: LoaderResolver<Maybe<User>, Event, {}, TContext>;
        organization?: LoaderResolver<Maybe<Organization>, Event, {}, TContext>;
        createdAt?: LoaderResolver<Maybe<Scalars['Date']>, Event, {}, TContext>;
        updatedAt?: LoaderResolver<Maybe<Scalars['Date']>, Event, {}, TContext>;
        title?: LoaderResolver<Maybe<Scalars['String']>, Event, {}, TContext>;
        startDateTime?: LoaderResolver<Maybe<Scalars['Date']>, Event, {}, TContext>;
        endDateTime?: LoaderResolver<Maybe<Scalars['Date']>, Event, {}, TContext>;
        description?: LoaderResolver<Maybe<Scalars['String']>, Event, {}, TContext>;
        topic?: LoaderResolver<Maybe<Scalars['String']>, Event, {}, TContext>;
        isActive?: LoaderResolver<Maybe<Scalars['Boolean']>, Event, {}, TContext>;
        isQuestionFeedVisible?: LoaderResolver<Maybe<Scalars['Boolean']>, Event, {}, TContext>;
        isCollectRatingsEnabled?: LoaderResolver<Maybe<Scalars['Boolean']>, Event, {}, TContext>;
        isForumEnabled?: LoaderResolver<Maybe<Scalars['Boolean']>, Event, {}, TContext>;
        isPrivate?: LoaderResolver<Maybe<Scalars['Boolean']>, Event, {}, TContext>;
        questions?: LoaderResolver<Maybe<EventQuestionConnection>, Event, EventquestionsArgs, TContext>;
        speakers?: LoaderResolver<Maybe<EventSpeakerConnection>, Event, EventspeakersArgs, TContext>;
        registrants?: LoaderResolver<Maybe<UserConnection>, Event, {}, TContext>;
        participants?: LoaderResolver<Maybe<EventParticipantConnection>, Event, EventparticipantsArgs, TContext>;
        videos?: LoaderResolver<Maybe<EventVideoConnection>, Event, EventvideosArgs, TContext>;
        liveFeedback?: LoaderResolver<Maybe<EventLiveFeedbackConnection>, Event, EventliveFeedbackArgs, TContext>;
        moderators?: LoaderResolver<Maybe<UserConnection>, Event, EventmoderatorsArgs, TContext>;
        isViewerModerator?: LoaderResolver<Maybe<Scalars['Boolean']>, Event, {}, TContext>;
        invited?: LoaderResolver<Maybe<UserConnection>, Event, EventinvitedArgs, TContext>;
        isViewerInvited?: LoaderResolver<Maybe<Scalars['Boolean']>, Event, {}, TContext>;
        questionQueue?: LoaderResolver<Maybe<EventQuestionQueue>, Event, EventquestionQueueArgs, TContext>;
        currentQuestion?: LoaderResolver<Maybe<Scalars['Int']>, Event, {}, TContext>;
    };

    EventEdge?: {
        node?: LoaderResolver<Event, EventEdge, {}, TContext>;
        cursor?: LoaderResolver<Scalars['String'], EventEdge, {}, TContext>;
    };

    EventConnection?: {
        edges?: LoaderResolver<Maybe<Array<EventEdge>>, EventConnection, {}, TContext>;
        pageInfo?: LoaderResolver<PageInfo, EventConnection, {}, TContext>;
    };

    EventMutationResponse?: {
        isError?: LoaderResolver<Scalars['Boolean'], EventMutationResponse, {}, TContext>;
        message?: LoaderResolver<Scalars['String'], EventMutationResponse, {}, TContext>;
        body?: LoaderResolver<Maybe<Event>, EventMutationResponse, {}, TContext>;
    };

    Organization?: {
        id?: LoaderResolver<Scalars['ID'], Organization, {}, TContext>;
        name?: LoaderResolver<Scalars['String'], Organization, {}, TContext>;
        createdAt?: LoaderResolver<Maybe<Scalars['Date']>, Organization, {}, TContext>;
        members?: LoaderResolver<Maybe<UserConnection>, Organization, OrganizationmembersArgs, TContext>;
        events?: LoaderResolver<Maybe<EventConnection>, Organization, OrganizationeventsArgs, TContext>;
        isViewerMember?: LoaderResolver<Maybe<Scalars['Boolean']>, Organization, {}, TContext>;
    };

    OrganizationEdge?: {
        node?: LoaderResolver<Organization, OrganizationEdge, {}, TContext>;
        cursor?: LoaderResolver<Scalars['String'], OrganizationEdge, {}, TContext>;
    };

    OrganizationConnection?: {
        edges?: LoaderResolver<Maybe<Array<OrganizationEdge>>, OrganizationConnection, {}, TContext>;
        pageInfo?: LoaderResolver<PageInfo, OrganizationConnection, {}, TContext>;
    };

    OrganizationSubscription?: {
        orgId?: LoaderResolver<Scalars['ID'], OrganizationSubscription, {}, TContext>;
        userId?: LoaderResolver<Maybe<Scalars['ID']>, OrganizationSubscription, {}, TContext>;
        deleteMember?: LoaderResolver<Scalars['Boolean'], OrganizationSubscription, {}, TContext>;
    };

    OrganizationMutationResponse?: {
        isError?: LoaderResolver<Scalars['Boolean'], OrganizationMutationResponse, {}, TContext>;
        message?: LoaderResolver<Scalars['String'], OrganizationMutationResponse, {}, TContext>;
        body?: LoaderResolver<Maybe<OrganizationEdge>, OrganizationMutationResponse, {}, TContext>;
    };

    EventLiveFeedback?: {
        id?: LoaderResolver<Scalars['ID'], EventLiveFeedback, {}, TContext>;
        message?: LoaderResolver<Scalars['String'], EventLiveFeedback, {}, TContext>;
        event?: LoaderResolver<Maybe<Event>, EventLiveFeedback, {}, TContext>;
        createdAt?: LoaderResolver<Maybe<Scalars['Date']>, EventLiveFeedback, {}, TContext>;
        createdBy?: LoaderResolver<Maybe<User>, EventLiveFeedback, {}, TContext>;
        createdById?: LoaderResolver<Maybe<Scalars['ID']>, EventLiveFeedback, {}, TContext>;
        isReply?: LoaderResolver<Maybe<Scalars['Boolean']>, EventLiveFeedback, {}, TContext>;
        refFeedback?: LoaderResolver<Maybe<EventLiveFeedback>, EventLiveFeedback, {}, TContext>;
    };

    EventLiveFeedbackEdge?: {
        node?: LoaderResolver<EventLiveFeedback, EventLiveFeedbackEdge, {}, TContext>;
        cursor?: LoaderResolver<Scalars['String'], EventLiveFeedbackEdge, {}, TContext>;
    };

    EventLiveFeedbackConnection?: {
        edges?: LoaderResolver<Maybe<Array<EventLiveFeedbackEdge>>, EventLiveFeedbackConnection, {}, TContext>;
        pageInfo?: LoaderResolver<PageInfo, EventLiveFeedbackConnection, {}, TContext>;
    };

    FeedbackOperation?: {
        operationType?: LoaderResolver<Operation, FeedbackOperation, {}, TContext>;
        edge?: LoaderResolver<EventLiveFeedbackEdge, FeedbackOperation, {}, TContext>;
    };

    EventFeedbackMutationResponse?: {
        isError?: LoaderResolver<Scalars['Boolean'], EventFeedbackMutationResponse, {}, TContext>;
        message?: LoaderResolver<Scalars['String'], EventFeedbackMutationResponse, {}, TContext>;
        body?: LoaderResolver<Maybe<EventLiveFeedbackEdge>, EventFeedbackMutationResponse, {}, TContext>;
    };

    InviteMutationResponse?: {
        isError?: LoaderResolver<Scalars['Boolean'], InviteMutationResponse, {}, TContext>;
        message?: LoaderResolver<Scalars['String'], InviteMutationResponse, {}, TContext>;
    };

    ValidateInviteQueryResponse?: {
        valid?: LoaderResolver<Scalars['Boolean'], ValidateInviteQueryResponse, {}, TContext>;
    };

    ModeratorMutationResponse?: {
        isError?: LoaderResolver<Scalars['Boolean'], ModeratorMutationResponse, {}, TContext>;
        message?: LoaderResolver<Scalars['String'], ModeratorMutationResponse, {}, TContext>;
        body?: LoaderResolver<Maybe<User>, ModeratorMutationResponse, {}, TContext>;
    };

    EventParticipant?: {
        user?: LoaderResolver<Maybe<User>, EventParticipant, {}, TContext>;
        questions?: LoaderResolver<Maybe<Array<Maybe<EventQuestion>>>, EventParticipant, {}, TContext>;
        liveFeedBack?: LoaderResolver<Maybe<Array<Maybe<EventLiveFeedback>>>, EventParticipant, {}, TContext>;
    };

    EventParticipantEdge?: {
        node?: LoaderResolver<EventParticipant, EventParticipantEdge, {}, TContext>;
        cursor?: LoaderResolver<Scalars['String'], EventParticipantEdge, {}, TContext>;
    };

    EventParticipantConnection?: {
        edges?: LoaderResolver<Maybe<Array<EventParticipantEdge>>, EventParticipantConnection, {}, TContext>;
        pageInfo?: LoaderResolver<PageInfo, EventParticipantConnection, {}, TContext>;
    };

    EventQuestion?: {
        id?: LoaderResolver<Scalars['ID'], EventQuestion, {}, TContext>;
        event?: LoaderResolver<Maybe<Event>, EventQuestion, {}, TContext>;
        createdById?: LoaderResolver<Maybe<Scalars['ID']>, EventQuestion, {}, TContext>;
        createdBy?: LoaderResolver<Maybe<User>, EventQuestion, {}, TContext>;
        createdAt?: LoaderResolver<Maybe<Scalars['Date']>, EventQuestion, {}, TContext>;
        refQuestion?: LoaderResolver<Maybe<EventQuestion>, EventQuestion, {}, TContext>;
        question?: LoaderResolver<Maybe<Scalars['String']>, EventQuestion, {}, TContext>;
        position?: LoaderResolver<Maybe<Scalars['Int']>, EventQuestion, {}, TContext>;
        isVisible?: LoaderResolver<Maybe<Scalars['Boolean']>, EventQuestion, {}, TContext>;
        isAsked?: LoaderResolver<Maybe<Scalars['Boolean']>, EventQuestion, {}, TContext>;
        lang?: LoaderResolver<Maybe<Scalars['String']>, EventQuestion, {}, TContext>;
        isFollowUp?: LoaderResolver<Maybe<Scalars['Boolean']>, EventQuestion, {}, TContext>;
        isQuote?: LoaderResolver<Maybe<Scalars['Boolean']>, EventQuestion, {}, TContext>;
        likedBy?: LoaderResolver<Maybe<UserConnection>, EventQuestion, {}, TContext>;
        likedByCount?: LoaderResolver<Maybe<Scalars['Int']>, EventQuestion, {}, TContext>;
        isLikedByViewer?: LoaderResolver<Maybe<Scalars['Boolean']>, EventQuestion, {}, TContext>;
        isMyQuestion?: LoaderResolver<Maybe<Scalars['Boolean']>, EventQuestion, {}, TContext>;
    };

    EventQuestionQueue?: {
        questionRecord?: LoaderResolver<
            Maybe<EventQuestionConnection>,
            EventQuestionQueue,
            EventQuestionQueuequestionRecordArgs,
            TContext
        >;
        enqueuedQuestions?: LoaderResolver<
            Maybe<EventQuestionConnection>,
            EventQuestionQueue,
            EventQuestionQueueenqueuedQuestionsArgs,
            TContext
        >;
    };

    EventQuestionEdge?: {
        node?: LoaderResolver<EventQuestion, EventQuestionEdge, {}, TContext>;
        cursor?: LoaderResolver<Scalars['String'], EventQuestionEdge, {}, TContext>;
    };

    EventQuestionConnection?: {
        edges?: LoaderResolver<Maybe<Array<EventQuestionEdge>>, EventQuestionConnection, {}, TContext>;
        pageInfo?: LoaderResolver<PageInfo, EventQuestionConnection, {}, TContext>;
    };

    Like?: {
        user?: LoaderResolver<User, Like, {}, TContext>;
        question?: LoaderResolver<EventQuestion, Like, {}, TContext>;
    };

    EventQuestionMutationResponse?: {
        isError?: LoaderResolver<Scalars['Boolean'], EventQuestionMutationResponse, {}, TContext>;
        message?: LoaderResolver<Scalars['String'], EventQuestionMutationResponse, {}, TContext>;
        body?: LoaderResolver<Maybe<EventQuestionEdge>, EventQuestionMutationResponse, {}, TContext>;
    };

    EventQuestionEdgeContainer?: {
        edge?: LoaderResolver<EventQuestionEdge, EventQuestionEdgeContainer, {}, TContext>;
    };

    EventSpeaker?: {
        id?: LoaderResolver<Scalars['ID'], EventSpeaker, {}, TContext>;
        email?: LoaderResolver<Maybe<Scalars['String']>, EventSpeaker, {}, TContext>;
        eventId?: LoaderResolver<Maybe<Scalars['ID']>, EventSpeaker, {}, TContext>;
        user?: LoaderResolver<Maybe<User>, EventSpeaker, {}, TContext>;
        name?: LoaderResolver<Maybe<Scalars['String']>, EventSpeaker, {}, TContext>;
        description?: LoaderResolver<Maybe<Scalars['String']>, EventSpeaker, {}, TContext>;
        title?: LoaderResolver<Maybe<Scalars['String']>, EventSpeaker, {}, TContext>;
        pictureUrl?: LoaderResolver<Maybe<Scalars['String']>, EventSpeaker, {}, TContext>;
    };

    EventSpeakerEdge?: {
        node?: LoaderResolver<EventSpeaker, EventSpeakerEdge, {}, TContext>;
        cursor?: LoaderResolver<Scalars['String'], EventSpeakerEdge, {}, TContext>;
    };

    EventSpeakerConnection?: {
        edges?: LoaderResolver<Maybe<Array<EventSpeakerEdge>>, EventSpeakerConnection, {}, TContext>;
        pageInfo?: LoaderResolver<PageInfo, EventSpeakerConnection, {}, TContext>;
    };

    EventSpeakerMutationResponse?: {
        isError?: LoaderResolver<Scalars['Boolean'], EventSpeakerMutationResponse, {}, TContext>;
        message?: LoaderResolver<Scalars['String'], EventSpeakerMutationResponse, {}, TContext>;
        body?: LoaderResolver<Maybe<EventSpeaker>, EventSpeakerMutationResponse, {}, TContext>;
    };

    EventVideo?: {
        id?: LoaderResolver<Scalars['ID'], EventVideo, {}, TContext>;
        url?: LoaderResolver<Scalars['String'], EventVideo, {}, TContext>;
        lang?: LoaderResolver<Scalars['String'], EventVideo, {}, TContext>;
        event?: LoaderResolver<Maybe<Event>, EventVideo, {}, TContext>;
    };

    EventVideoEdge?: {
        node?: LoaderResolver<EventVideo, EventVideoEdge, {}, TContext>;
        cursor?: LoaderResolver<Scalars['String'], EventVideoEdge, {}, TContext>;
    };

    EventVideoConnection?: {
        edges?: LoaderResolver<Maybe<Array<EventVideoEdge>>, EventVideoConnection, {}, TContext>;
        pageInfo?: LoaderResolver<PageInfo, EventVideoConnection, {}, TContext>;
    };

    EventVideoMutationResponse?: {
        isError?: LoaderResolver<Scalars['Boolean'], EventVideoMutationResponse, {}, TContext>;
        message?: LoaderResolver<Scalars['String'], EventVideoMutationResponse, {}, TContext>;
        body?: LoaderResolver<Maybe<EventVideo>, EventVideoMutationResponse, {}, TContext>;
    };
}
declare module 'mercurius' {
    interface IResolvers extends Resolvers<import('mercurius').MercuriusContext> {}
    interface MercuriusLoaders extends Loaders {}
}
