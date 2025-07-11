import {
    GraphQLFloat,
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
  } from 'graphql';
  import { UserType } from '../../user/types/user.type';
  
  export const TransactionType = new GraphQLObjectType({
    name: 'Transaction',
    fields: () => ({
      id: { type: GraphQLID },
      amount: { type: GraphQLFloat },
      sender: { type: UserType },
      receiver: { type: UserType },
      createdAt: { type: GraphQLString },
    }),
  });
  