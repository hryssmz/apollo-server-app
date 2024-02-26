// resolvers/notification.ts
import { logger, prisma, uid } from "../utils";
import type {
  MutationResolvers,
  QueryResolvers,
  UpdateNotification,
} from "../graphql";

export const getUnreadNotifications: QueryResolvers["getUnreadNotifications"] =
  async (_parent, { userId }, _context, { fieldName, parentType }) => {
    logger.info(`${parentType}.${fieldName}`);
    const notifications = await prisma.notification.findMany({
      where: { userId, isRead: false },
      orderBy: { modifiedAt: "desc" },
    });
    return notifications.map(notification => ({
      id: notification.id,
      uuid: notification.uuid,
      userId: notification.userId,
      transactionId: notification.transactionId,
      message: notification.message,
      isRead: notification.isRead,
      createdAt: notification.createdAt,
      modifiedAt: notification.modifiedAt,
    }));
  };

export const createNotification: MutationResolvers["createNotification"] =
  async (_parent, { payload }, _context, { fieldName, parentType }) => {
    logger.info(`${parentType}.${fieldName}`);
    const notification = await prisma.notification.create({
      data: {
        id: uid.rnd(),
        userId: payload.userId,
        transactionId: payload.transactionId,
        message: payload.message,
      },
    });
    return {
      id: notification.id,
      uuid: notification.uuid,
      userId: notification.userId,
      transactionId: notification.transactionId,
      message: notification.message,
      isRead: notification.isRead,
      createdAt: notification.createdAt,
      modifiedAt: notification.modifiedAt,
    };
  };

export const updateNotification: MutationResolvers["updateNotification"] =
  async (_parent, { payload }, _context, { fieldName, parentType }) => {
    logger.info(`${parentType}.${fieldName}`);
    const updateKeys: Array<keyof UpdateNotification> = ["isRead", "message"];
    const notification = await prisma.notification.update({
      where: { id: payload.id },
      data: updateKeys.reduce((acc, key) => {
        const value = payload[key];
        return value === null || value === undefined
          ? acc
          : { ...acc, [key]: value };
      }, {}),
    });
    return {
      id: notification.id,
      uuid: notification.uuid,
      userId: notification.userId,
      transactionId: notification.transactionId,
      message: notification.message,
      isRead: notification.isRead,
      createdAt: notification.createdAt,
      modifiedAt: notification.modifiedAt,
    };
  };
