// __tests__/like.spec.ts
import assert from "node:assert/strict";
import { createUser, createTransaction, testServer } from "./common";
import { CREATE_LIKE } from "./common/like";
import { logger, prisma, uid } from "../utils";
import type { Like } from "../graphql";

const userId = uid.rnd();
const transactionId = uid.rnd();

beforeAll(async () => {
  jest.restoreAllMocks();
  await prisma.notification.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.user.deleteMany();
  await createUser({ id: userId });
  await createTransaction({
    id: transactionId,
    senderId: userId,
    receiverId: userId,
  });
});

beforeEach(async () => {
  await prisma.like.deleteMany();
});

afterAll(async () => {
  await prisma.like.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.user.deleteMany();
});

describe("createLike", () => {
  test("like created", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const response = await testServer.executeOperation({
      query: CREATE_LIKE,
      variables: {
        payload: { userId, transactionId },
      },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data !== null && data !== undefined);
    expect(errors).toBeUndefined();

    const result = data.createLike as Like;

    expect(result.userId).toBe(userId);

    // Assert database
    const likes = await prisma.like.findMany();

    expect(likes).toHaveLength(1);
    expect(likes[0].userId).toBe(userId);
  });
});
