import { fromGlobalId } from 'graphql-relay';
import { Resolvers, errors, runMutation } from '@local/features/utils';
import * as Invites from './methods';

export const resolvers: Resolvers = {
    Query: {
        async validateInvite(parent, args, ctx, info) {
            
            return { valid: true };
        }
    },
    Mutation: {
        createInvite(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: eventId } = fromGlobalId(args.input.eventId);
                Invites.invite(ctx.viewer.id, ctx.prisma, { ...args.input, eventId });
            })
        }
    }
};