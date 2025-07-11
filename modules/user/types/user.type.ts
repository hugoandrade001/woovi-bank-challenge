import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
} from 'graphql';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },

    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: async (user) => {
        const sent = await prisma.transaction.aggregate({
          _sum: { amount: true },
          where: { senderId: user.id },
        });

        const received = await prisma.transaction.aggregate({
          _sum: { amount: true },
          where: { receiverId: user.id },
        });

        return (received._sum.amount ?? 0) - (sent._sum.amount ?? 0);
      },
    },
  }),
});
