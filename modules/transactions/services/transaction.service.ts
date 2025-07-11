import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createTransaction = async (
  senderId: string,
  receiverId: string,
  amount: number,
) => {
  const sender = await prisma.user.findUnique({ where: { id: senderId } });
  const receiver = await prisma.user.findUnique({ where: { id: receiverId } });

  if (!sender || !receiver) {
    throw new Error('Sender or Receiver not found');
  }

  const sent = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { senderId },
  });

  const received = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { receiverId: senderId },
  });

  const balance = (received._sum.amount ?? 0) - (sent._sum.amount ?? 0);

  if (balance < amount) {
    throw new Error('Insufficient balance');
  }

  const transaction = await prisma.transaction.create({
    data: {
      senderId,
      receiverId,
      amount,
    },
    include: {
      sender: true,
      receiver: true,
    },
  });

  return transaction;
};
