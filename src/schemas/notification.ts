// schemas/notification.ts
export const types = `#graphql
  type Notification {
    id: ID!
    uuid: ID!
    userId: ID!
    transactionId: ID!
    message: String!
    isRead: Boolean!
    createdAt: Date!
    modifiedAt: Date!
  }

  input CreateNotification {
    userId: ID!
    transactionId: ID!
    message: String!
  }

  input UpdateNotification {
    id: ID!
    userId: ID!
    isRead: Boolean
    message: String
  }
`;

export const queries = `#graphql
  type Query {
    getUnreadNotifications(userId: ID!): [Notification!]!
  }
`;

export const mutations = `#graphql
  type Mutation {
    createNotification(payload: CreateNotification!): Notification!
    updateNotification(payload: UpdateNotification!): Notification!
  }
`;
