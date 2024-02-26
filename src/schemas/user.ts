// schemas/user.ts
export const types = `#graphql
  type User {
    id: ID!
    uuid: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String
    phoneNumber: String
    balance: Int!
    avatar: String
    defaultPrivacyLevel: String!
    createdAt: Date!
    modifiedAt: Date!
  }

  input CreateUser {
    firstName: String!
    lastName: String!
    username: String!
    password: String!
  }

  input UpdateUser {
    id: ID!
    firstName: String
    lastName: String
    username: String
    password: String
    email: String
    phoneNumber: String
    avatar: String
    defaultPrivacyLevel: String
  }
`;

export const queries = `#graphql
  type Query {
    getUser(id: ID!): User!
    searchUsers(q: String): [User!]!
  }
`;

export const mutations = `#graphql
  type Mutation {
    createUser(payload: CreateUser!): User!
    updateUser(payload: UpdateUser!): User!
  }
`;
