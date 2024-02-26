// mocks/comment.ts
import { getTimestamps } from "./utils";
import { logger, uid } from "../utils";
import type { Like, MutationResolvers } from "../graphql";
import type { NullablePartial } from "../utils/types";

export const mockLike = (input?: NullablePartial<Like>) => {
  const { createdAt, modifiedAt } = getTimestamps();
  const like: Like = {
    id: input?.id ?? uid.rnd(),
    uuid: input?.uuid ?? uid.randomUUID(),
    userId: input?.userId ?? uid.rnd(),
    transactionId: input?.transactionId ?? uid.rnd(),
    createdAt: input?.createdAt ?? createdAt,
    modifiedAt: input?.modifiedAt ?? modifiedAt,
  };
  return like;
};

export const createLike: MutationResolvers["createLike"] = async (
  _parent,
  { payload },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`Mock ${parentType}.${fieldName}`);
  return mockLike({
    ...payload,
    createdAt: new Date(),
    modifiedAt: new Date(),
  });
};
