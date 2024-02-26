// resolvers/like.ts
import { logger, prisma, uid } from "../utils";
import type { MutationResolvers } from "../graphql";

export const createLike: MutationResolvers["createLike"] = async (
  _parent,
  { payload },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`${parentType}.${fieldName}`);
  const like = await prisma.like.create({
    data: {
      id: uid.rnd(),
      userId: payload.userId,
      transactionId: payload.transactionId,
    },
  });
  return {
    id: like.id,
    uuid: like.uuid,
    userId: like.userId,
    transactionId: like.transactionId,
    createdAt: like.createdAt,
    modifiedAt: like.modifiedAt,
  };
};
