// __tests__/utils/like.ts
import { prisma, uid } from "./utils";
import type { Prisma } from "@prisma/client";

export const createLike = async (
  input: Partial<Prisma.LikeUncheckedCreateInput> &
    Pick<Prisma.LikeUncheckedCreateInput, "userId" | "transactionId">
) => {
  const like = await prisma.like.create({
    data: { ...input, id: input.id ?? uid.rnd() },
  });
  return like;
};

export const CREATE_LIKE = `#graphql
  mutation CreateLike($payload: CreateLike!) {
    createLike(payload: $payload) {
      id
      uuid
      userId
      transactionId
      createdAt
      modifiedAt
    }
  }
`;
