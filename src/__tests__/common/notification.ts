// __tests__/utils/notification.ts
import { faker } from "@faker-js/faker";
import { prisma, uid } from "./utils";
import { notificationMessageGenerators } from "../../mocks/notification";
import type { Prisma } from "@prisma/client";

export const createNotification = async (
  input: Partial<Prisma.NotificationUncheckedCreateInput> &
    Pick<Prisma.NotificationUncheckedCreateInput, "userId" | "transactionId">
) => {
  const notification = await prisma.notification.create({
    data: {
      ...input,
      id: input.id ?? uid.rnd(),
      message:
        input.message ??
        faker.helpers.arrayElement(notificationMessageGenerators)(),
    },
  });
  return notification;
};

export const GET_UNREAD_NOTIFICATIONS = `#graphql
  query GetUnreadNotifications($userId: ID!) {
    getUnreadNotifications(userId: $userId) {
      id
      uuid
      userId
      transactionId
      message
      isRead
      createdAt
      modifiedAt
    }
  }
`;

export const CREATE_NOTIFICATION = `#graphql
  mutation CreateNotification($payload: CreateNotification!) {
    createNotification(payload: $payload) {
      id
      uuid
      userId
      transactionId
      message
      isRead
      createdAt
      modifiedAt
    }
  }
`;

export const UPDATE_NOTIFICATION = `#graphql
  mutation UpdateNotification($payload: UpdateNotification!) {
    updateNotification(payload: $payload) {
      id
      uuid
      userId
      transactionId
      message
      isRead
      createdAt
      modifiedAt
    }
  }
`;
