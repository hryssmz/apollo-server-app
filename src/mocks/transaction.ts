// mocks/transaction.ts
import { faker } from "@faker-js/faker";
import { mockComment } from "./comment";
import { mockLike } from "./like";
import { mockUser } from "./user";
import { getTimestamps } from "./utils";
import {
  defaultPrivacyLevelChoices,
  transactionRequestStatusChoices,
  transactionStatusChoices,
} from "../utils/enums";
import { logger, uid } from "../utils";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../utils/env";
import type {
  MutationResolvers,
  QueryResolvers,
  Transaction,
} from "../graphql";
import type { NullablePartial } from "../utils/types";

export const mockTransaction = (input?: NullablePartial<Transaction>) => {
  const { createdAt, modifiedAt } = getTimestamps();
  const transaction: Transaction = {
    id: input?.id ?? uid.rnd(),
    uuid: input?.uuid ?? uid.randomUUID(),
    source: input?.source ?? uid.rnd(),
    amount: input?.amount ?? faker.number.int({ min: 1, max: 10000 }),
    description:
      input?.description ?? faker.lorem.sentence({ min: 5, max: 20 }),
    privacyLevel:
      input?.privacyLevel ??
      faker.helpers.arrayElement(defaultPrivacyLevelChoices),
    receiverId: input?.receiverId ?? uid.rnd(),
    senderId: input?.senderId ?? uid.rnd(),
    balanceAtCompletion:
      input?.balanceAtCompletion ?? faker.number.int({ min: 0, max: 10000 }),
    status:
      input?.status ?? faker.helpers.arrayElement(transactionStatusChoices),
    requestStatus:
      input?.status ??
      faker.helpers.arrayElement(transactionRequestStatusChoices),
    requestResolvedAt: input?.requestResolvedAt,
    createdAt: input?.createdAt ?? createdAt,
    modifiedAt: input?.modifiedAt ?? modifiedAt,
  };
  return transaction;
};

export const getContactsTransactions: QueryResolvers["getContactsTransactions"] =
  async (_parent, args, _context, { fieldName, parentType }) => {
    logger.info(`Mock ${parentType}.${fieldName}`);
    const limit = args.limit ?? DEFAULT_LIMIT;
    const page = args.page ?? DEFAULT_PAGE;
    const count = limit * 2 + faker.number.int({ min: 1, max: limit });
    const n = Math.max(0, Math.min(limit, count - (page - 1) * limit));
    return {
      results: [...new Array(n)].map(() => {
        const transactionId = uid.rnd();
        const senderId = uid.rnd();
        const receiverId = uid.rnd();
        return {
          transaction: mockTransaction({
            id: transactionId,
            senderId,
            receiverId,
          }),
          sender: mockUser({ id: senderId }),
          receiver: mockUser({ id: receiverId }),
          likes: [...new Array(faker.number.int({ min: 0, max: 5 }))].map(() =>
            mockLike({ transactionId })
          ),
          comments: [...new Array(faker.number.int({ min: 0, max: 5 }))].map(
            () => mockComment({ transactionId })
          ),
        };
      }),
      pageData: { limit, page, count },
    };
  };

export const getTransactionDetail: QueryResolvers["getTransactionDetail"] =
  async (_parent, { id }, _context, { fieldName, parentType }) => {
    logger.info(`Mock ${parentType}.${fieldName}`);
    const senderId = uid.rnd();
    const receiverId = uid.rnd();
    return {
      transaction: mockTransaction({ id }),
      sender: mockUser({ id: senderId }),
      receiver: mockUser({ id: receiverId }),
      likes: [...new Array(faker.number.int({ min: 0, max: 5 }))].map(() =>
        mockLike({ transactionId: id })
      ),
      comments: [...new Array(faker.number.int({ min: 0, max: 5 }))].map(() =>
        mockComment({ transactionId: id })
      ),
    };
  };

export const createTransaction: MutationResolvers["createTransaction"] = async (
  _parent,
  { payload },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`Mock ${parentType}.${fieldName}`);
  return mockTransaction({
    ...payload,
    createdAt: new Date(),
    modifiedAt: new Date(),
  });
};

export const updateTransaction: MutationResolvers["updateTransaction"] = async (
  _parent,
  { payload },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`Mock ${parentType}.${fieldName}`);
  return mockTransaction({ ...payload, modifiedAt: new Date() });
};
