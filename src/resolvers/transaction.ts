// resolvers/transaction.ts
import Joi from "joi";
import { logger, prisma, uid } from "../utils";
import {
  defaultPrivacyLevelChoices,
  transactionRequestStatusChoices,
  transactionStatusChoices,
} from "../utils/enums";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../utils/env";
import type {
  MutationResolvers,
  QueryResolvers,
  UpdateTransaction,
} from "../graphql";
import type { Prisma } from "@prisma/client";

export const transactionSchema = Joi.object({
  privacyLevel: Joi.string().valid(...defaultPrivacyLevelChoices),
  status: Joi.string().valid(...transactionStatusChoices),
  requestStatus: Joi.string().valid(...transactionRequestStatusChoices),
}).unknown();

export const getContactsTransactions: QueryResolvers["getContactsTransactions"] =
  async (_parent, args, _context, { fieldName, parentType }) => {
    logger.info(`${parentType}.${fieldName}`);
    const { userId, dateStart, dateEnd, amountMin, amountMax } = args;
    const limit = args.limit ?? DEFAULT_LIMIT;
    const page = args.page ?? DEFAULT_PAGE;
    const skip = (page - 1) * limit;
    const contactUserIds = await prisma.contact
      .findMany({ where: { userId }, select: { contactUserId: true } })
      .then(contacts => contacts.map(({ contactUserId }) => contactUserId));

    const where: Prisma.TransactionWhereInput = {
      OR: [
        { receiverId: { in: contactUserIds } },
        { senderId: { in: contactUserIds } },
      ],
      createdAt: {
        ...(dateStart !== null &&
          dateStart !== undefined && { gte: dateStart }),
        ...(dateEnd !== null && dateEnd !== undefined && { lte: dateEnd }),
      },
      amount: {
        ...(amountMin !== null &&
          amountMin !== undefined && { gte: amountMin }),
        ...(amountMax !== null &&
          amountMax !== undefined && { lte: amountMax }),
      },
    };
    const promises = [
      prisma.transaction.count({
        where,
      }),
      prisma.transaction
        .findMany({
          where,
          orderBy: { modifiedAt: "desc" },
          take: limit,
          skip,
          include: {
            sender: true,
            receiver: true,
            comments: true,
            likes: true,
          },
        })
        .then(transactions =>
          transactions.map(transaction => ({
            transaction: {
              id: transaction.id,
              uuid: transaction.uuid,
              source: transaction.source,
              amount: transaction.amount,
              description: transaction.description,
              privacyLevel: transaction.privacyLevel,
              receiverId: transaction.receiverId,
              senderId: transaction.senderId,
              balanceAtCompletion: transaction.balanceAtCompletion,
              status: transaction.status,
              requestStatus: transaction.requestStatus,
              requestResolvedAt: transaction.requestResolvedAt,
              createdAt: transaction.createdAt,
              modifiedAt: transaction.modifiedAt,
            },
            sender: {
              id: transaction.sender.id,
              uuid: transaction.sender.uuid,
              firstName: transaction.sender.firstName,
              lastName: transaction.sender.lastName,
              username: transaction.sender.username,
              email: transaction.sender.email,
              phoneNumber: transaction.sender.phoneNumber,
              balance: transaction.sender.balance,
              avatar: transaction.sender.avatar,
              defaultPrivacyLevel: transaction.sender.defaultPrivacyLevel,
              createdAt: transaction.sender.createdAt,
              modifiedAt: transaction.sender.modifiedAt,
            },
            receiver: {
              id: transaction.receiver.id,
              uuid: transaction.receiver.uuid,
              firstName: transaction.receiver.firstName,
              lastName: transaction.receiver.lastName,
              username: transaction.receiver.username,
              email: transaction.receiver.email,
              phoneNumber: transaction.receiver.phoneNumber,
              balance: transaction.receiver.balance,
              avatar: transaction.receiver.avatar,
              defaultPrivacyLevel: transaction.receiver.defaultPrivacyLevel,
              createdAt: transaction.receiver.createdAt,
              modifiedAt: transaction.receiver.modifiedAt,
            },
            likes: transaction.likes.map(like => ({
              id: like.id,
              uuid: like.uuid,
              userId: like.userId,
              transactionId: like.transactionId,
              createdAt: like.createdAt,
              modifiedAt: like.modifiedAt,
            })),
            comments: transaction.comments.map(comment => ({
              id: comment.id,
              uuid: comment.uuid,
              content: comment.content,
              userId: comment.userId,
              transactionId: comment.transactionId,
              createdAt: comment.createdAt,
              modifiedAt: comment.modifiedAt,
            })),
          }))
        ),
    ] as const;
    const [count, results] = await Promise.all(promises);
    return {
      results,
      pageData: { count, page, limit },
    };
  };

export const getTransactionDetail: QueryResolvers["getTransactionDetail"] =
  async (_parent, { id }, _context, { fieldName, parentType }) => {
    logger.info(`${parentType}.${fieldName}`);
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: {
        sender: true,
        receiver: true,
        comments: true,
        likes: true,
      },
    });
    if (transaction === null) {
      throw `Transaction not found: ${id}`;
    }
    return {
      transaction: {
        id: transaction.id,
        uuid: transaction.uuid,
        source: transaction.source,
        amount: transaction.amount,
        description: transaction.description,
        privacyLevel: transaction.privacyLevel,
        receiverId: transaction.receiverId,
        senderId: transaction.senderId,
        balanceAtCompletion: transaction.balanceAtCompletion,
        status: transaction.status,
        requestStatus: transaction.requestStatus,
        requestResolvedAt: transaction.requestResolvedAt,
        createdAt: transaction.createdAt,
        modifiedAt: transaction.modifiedAt,
      },
      sender: {
        id: transaction.sender.id,
        uuid: transaction.sender.uuid,
        firstName: transaction.sender.firstName,
        lastName: transaction.sender.lastName,
        username: transaction.sender.username,
        email: transaction.sender.email,
        phoneNumber: transaction.sender.phoneNumber,
        balance: transaction.sender.balance,
        avatar: transaction.sender.avatar,
        defaultPrivacyLevel: transaction.sender.defaultPrivacyLevel,
        createdAt: transaction.sender.createdAt,
        modifiedAt: transaction.sender.modifiedAt,
      },
      receiver: {
        id: transaction.receiver.id,
        uuid: transaction.receiver.uuid,
        firstName: transaction.receiver.firstName,
        lastName: transaction.receiver.lastName,
        username: transaction.receiver.username,
        email: transaction.receiver.email,
        phoneNumber: transaction.receiver.phoneNumber,
        balance: transaction.receiver.balance,
        avatar: transaction.receiver.avatar,
        defaultPrivacyLevel: transaction.receiver.defaultPrivacyLevel,
        createdAt: transaction.receiver.createdAt,
        modifiedAt: transaction.receiver.modifiedAt,
      },
      likes: transaction.likes.map(like => ({
        id: like.id,
        uuid: like.uuid,
        userId: like.userId,
        transactionId: like.transactionId,
        createdAt: like.createdAt,
        modifiedAt: like.modifiedAt,
      })),
      comments: transaction.comments.map(comment => ({
        id: comment.id,
        uuid: comment.uuid,
        content: comment.content,
        userId: comment.userId,
        transactionId: comment.transactionId,
        createdAt: comment.createdAt,
        modifiedAt: comment.modifiedAt,
      })),
    };
  };

export const createTransaction: MutationResolvers["createTransaction"] = async (
  _parent,
  { payload },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`${parentType}.${fieldName}`);
  const { error } = transactionSchema.validate(payload);
  if (error !== undefined) {
    throw error;
  }
  const transaction = await prisma.transaction.create({
    data: {
      id: uid.rnd(),
      source: payload.source,
      amount: payload.amount,
      description: payload.description,
      privacyLevel: payload.privacyLevel,
      receiverId: payload.receiverId,
      senderId: payload.senderId,
      balanceAtCompletion: payload.balanceAtCompletion,
      status: payload.status,
      requestStatus: payload.requestStatus,
    },
  });
  return {
    id: transaction.id,
    uuid: transaction.uuid,
    source: transaction.source,
    amount: transaction.amount,
    description: transaction.description,
    privacyLevel: transaction.privacyLevel,
    receiverId: transaction.receiverId,
    senderId: transaction.senderId,
    balanceAtCompletion: transaction.balanceAtCompletion,
    status: transaction.status,
    requestStatus: transaction.requestStatus,
    requestResolvedAt: transaction.requestResolvedAt,
    createdAt: transaction.createdAt,
    modifiedAt: transaction.modifiedAt,
  };
};

export const updateTransaction: MutationResolvers["updateTransaction"] = async (
  _parent,
  { payload },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`${parentType}.${fieldName}`);
  const { error } = transactionSchema.validate(payload);
  if (error !== undefined) {
    throw error;
  }
  const updateKeys: Array<keyof UpdateTransaction> = [
    "source",
    "amount",
    "description",
    "privacyLevel",
    "senderId",
    "receiverId",
    "balanceAtCompletion",
    "status",
    "requestStatus",
  ];
  const transaction = await prisma.transaction.update({
    where: { id: payload.id },
    data: updateKeys.reduce((acc, key) => {
      const value = payload[key];
      return value === null || value === undefined
        ? acc
        : { ...acc, [key]: value };
    }, {}),
  });
  return {
    id: transaction.id,
    uuid: transaction.uuid,
    source: transaction.source,
    amount: transaction.amount,
    description: transaction.description,
    privacyLevel: transaction.privacyLevel,
    receiverId: transaction.receiverId,
    senderId: transaction.senderId,
    balanceAtCompletion: transaction.balanceAtCompletion,
    status: transaction.status,
    requestStatus: transaction.requestStatus,
    requestResolvedAt: transaction.requestResolvedAt,
    createdAt: transaction.createdAt,
    modifiedAt: transaction.modifiedAt,
  };
};
