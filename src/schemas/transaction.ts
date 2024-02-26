// schemas/transaction.ts
export const types = `#graphql
  type Transaction {
    id: ID!
    uuid: ID!
    source: String!
    amount: Int!
    description: String!
    privacyLevel: String!
    receiverId: ID!
    senderId: ID!
    balanceAtCompletion: Int!
    status: String!
    requestStatus: String!
    requestResolvedAt: Date
    createdAt: Date!
    modifiedAt: Date!
  }

  type TransactionDetail {
    transaction: Transaction!
    sender: User!
    receiver: User!
    likes: [Like!]!
    comments: [Comment!]!
  }

  type TransactionDetailPage {
    results: [TransactionDetail!]!
    pageData: PageData!
  }

  input CreateTransaction {
    source: String!
    amount: Int!
    description: String!
    privacyLevel: String!
    receiverId: ID!
    senderId: ID!
    balanceAtCompletion: Int!
    status: String!
    requestStatus: String!
  }

  input UpdateTransaction {
    id: ID!
    source: String
    amount: Int
    description: String
    privacyLevel: String
    receiverId: ID
    senderId: ID
    balanceAtCompletion: Int
    status: String
    requestStatus: String
  }
`;

export const queries = `#graphql
  type Query {
    getContactsTransactions(
      userId: ID!
      dateStart: Date
      dateEnd: Date
      amountMin: Int
      amountMax: Int
      page: Int
      limit: Int
    ): TransactionDetailPage!
    getPersonalTransactions(
      userId: ID!
      dateStart: Date
      dateEnd: Date
      amountMin: Int
      amountMax: Int
      page: Int
      limit: Int
    ): TransactionDetailPage!
    getPublicTransactions(
      userId: ID!
      dateStart: Date
      dateEnd: Date
      amountMin: Int
      amountMax: Int
      page: Int
      limit: Int
    ): TransactionDetailPage!
    getTransactionDetail(id: ID!): TransactionDetail!
  }
`;

export const mutations = `#graphql
  type Mutation {
    createTransaction(payload: CreateTransaction!): Transaction!
    updateTransaction(payload: UpdateTransaction!): Transaction!
  }
`;
