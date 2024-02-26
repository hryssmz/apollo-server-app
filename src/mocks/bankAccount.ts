// mocks/bankAccount.ts
import { faker } from "@faker-js/faker";
import { getTimestamps } from "./utils";
import { logger, uid } from "../utils";
import type {
  BankAccount,
  MutationResolvers,
  QueryResolvers,
} from "../graphql";
import type { NullablePartial } from "../utils/types";

export const mockBankAccount = (input?: NullablePartial<BankAccount>) => {
  const { createdAt, modifiedAt } = getTimestamps();
  const bankAccount: BankAccount = {
    id: input?.id ?? uid.rnd(),
    uuid: input?.uuid ?? uid.randomUUID(),
    userId: input?.userId ?? uid.rnd(),
    bankName: input?.bankName ?? faker.company.name(),
    accountNumber: input?.accountNumber ?? faker.finance.accountNumber(),
    routingNumber: input?.routingNumber ?? faker.finance.routingNumber(),
    isDeleted: input?.isDeleted ?? false,
    createdAt: input?.createdAt ?? createdAt,
    modifiedAt: input?.modifiedAt ?? modifiedAt,
  };
  return bankAccount;
};

export const listBankAccounts: QueryResolvers["listBankAccounts"] = async (
  _parent,
  {},
  _context,
  { fieldName, parentType }
) => {
  logger.info(`Mock ${parentType}.${fieldName}`);
  const length = faker.number.int({ min: 3, max: 10 });
  return [...new Array(length)].map(() => mockBankAccount());
};

export const createBankAccount: MutationResolvers["createBankAccount"] = async (
  _parent,
  { payload },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`Mock ${parentType}.${fieldName}`);
  return mockBankAccount({
    ...payload,
    createdAt: new Date(),
    modifiedAt: new Date(),
  });
};

export const deleteBankAccount: MutationResolvers["deleteBankAccount"] = async (
  _parent,
  { payload },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`Mock ${parentType}.${fieldName}`);
  return mockBankAccount({
    ...payload,
    isDeleted: true,
    modifiedAt: new Date(),
  });
};
