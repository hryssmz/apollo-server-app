// schemas/contact.ts
export const types = `#graphql
  type Contact {
    id: ID!
    uuid: ID!
    userId: ID!
    contactUserId: ID!
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
