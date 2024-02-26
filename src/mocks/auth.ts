// mocks/auth.ts
import { mockUser } from "./user";
import { logger } from "../utils";
import type { MutationResolvers } from "../graphql";

export const login: MutationResolvers["login"] = async (
  _parent,
  { payload },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`Mock ${parentType}.${fieldName}`);
  return mockUser({ ...payload });
};

export const logout: MutationResolvers["logout"] = async (
  _parent,
  { payload },
  _context,
  { fieldName, parentType }
) => {
  logger.info(`Mock ${parentType}.${fieldName}`);
  return mockUser({ ...payload });
};
