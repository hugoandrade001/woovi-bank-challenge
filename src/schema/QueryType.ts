import {
	GraphQLObjectType,
	GraphQLList,
	GraphQLID
  } from 'graphql';
  
  import { PrismaClient } from '@prisma/client';
  import { messageConnectionField } from '../modules/message/messageFields';
  import { TransactionType } from '../../modules/transactions/types/transaction.type';
  import { transactionConnectionField } from '../../modules/transactions/fields/transactionConnectionField'; 
  
  const prisma = new PrismaClient();
  
  export const QueryType = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
	  ...messageConnectionField('messages'),
  
	  transactions: transactionConnectionField,
  
	  transactionHistory: {
		type: new GraphQLList(TransactionType),
		args: {
		  userId: { type: GraphQLID },
		},
		resolve: async (_parent, args) => {
		  return prisma.transaction.findMany({
			where: {
			  OR: [
				{ senderId: args.userId },
				{ receiverId: args.userId },
			  ],
			},
			orderBy: { createdAt: 'desc' },
			include: {
			  sender: true,
			  receiver: true,
			},
		  });
		},
	  },
	}),
  });
  