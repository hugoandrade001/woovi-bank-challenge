import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createTransaction = async (
  senderId: string,
  receiverId: string,
  amount: number
) => {
  // Executa tudo dentro de uma transação atômica do Prisma
  return await prisma.$transaction(async (tx) => {
    const sender = await tx.user.findUnique({ where: { id: senderId } });
    const receiver = await tx.user.findUnique({ where: { id: receiverId } });

    if (!sender || !receiver) {
      throw new Error('Sender or Receiver not found');
    }

    const senderBalance = sender.balance ?? 0;
    const receiverBalance = receiver.balance ?? 0;

    if (senderBalance < amount) {
      throw new Error('Insufficient balance');
    }

    // Cria a transação
    const transaction = await tx.transaction.create({
      data: {
        senderId,
        receiverId,
        amount,
      },
    });

    // Atualiza os balances
    await tx.user.update({
      where: { id: senderId },
      data: { balance: senderBalance - amount },
    });

    await tx.user.update({
      where: { id: receiverId },
      data: { balance: receiverBalance + amount },
    });

    // Retorna a transação com os dados atualizados dos usuários
    const fullTransaction = await tx.transaction.findUnique({
      where: { id: transaction.id },
      include: {
        sender: true,
        receiver: true,
      },
    });

    return fullTransaction;
  });
};
