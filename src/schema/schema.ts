import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
} from 'graphql';

import { QueryType } from './QueryType';
import { SubscriptionType } from './SubscriptionType';

import { createUser } from '../../modules/user/services/user.service';
import { UserType } from '../../modules/user/types/user.type';

import { createTransaction } from '../../modules/transactions/services/transaction.service';
import { TransactionType } from '../../modules/transactions/types/transaction.type';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) => createUser(args.name, args.email),
    },

    sendTransaction: {
      type: TransactionType,
      args: {
        senderId: { type: new GraphQLNonNull(GraphQLID) },
        receiverId: { type: new GraphQLNonNull(GraphQLID) },
        amount: { type: new GraphQLNonNull(GraphQLFloat) },
      },
      resolve: async (_, args) =>
        createTransaction(args.senderId, args.receiverId, args.amount),
    },
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
  subscription: SubscriptionType,
});
