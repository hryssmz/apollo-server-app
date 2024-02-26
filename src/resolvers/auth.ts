// resolvers/auth.ts
import { logger, prisma } from "../utils";
import type { MutationResolvers } from "../graphql";

export const login: MutationResolvers["login"] = async (
  _parent,
  { payload },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`${parentType}.${fieldName}`);
  const user = await prisma.user.findUnique({
    where: { username: payload.username },
  });
  if (user === null) {
    throw `Username not found: ${payload.username}`;
  }
  if (payload.password !== user.password) {
    throw `Wrong password!`;
  }
  return {
    id: user.id,
    uuid: user.uuid,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    balance: user.balance,
    avatar: user.avatar,
    defaultPrivacyLevel: user.defaultPrivacyLevel,
    createdAt: user.createdAt,
    modifiedAt: user.modifiedAt,
  };
};

export const logout: MutationResolvers["logout"] = async (
  _parent,
  { payload },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`${parentType}.${fieldName}`);
  const user = await prisma.user.findUnique({ where: { id: payload.id } });
  if (user === null) {
    throw `User not found: ${payload.id}`;
  }
  return {
    id: user.id,
    uuid: user.uuid,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    balance: user.balance,
    avatar: user.avatar,
    defaultPrivacyLevel: user.defaultPrivacyLevel,
    createdAt: user.createdAt,
    modifiedAt: user.modifiedAt,
  };
};
