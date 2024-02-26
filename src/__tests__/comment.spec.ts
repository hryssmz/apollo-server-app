// __tests__/comment.spec.ts
import assert from "node:assert/strict";
import { faker } from "@faker-js/faker";
import { createUser, createTransaction, testServer } from "./common";
import { CREATE_COMMENT } from "./common/comment";
import { logger, prisma, uid } from "../utils";
import type { Comment } from "../graphql";

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
  await prisma.comment.deleteMany();
});

afterAll(async () => {
  await prisma.comment.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.user.deleteMany();
});

describe("createComment", () => {
  test("comment created", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const response = await testServer.executeOperation({
      query: CREATE_COMMENT,
      variables: {
        payload: {
          content: faker.lorem.sentence({ min: 5, max: 20 }),
          userId,
          transactionId,
        },
      },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data !== null && data !== undefined);
    expect(errors).toBeUndefined();

    const result = data.createComment as Comment;

    expect(result.userId).toBe(userId);

    // Assert database
    const comments = await prisma.comment.findMany();

    expect(comments).toHaveLength(1);
    expect(comments[0].userId).toBe(userId);
  });
});
