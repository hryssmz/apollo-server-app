// resolvers/user.ts
import Joi from "joi";
import { logger, prisma, uid } from "../utils";
import { defaultPrivacyLevelChoices } from "../utils/enums";
import type { QueryResolvers, MutationResolvers, UpdateUser } from "../graphql";

export const userSchema = Joi.object({
  defaultPrivacyLevel: Joi.string().valid(...defaultPrivacyLevelChoices),
}).unknown();

export const getUser: QueryResolvers["getUser"] = async (
  _parent,
  { id },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`${parentType}.${fieldName}`);
  const user = await prisma.user.findUnique({ where: { id } });
  if (user === null) {
    throw `User not found: ${id}`;
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

export const searchUsers: QueryResolvers["searchUsers"] = async (
  _parent,
  { q },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`${parentType}.${fieldName}`);
  const users = await prisma.user.findMany({
    where: {
      ...(!q
        ? {}
        : {
            OR: [
              { firstName: { contains: q } },
              { lastName: { contains: q } },
              { username: { contains: q } },
              { email: { contains: q } },
              { phoneNumber: { contains: q } },
            ],
          }),
    },
  });
  return users.map(user => ({
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
  }));
};

export const createUser: MutationResolvers["createUser"] = async (
  _parent,
  { payload },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`${parentType}.${fieldName}`);
  const { error } = userSchema.validate(payload);
  if (error !== undefined) {
    throw error;
  }
  const user = await prisma.user.create({
    data: {
      id: uid.rnd(),
      firstName: payload.firstName,
      lastName: payload.lastName,
      username: payload.username,
      password: payload.password,
      defaultPrivacyLevel: "private",
    },
  });
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

export const updateUser: MutationResolvers["updateUser"] = async (
  _parent,
  { payload },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`${parentType}.${fieldName}`);
  const { error } = userSchema.validate(payload);
  if (error !== undefined) {
    throw error;
  }
  const updateKeys: Array<keyof UpdateUser> = [
    "firstName",
    "lastName",
    "username",
    "password",
    "email",
    "phoneNumber",
    "avatar",
    "defaultPrivacyLevel",
  ];
  const user = await prisma.user.update({
    where: { id: payload.id },
    data: updateKeys.reduce((acc, key) => {
      const value = payload[key];
      return value === null || value === undefined
        ? acc
        : { ...acc, [key]: value };
    }, {}),
  });
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
