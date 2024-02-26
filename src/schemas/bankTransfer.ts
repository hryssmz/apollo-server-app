// schemas/bankTransfer.ts
export const types = `#graphql
  type BankTransfer {
    id: ID!
    uuid: ID!
    userId: ID!
    source: String!
    amount: Int!
    type: String!
    transactionId: ID!
    createdAt: Date!
    modifiedAt: Date!
  }
`;

export const queries = `#graphql
  type Query {
  }
`;

export const mutations = `#graphql
  type Mutation {
  }
`;
