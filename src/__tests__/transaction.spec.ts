// __tests__/transaction.spec.ts
import assert from "node:assert/strict";
import { faker } from "@faker-js/faker";
import {
  createContact,
  createUser,
  createTransaction,
  testServer,
} from "./common";
import {
  CREATE_TRANSACTION,
  GET_CONTACTS_TRANSACTIONS,
  GET_TRANSACTION_DETAIL,
  UPDATE_TRANSACTION,
} from "./common/transaction";
import { logger, prisma, uid } from "../utils";
import {
  defaultPrivacyLevelChoices,
  transactionRequestStatusChoices,
  transactionStatusChoices,
} from "../utils/enums";
import type {
  Transaction,
  TransactionDetail,
  TransactionDetailPage,
} from "../graphql";

const userIds = [...new Array(5)].map(() => uid.rnd());
const userId = userIds[0];
const contactUserId1 = userIds[1];
const contactUserId2 = userIds[2];
const nonContactUserId1 = userIds[3];
const nonContactUserId2 = userIds[4];

beforeAll(async () => {
  jest.restoreAllMocks();
  await prisma.transaction.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.user.deleteMany();
  await Promise.all(userIds.map(userId => createUser({ id: userId })));
  await Promise.all(
    [contactUserId1, contactUserId2].map(contactUserId =>
      createContact({ userId, contactUserId })
    )
  );
});

beforeEach(async () => {
  await prisma.transaction.deleteMany();
});

afterAll(async () => {
  await prisma.transaction.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.user.deleteMany();
});

describe("getContactsTransactions", () => {
  test("page = 2, limit = 2", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    await createTransaction({
      senderId: nonContactUserId1,
      receiverId: nonContactUserId2,
    });
    await createTransaction({
      senderId: contactUserId1,
      receiverId: nonContactUserId2,
    });
    await createTransaction({
      senderId: nonContactUserId2,
      receiverId: contactUserId1,
    });
    await createTransaction({
      senderId: contactUserId1,
      receiverId: contactUserId2,
    });
    await createTransaction({
      senderId: nonContactUserId2,
      receiverId: nonContactUserId1,
    });
    await createTransaction({
      senderId: contactUserId2,
      receiverId: contactUserId1,
    });
    await createTransaction({
      senderId: nonContactUserId1,
      receiverId: contactUserId2,
    });
    await createTransaction({
      senderId: contactUserId2,
      receiverId: nonContactUserId1,
    });

    const response = await testServer.executeOperation({
      query: GET_CONTACTS_TRANSACTIONS,
      variables: { userId, page: 2, limit: 2 },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data !== null && data !== undefined);
    expect(errors).toBeUndefined();

    const { results, pageData } =
      data.getContactsTransactions as TransactionDetailPage;

    expect(pageData.count).toBe(6);
    expect(results).toHaveLength(2);
    expect(results[0].transaction.senderId).toBe(contactUserId2);
    expect(results[0].transaction.receiverId).toBe(contactUserId1);
    expect(results[1].transaction.senderId).toBe(contactUserId1);
    expect(results[1].transaction.receiverId).toBe(contactUserId2);
  });
});

describe("getTransactionDetail", () => {
  test("transaction detail found", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const id = uid.rnd();

    await createTransaction({ id, senderId: userId, receiverId: userId });

    const response = await testServer.executeOperation({
      query: GET_TRANSACTION_DETAIL,
      variables: { id },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data !== null && data !== undefined);
    expect(errors).toBeUndefined();

    const result = data.getTransactionDetail as TransactionDetail;

    expect(result.transaction.id).toBe(id);
  });

  test("transaction detail not found", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const response = await testServer.executeOperation({
      query: GET_TRANSACTION_DETAIL,
      variables: { id: uid.rnd() },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data === null);
    expect(errors).toHaveLength(1);
  });
});

describe("createTransaction", () => {
  test("transaction created", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());

    const response = await testServer.executeOperation({
      query: CREATE_TRANSACTION,
      variables: {
        payload: {
          source: uid.rnd(),
          amount: faker.number.int({ min: 0, max: 10000 }),
          description: faker.lorem.sentence({ min: 5, max: 20 }),
          privacyLevel: faker.helpers.arrayElement(defaultPrivacyLevelChoices),
          senderId: userIds[0],
          receiverId: userIds[1],
          balanceAtCompletion: faker.number.int({ min: 0, max: 10000 }),
          status: faker.helpers.arrayElement(transactionStatusChoices),
          requestStatus: faker.helpers.arrayElement(
            transactionRequestStatusChoices
          ),
        },
      },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data !== null && data !== undefined);
    expect(errors).toBeUndefined();

    const result = data.createTransaction as Transaction;

    expect(result.senderId).toBe(userIds[0]);
    expect(result.receiverId).toBe(userIds[1]);

    // Assert database
    const transactions = await prisma.transaction.findMany();

    expect(transactions).toHaveLength(1);
    expect(transactions[0].senderId).toBe(userIds[0]);
    expect(transactions[0].receiverId).toBe(userIds[1]);
  });

  test("bad create enum", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());

    const response = await testServer.executeOperation({
      query: CREATE_TRANSACTION,
      variables: {
        payload: {
          source: uid.rnd(),
          amount: faker.number.int({ min: 0, max: 10000 }),
          description: faker.lorem.sentence({ min: 5, max: 20 }),
          privacyLevel: uid.rnd(),
          senderId: userIds[0],
          receiverId: userIds[1],
          balanceAtCompletion: faker.number.int({ min: 0, max: 10000 }),
          status: uid.rnd(),
          requestStatus: uid.rnd(),
        },
      },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data === null);
    expect(errors).toHaveLength(1);
  });
});

describe("updateTransaction", () => {
  test("transaction updated", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const id = uid.rnd();
    const original = {
      id,
      senderId: userId,
      receiverId: userId,
    };
    await createTransaction({ ...original });

    const updates = {
      id,
      senderId: contactUserId1,
    };
    const response = await testServer.executeOperation({
      query: UPDATE_TRANSACTION,
      variables: { payload: updates },
    });

    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data !== null && data !== undefined);
    expect(errors).toBeUndefined();

    const result = data.updateTransaction as Transaction;

    expect(result.receiverId).toBe(original.receiverId);
    expect(result.senderId).toBe(updates.senderId);

    // Assert database
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    assert(transaction !== null);
    expect(transaction.receiverId).toBe(original.receiverId);
    expect(transaction.senderId).toBe(updates.senderId);
  });

  test("update transaction not found", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const updates = {
      id: uid.rnd(),
      senderId: contactUserId1,
    };
    const response = await testServer.executeOperation({
      query: UPDATE_TRANSACTION,
      variables: { payload: updates },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data === null);
    expect(errors).toHaveLength(1);
  });

  test("bad update enum", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const id = uid.rnd();
    const original = {
      id,
      senderId: userId,
      receiverId: userId,
    };
    await createTransaction({ ...original });

    const updates = {
      id,
      privacyLevel: uid.rnd(),
      status: uid.rnd(),
      requestStatus: uid.rnd(),
    };
    const response = await testServer.executeOperation({
      query: UPDATE_TRANSACTION,
      variables: { payload: updates },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data === null);
    expect(errors).toHaveLength(1);
  });
});
