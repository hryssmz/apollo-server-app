// __tests__/utils/auth.ts
export const LOGIN = `#graphql
  mutation Login($payload: Login!) {
    login(payload: $payload) {
      id
      uuid
      firstName
      lastName
      username
      email
      phoneNumber
      balance
      avatar
      defaultPrivacyLevel
      createdAt
      modifiedAt
    }
  }
`;

export const LOGOUT = `#graphql
  mutation Logout($payload: Logout!) {
    logout(payload: $payload) {
      id
      uuid
      firstName
      lastName
      username
      email
      phoneNumber
      balance
      avatar
      defaultPrivacyLevel
      createdAt
      modifiedAt
    }
  }
`;
