// schemas/auth.ts
export const types = `#graphql
  input Login {
    username: String!
    password: String!
  }

  input Logout {
    id: ID!
  }
`;

export const queries = `#graphql
  type Query {
  }
`;

export const mutations = `#graphql
  type Mutation {
    login(payload: Login!): User!
    logout(payload: Logout!): User!
  }
`;
