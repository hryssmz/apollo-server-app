// resolvers/comment.ts
import { logger, prisma, uid } from "../utils";
import type { MutationResolvers } from "../graphql";

export const createComment: MutationResolvers["createComment"] = async (
  _parent,
  { payload },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`${parentType}.${fieldName}`);
  const comment = await prisma.comment.create({
    data: {
      id: uid.rnd(),
      content: payload.content,
      userId: payload.userId,
      transactionId: payload.transactionId,
    },
  });
  return {
    id: comment.id,
    uuid: comment.uuid,
    content: comment.content,
    userId: comment.userId,
    transactionId: comment.transactionId,
    createdAt: comment.createdAt,
    modifiedAt: comment.modifiedAt,
  };
};
