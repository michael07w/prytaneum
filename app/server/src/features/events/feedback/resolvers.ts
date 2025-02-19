import { fromGlobalId } from 'graphql-relay';
import * as Feedback from './methods';
import { Resolvers, withFilter, errors, toGlobalId, runMutation } from '@local/features/utils';
import { ProtectedError } from '@local/lib/ProtectedError';
import type { FeedbackOperation } from '@local/graphql-types';

const toFeedbackId = toGlobalId('EventLiveFeedback');
const toUserId = toGlobalId('User');

export const resolvers: Resolvers = {
    Query: {
        async myFeedback(parent, args, ctx) {
            if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
            if (!args.eventId) throw new ProtectedError({ userMessage: errors.invalidArgs });
            const { id: eventId } = fromGlobalId(args.eventId);
            const feedback = Feedback.myFeedback(ctx.viewer.id, eventId, ctx.prisma);
            return feedback;
        },
    },
    Mutation: {
        async createFeedback(parent, args, ctx) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                if (!args.input) throw new ProtectedError({ userMessage: errors.invalidArgs });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const feedback = await Feedback.createFeedback(ctx.viewer.id, eventId, ctx.prisma, args.input);
                const formattedFeedback = toFeedbackId(feedback);
                if (formattedFeedback.refFeedback)
                    formattedFeedback.refFeedback = toFeedbackId(formattedFeedback.refFeedback);
                const edge = {
                    node: formattedFeedback,
                    cursor: feedback.createdAt.getTime().toString(),
                };
                ctx.pubsub.publish({
                    topic: 'feedbackCRUD',
                    payload: {
                        feedbackCRUD: { operationType: 'CREATE', edge },
                    },
                });
                return edge;
            });
        },
    },
    Subscription: {
        feedbackCRUD: {
            subscribe: withFilter<{ feedbackCRUD: FeedbackOperation }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('feedbackCRUD'),
                (payload, args, ctx) => {
                    const { id: feedbackId } = fromGlobalId(payload.feedbackCRUD.edge.node.id);
                    const { id: eventId } = fromGlobalId(args.eventId);
                    // TODO only update moderators & feedback creator as other participants cant see other's feedback
                    return Feedback.doesEventMatch(eventId, feedbackId, ctx.prisma);
                }
            ),
        },
    },
    EventLiveFeedback: {
        async createdBy(parent, args, ctx) {
            const { id: feedbackId } = fromGlobalId(parent.id);
            const submitter = await Feedback.findSubmitterByFeedbackId(feedbackId, ctx.prisma);
            return toUserId(submitter);
        },
        async refFeedback(parent, args, ctx) {
            const { id: feedbackId } = fromGlobalId(parent.id);
            const feedback = await Feedback.findRefFeedback(feedbackId, ctx.prisma);
            return toFeedbackId(feedback);
        },
    },
};
