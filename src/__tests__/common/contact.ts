// __tests__/utils/contact.ts
import { prisma, uid } from "./utils";
import type { Prisma } from "@prisma/client";

export const createContact = async (
  input: Partial<Prisma.ContactUncheckedCreateInput> &
    Pick<Prisma.ContactUncheckedCreateInput, "userId" | "contactUserId">
) => {
  const contact = await prisma.contact.create({
    data: { ...input, id: input.id ?? uid.rnd() },
  });
  return contact;
};
