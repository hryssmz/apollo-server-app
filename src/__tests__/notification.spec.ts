// __tests__/notification.spec.ts
import assert from "node:assert/strict";
import { faker } from "@faker-js/faker";
import {
  createNotification,
  createTransaction,
  createUser,
  testServer,
} from "./common";
import {
  CREATE_NOTIFICATION,
  GET_UNREAD_NOTIFICATIONS,
  UPDATE_NOTIFICATION,
} from "./common/notification";
import { notificationMessageGenerators } from "../mocks/notification";
import { logger, prisma, uid } from "../utils";
import type { Notification } from "../graphql";

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
  await prisma.notification.deleteMany();
});

afterAll(async () => {
  await prisma.notification.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.user.deleteMany();
});

describe("getUnreadNotifications", () => {
  test("unread notifications found", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const id = uid.rnd();

    await createNotification({ id, userId, transactionId });

    const response = await testServer.executeOperation({
      query: GET_UNREAD_NOTIFICATIONS,
      variables: { userId },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data !== null && data !== undefined);
    expect(errors).toBeUndefined();

    const result = data.getUnreadNotifications as Notification[];

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(id);
  });

  test("unread notifications not found", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    await createNotification({ userId, transactionId, isRead: true });

    const response = await testServer.executeOperation({
      query: GET_UNREAD_NOTIFICATIONS,
      variables: { userId },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data !== null && data !== undefined);
    expect(errors).toBeUndefined();

    const result = data.getUnreadNotifications as Notification[];

    expect(result).toHaveLength(0);
  });
});

describe("createNotification", () => {
  test("notification created", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const response = await testServer.executeOperation({
      query: CREATE_NOTIFICATION,
      variables: {
        payload: {
          userId,
          transactionId,
          message: faker.helpers.arrayElement(notificationMessageGenerators)(),
        },
      },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data !== null && data !== undefined);
    expect(errors).toBeUndefined();

    const result = data.createNotification as Notification;

    expect(result.userId).toBe(userId);

    // Assert database
    const notifications = await prisma.notification.findMany();

    expect(notifications).toHaveLength(1);
    expect(notifications[0].userId).toBe(userId);
  });
});

describe("updateNotification", () => {
  test("notification updated", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const id = uid.rnd();
    const original = {
      id,
      userId,
      transactionId,
      message: faker.helpers.arrayElement(notificationMessageGenerators)(),
    };
    await createNotification({ ...original });

    const updates = {
      id,
      userId,
      isRead: true,
    };
    const response = await testServer.executeOperation({
      query: UPDATE_NOTIFICATION,
      variables: {
        payload: updates,
      },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data !== null && data !== undefined);
    expect(errors).toBeUndefined();

    const result = data.updateNotification as Notification;

    expect(result.isRead).toBe(updates.isRead);
    expect(result.message).toBe(original.message);

    // Assert database
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    assert(notification !== null);
    expect(notification.isRead).toBe(updates.isRead);
    expect(notification.message).toBe(original.message);
  });

  test("update notification not found", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const updates = {
      id: uid.rnd(),
      userId,
      isRead: true,
      message: "updated message",
    };
    const response = await testServer.executeOperation({
      query: UPDATE_NOTIFICATION,
      variables: {
        payload: updates,
      },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data === null);
    expect(errors).toHaveLength(1);
  });
});
