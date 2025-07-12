import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
  } from 'graphql-relay';
  
  import { TransactionType } from '../types/transaction.type';
  import { PrismaClient } from '@prisma/client';
  const prisma = new PrismaClient();
    
  const { connectionType: TransactionConnection } = connectionDefinitions({
    name: 'Transaction',
    nodeType: TransactionType,
  });
  
  export const transactionConnectionField = {
    type: TransactionConnection,
    args: connectionArgs,
    resolve: async (_parent, args) => {
      const allTransactions = await prisma.transaction.findMany({
        include: {
          sender: true,
          receiver: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
  
      return connectionFromArray(allTransactions, args);
    },
  };
  