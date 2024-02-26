// schemas/comment.ts
export const types = `#graphql
  type Comment {
    id: ID!
    uuid: ID!
    content: String!
    userId: ID!
    transactionId: ID!
    createdAt: Date!
    modifiedAt: Date!
  }

  input CreateComment {
    content: String!
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
    createComment(payload: CreateComment!): Comment!
  }
`;
