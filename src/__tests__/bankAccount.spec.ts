// __tests__/bankAccount.spec.ts
import assert from "node:assert/strict";
import { faker } from "@faker-js/faker";
import { createBankAccount, createUser, testServer } from "./common";
import {
  CREATE_BANK_ACCOUNT,
  DELETE_BANK_ACCOUNT,
  LIST_BANK_ACCOUNTS,
} from "./common/bankAccount";
import { logger, prisma, uid } from "../utils";
import type { BankAccount } from "../graphql";

const userId = uid.rnd();

beforeAll(async () => {
  jest.restoreAllMocks();
  await prisma.bankAccount.deleteMany();
  await prisma.user.deleteMany();
  await createUser({ id: userId });
});

beforeEach(async () => {
  await prisma.bankAccount.deleteMany();
});

afterAll(async () => {
  await prisma.bankAccount.deleteMany();
  await prisma.user.deleteMany();
});

describe("listBankAccounts", () => {
  test("bank accounts found", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const id = uid.rnd();

    await createBankAccount({ id, userId });

    const response = await testServer.executeOperation({
      query: LIST_BANK_ACCOUNTS,
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data !== null && data !== undefined);
    expect(errors).toBeUndefined();

    const result = data.listBankAccounts as BankAccount[];

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(id);
  });
});

describe("createBankAccount", () => {
  test("bank account created", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const response = await testServer.executeOperation({
      query: CREATE_BANK_ACCOUNT,
      variables: {
        payload: {
          userId,
          bankName: faker.company.name(),
          accountNumber: faker.finance.accountNumber(),
          routingNumber: faker.finance.routingNumber(),
        },
      },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data !== null && data !== undefined);
    expect(errors).toBeUndefined();

    const result = data.createBankAccount as BankAccount;

    expect(result.userId).toBe(userId);

    // Assert database
    const bankAccounts = await prisma.bankAccount.findMany();

    expect(bankAccounts).toHaveLength(1);
    expect(bankAccounts[0].userId).toBe(userId);
  });
});

describe("deleteBankAccount", () => {
  test("bank account deleted", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const id = uid.rnd();

    await createBankAccount({ id, userId });

    const response = await testServer.executeOperation({
      query: DELETE_BANK_ACCOUNT,
      variables: {
        payload: { id },
      },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data !== null && data !== undefined);
    expect(errors).toBeUndefined();

    const result = data.deleteBankAccount as BankAccount;

    expect(result.userId).toBe(userId);

    // Assert database
    const bankAccounts = await prisma.notification.findMany();

    expect(bankAccounts).toHaveLength(0);
  });
});
