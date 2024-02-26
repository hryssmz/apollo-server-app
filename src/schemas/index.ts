// schemas/index.ts
import * as auth from "./auth";
import * as bankAccount from "./bankAccount";
import * as bankTransfer from "./bankTransfer";
import * as comment from "./comment";
import * as common from "./common";
import * as contact from "./contact";
import * as like from "./like";
import * as notification from "./notification";
import * as transaction from "./transaction";
import * as user from "./user";

export const typeDefs = `#graphql
  ${common.types.split("\n").slice(1, -1).join("\n").trimStart()}

  ${auth.types.split("\n").slice(1, -1).join("\n").trimStart()}
  ${bankAccount.types.split("\n").slice(1, -1).join("\n").trimStart()}
  ${bankTransfer.types.split("\n").slice(1, -1).join("\n").trimStart()}
  ${comment.types.split("\n").slice(1, -1).join("\n").trimStart()}
  ${contact.types.split("\n").slice(1, -1).join("\n").trimStart()}
  ${like.types.split("\n").slice(1, -1).join("\n").trimStart()}
  ${notification.types.split("\n").slice(1, -1).join("\n").trimStart()}
  ${transaction.types.split("\n").slice(1, -1).join("\n").trimStart()}
  ${user.types.split("\n").slice(1, -1).join("\n").trimStart()}

  type Query {
    ${auth.queries.split("\n").slice(2, -2).join("\n").trimStart()}
    ${bankAccount.queries.split("\n").slice(2, -2).join("\n").trimStart()}
    ${bankTransfer.queries.split("\n").slice(2, -2).join("\n").trimStart()}
    ${comment.queries.split("\n").slice(2, -2).join("\n").trimStart()}
    ${contact.queries.split("\n").slice(2, -2).join("\n").trimStart()}
    ${like.queries.split("\n").slice(2, -2).join("\n").trimStart()}
    ${notification.queries.split("\n").slice(2, -2).join("\n").trimStart()}
    ${transaction.queries.split("\n").slice(2, -2).join("\n").trimStart()}
    ${user.queries.split("\n").slice(2, -2).join("\n").trimStart()}
  }

  type Mutation {
    ${auth.mutations.split("\n").slice(2, -2).join("\n").trimStart()}
    ${bankAccount.mutations.split("\n").slice(2, -2).join("\n").trimStart()}
    ${bankTransfer.mutations.split("\n").slice(2, -2).join("\n").trimStart()}
    ${comment.mutations.split("\n").slice(2, -2).join("\n").trimStart()}
    ${contact.mutations.split("\n").slice(2, -2).join("\n").trimStart()}
    ${like.mutations.split("\n").slice(2, -2).join("\n").trimStart()}
    ${notification.mutations.split("\n").slice(2, -2).join("\n").trimStart()}
    ${transaction.mutations.split("\n").slice(2, -2).join("\n").trimStart()}
    ${user.mutations.split("\n").slice(2, -2).join("\n").trimStart()}
  }
`
  .split("\n")
  .slice(1, -1)
  .map(l => l.replace(/^ {0,2}/, ""))
  .join("\n");
