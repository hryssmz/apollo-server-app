// mocks/comment.ts
import { faker } from "@faker-js/faker";
import { getTimestamps } from "./utils";
import { logger, uid } from "../utils";
import type { Comment, MutationResolvers } from "../graphql";
import type { NullablePartial } from "../utils/types";

export const mockComment = (input?: NullablePartial<Comment>) => {
  const { createdAt, modifiedAt } = getTimestamps();
  const comment: Comment = {
    id: input?.id ?? uid.rnd(),
    uuid: input?.uuid ?? uid.randomUUID(),
    content: input?.content ?? faker.lorem.sentence({ min: 5, max: 20 }),
    userId: input?.userId ?? uid.rnd(),
    transactionId: input?.transactionId ?? uid.rnd(),
    createdAt: input?.createdAt ?? createdAt,
    modifiedAt: input?.modifiedAt ?? modifiedAt,
  };
  return comment;
};

export const createComment: MutationResolvers["createComment"] = async (
  _parent,
  { payload },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`Mock ${parentType}.${fieldName}`);
  return mockComment({
    ...payload,
    createdAt: new Date(),
    modifiedAt: new Date(),
  });
};
