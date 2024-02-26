// mocks/notification.ts
import { faker } from "@faker-js/faker";
import { getTimestamps } from "./utils";
import { logger, uid } from "../utils";
import type {
  MutationResolvers,
  Notification,
  QueryResolvers,
} from "../graphql";
import type { NullablePartial } from "../utils/types";

export const notificationMessageGenerators = [
  () => JSON.stringify({ type: "comment", commentId: uid.rnd() }),
  () => JSON.stringify({ type: "like", likeId: uid.rnd() }),
  () =>
    JSON.stringify({
      type: "payment",
      status: faker.helpers.arrayElement(["requested", "received"]),
    }),
];

export const mockNotification = (input?: NullablePartial<Notification>) => {
  const { createdAt, modifiedAt } = getTimestamps();
  const notification: Notification = {
    id: input?.id ?? uid.rnd(),
    uuid: input?.uuid ?? uid.randomUUID(),
    userId: input?.userId ?? uid.rnd(),
    transactionId: input?.transactionId ?? uid.rnd(),
    message:
      input?.message ??
      faker.helpers.arrayElement(notificationMessageGenerators)(),
    isRead: input?.isRead ?? Math.random() > 0.5,
    createdAt: input?.createdAt ?? createdAt,
    modifiedAt: input?.modifiedAt ?? modifiedAt,
  };
  return notification;
};

export const getUnreadNotifications: QueryResolvers["getUnreadNotifications"] =
  async (_parent, { userId }, _context, { fieldName, parentType }) => {
    logger.info(`Mock ${parentType}.${fieldName}`);
    const length = faker.number.int({ min: 3, max: 10 });
    return [...new Array(length)]
      .map(() => mockNotification({ userId, isRead: false }))
      .sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime());
  };

export const createNotification: MutationResolvers["createNotification"] =
  async (_parent, { payload }, _context, { fieldName, parentType }) => {
    logger.info(`Mock ${parentType}.${fieldName}`);
    return mockNotification({
      ...payload,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });
  };

export const updateNotification: MutationResolvers["updateNotification"] =
  async (_parent, { payload }, _context, { fieldName, parentType }) => {
    logger.info(`Mock ${parentType}.${fieldName}`);
    return mockNotification({ ...payload, modifiedAt: new Date() });
  };
