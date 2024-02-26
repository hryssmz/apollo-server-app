// __tests__/utils/bankAccount.ts
import { faker } from "@faker-js/faker";
import { prisma, uid } from "./utils";
import type { Prisma } from "@prisma/client";

export const createBankAccount = async (
  input: Partial<Prisma.BankAccountUncheckedCreateInput> &
    Pick<Prisma.BankAccountUncheckedCreateInput, "userId">
) => {
  const bankAccount = await prisma.bankAccount.create({
    data: {
      ...input,
      id: input.id ?? uid.rnd(),
      userId: input.userId,
      bankName: input.bankName ?? faker.company.name(),
      accountNumber: input.accountNumber ?? faker.finance.accountNumber(),
      routingNumber: input.routingNumber ?? faker.finance.routingNumber(),
    },
  });
  return bankAccount;
};

export const LIST_BANK_ACCOUNTS = `#graphql
  query ListBankAccounts {
    listBankAccounts {
      id
      uuid
      userId
      bankName
      accountNumber
      routingNumber
      isDeleted
      createdAt
      modifiedAt
    }
  }
`;

export const CREATE_BANK_ACCOUNT = `#graphql
  mutation CreateBankAccount($payload: CreateBankAccount!) {
    createBankAccount(payload: $payload) {
      id
      uuid
      userId
      bankName
      accountNumber
      routingNumber
      isDeleted
      createdAt
      modifiedAt
    }
  }
`;

export const DELETE_BANK_ACCOUNT = `#graphql
  mutation DeleteBankAccount($payload: DeleteBankAccount!) {
    deleteBankAccount(payload: $payload) {
      id
      uuid
      userId
      bankName
      accountNumber
      routingNumber
      isDeleted
      createdAt
      modifiedAt
    }
  }
`;
