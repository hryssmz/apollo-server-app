// resolvers/bankAccount.ts
import { logger, prisma, uid } from "../utils";
import type { MutationResolvers, QueryResolvers } from "../graphql";

export const listBankAccounts: QueryResolvers["listBankAccounts"] = async (
  _parent,
  {},
  _context,
  { fieldName, parentType }
) => {
  logger.info(`${parentType}.${fieldName}`);
  const bankAccounts = await prisma.bankAccount.findMany();
  return bankAccounts.map(bankAccount => ({
    id: bankAccount.id,
    uuid: bankAccount.uuid,
    userId: bankAccount.userId,
    bankName: bankAccount.bankName,
    accountNumber: bankAccount.accountNumber,
    routingNumber: bankAccount.routingNumber,
    isDeleted: bankAccount.isDeleted,
    createdAt: bankAccount.createdAt,
    modifiedAt: bankAccount.modifiedAt,
  }));
};

export const createBankAccount: MutationResolvers["createBankAccount"] = async (
  _parent,
  { payload },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`${parentType}.${fieldName}`);
  const bankAccount = await prisma.bankAccount.create({
    data: {
      id: uid.rnd(),
      userId: payload.userId,
      bankName: payload.bankName,
      accountNumber: payload.accountNumber,
      routingNumber: payload.routingNumber,
    },
  });
  return {
    id: bankAccount.id,
    uuid: bankAccount.uuid,
    userId: bankAccount.userId,
    bankName: bankAccount.bankName,
    accountNumber: bankAccount.accountNumber,
    routingNumber: bankAccount.routingNumber,
    isDeleted: bankAccount.isDeleted,
    createdAt: bankAccount.createdAt,
    modifiedAt: bankAccount.modifiedAt,
  };
};

export const deleteBankAccount: MutationResolvers["deleteBankAccount"] = async (
  _parent,
  { payload },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`${parentType}.${fieldName}`);
  const bankAccount = await prisma.bankAccount.update({
    where: { id: payload.id },
    data: { isDeleted: true },
  });
  return {
    id: bankAccount.id,
    uuid: bankAccount.uuid,
    userId: bankAccount.userId,
    bankName: bankAccount.bankName,
    accountNumber: bankAccount.accountNumber,
    routingNumber: bankAccount.routingNumber,
    isDeleted: bankAccount.isDeleted,
    createdAt: bankAccount.createdAt,
    modifiedAt: bankAccount.modifiedAt,
  };
};
