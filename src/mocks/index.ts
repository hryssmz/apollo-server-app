// mocks/index.ts
import { login, logout } from "./auth";
import {
  createBankAccount,
  deleteBankAccount,
  listBankAccounts,
} from "./bankAccount";
import { createComment } from "./comment";
import { createLike } from "./like";
import {
  createNotification,
  getUnreadNotifications,
  updateNotification,
} from "./notification";
import {
  createTransaction,
  getContactsTransactions,
  getTransactionDetail,
  updateTransaction,
} from "./transaction";
import { createUser, getUser, searchUsers, updateUser } from "./user";
import { resolvers } from "../resolvers";
import type { Resolvers } from "../graphql";

export const mocks: Resolvers = {
  ...resolvers,
  Query: {
    ...resolvers.Query,
    // bankAccount
    listBankAccounts,
    // notification
    getUnreadNotifications,
    // transaction
    getContactsTransactions,
    getPersonalTransactions: getContactsTransactions,
    getPublicTransactions: getContactsTransactions,
    getTransactionDetail,
    // user
    getUser,
    searchUsers,
  },
  Mutation: {
    ...resolvers.Mutation,
    // auth
    login,
    logout,
    // bankAccount
    createBankAccount,
    deleteBankAccount,
    // comment
    createComment,
    // like
    createLike,
    // notification
    createNotification,
    updateNotification,
    // transaction
    createTransaction,
    updateTransaction,
    // user
    createUser,
    updateUser,
  },
};
