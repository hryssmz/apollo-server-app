// schemas/bankAccount.ts
export const types = `#graphql
  type BankAccount {
    id: ID!
    uuid: ID!
    userId: ID!
    bankName: String!
    accountNumber: String!
    routingNumber: String!
    isDeleted: Boolean!
    createdAt: Date!
    modifiedAt: Date!
  }

  input CreateBankAccount {
    userId: ID!
    bankName: String!
    accountNumber: String!
    routingNumber: String!
  }

  input DeleteBankAccount {
    id: ID!
  }
`;

export const queries = `#graphql
  type Query {
    listBankAccounts: [BankAccount!]!
  }
`;

export const mutations = `#graphql
  type Mutation {
    createBankAccount(payload: CreateBankAccount!): BankAccount!
    deleteBankAccount(payload: DeleteBankAccount!): BankAccount!
  }
`;
