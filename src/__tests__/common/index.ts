// __tests__/utils/index.ts
import { ApolloServer } from "@apollo/server";
import { resolvers } from "../../resolvers";
import { typeDefs } from "../../schemas";

export { createBankAccount } from "./bankAccount";
export { createComment } from "./comment";
export { createContact } from "./contact";
export { createLike } from "./like";
export { createNotification } from "./notification";
export { createTransaction } from "./transaction";
export { createUser } from "./user";

export const testServer = new ApolloServer({ resolvers, typeDefs });
