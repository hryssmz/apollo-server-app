// mocks/user.ts
import { faker } from "@faker-js/faker";
import { getTimestamps } from "./utils";
import { logger, uid } from "../utils";
import { defaultPrivacyLevelChoices } from "../utils/enums";
import type { MutationResolvers, QueryResolvers, User } from "../graphql";
import type { NullablePartial } from "../utils/types";

export const mockUser = (input?: NullablePartial<User>) => {
  const { createdAt, modifiedAt } = getTimestamps();
  const user: User = {
    id: input?.id ?? uid.rnd(),
    uuid: input?.uuid ?? uid.randomUUID(),
    firstName: input?.firstName ?? faker.person.firstName(),
    lastName: input?.lastName ?? faker.person.lastName(),
    username: input?.username ?? faker.internet.userName(),
    email: input?.email ?? faker.internet.email(),
    phoneNumber: input?.phoneNumber ?? faker.phone.number(),
    balance: input?.balance ?? faker.number.int({ min: 0, max: 10000 }),
    avatar: input?.avatar ?? faker.image.avatar(),
    defaultPrivacyLevel:
      input?.defaultPrivacyLevel ??
      faker.helpers.arrayElement(defaultPrivacyLevelChoices),
    createdAt: input?.createdAt ?? createdAt,
    modifiedAt: input?.modifiedAt ?? modifiedAt,
  };
  return user;
};

export const getUser: QueryResolvers["getUser"] = async (
  _parent,
  { id },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`Mock ${parentType}.${fieldName}`);
  return mockUser({ id });
};

export const searchUsers: QueryResolvers["searchUsers"] = async (
  _parent,
  args,
  _context,
  { fieldName, parentType }
) => {
  logger.info(`Mock ${parentType}.${fieldName}`);
  const q = args.q ?? "";
  return [...new Array(/^[a-z]{0,4}$/.test(q) ? 5 - q.length : 0)].map(() =>
    mockUser({
      email:
        Math.random()
          .toString(36)
          .slice(2, faker.number.int({ min: 2, max: 5 })) +
        q +
        faker.internet.email(),
    })
  );
};

export const createUser: MutationResolvers["createUser"] = async (
  _parent,
  { payload },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`Mock ${parentType}.${fieldName}`);
  return mockUser({
    firstName: payload.firstName,
    lastName: payload.lastName,
    username: payload.username,
    email: null,
    phoneNumber: null,
    balance: 0,
    avatar: null,
    createdAt: new Date(),
    modifiedAt: new Date(),
  });
};

export const updateUser: MutationResolvers["updateUser"] = async (
  _parent,
  { payload },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`Mock ${parentType}.${fieldName}`);
  return mockUser({ ...payload, modifiedAt: new Date() });
};
