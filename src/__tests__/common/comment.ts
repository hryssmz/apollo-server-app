// __tests__/utils/comment.ts
import { faker } from "@faker-js/faker";
import { prisma, uid } from "./utils";
import type { Prisma } from "@prisma/client";

export const createComment = async (
  input: Partial<Prisma.CommentUncheckedCreateInput> &
    Pick<Prisma.CommentUncheckedCreateInput, "userId" | "transactionId">
) => {
  const comment = await prisma.comment.create({
    data: {
      ...input,
      id: input.id ?? uid.rnd(),
      content: input.content ?? faker.lorem.sentence({ min: 5, max: 15 }),
    },
  });
  return comment;
};

export const CREATE_COMMENT = `#graphql
  mutation CreateComment($payload: CreateComment!) {
    createComment(payload: $payload) {
      id
      uuid
      content
      userId
      transactionId
      createdAt
      modifiedAt
    }
  }
`;
