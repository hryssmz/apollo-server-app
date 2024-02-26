// schemas/like.ts
export const types = `#graphql
  type Like {
    id: ID!
    uuid: ID!
    userId: ID!
    transactionId: ID!
    createdAt: Date!
    modifiedAt: Date!
  }

  input CreateLike {
    userId: ID!
    transactionId: ID!
  }
`;

export const queries = `#graphql
  type Query {
  }
`;

export const mutations = `#graphql
  type Mutation {
    createLike(payload: CreateLike!): Like!
  }
`;
