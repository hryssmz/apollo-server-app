// __tests__/utils/user.ts
import { faker } from "@faker-js/faker";
import { defaultPrivacyLevelChoices, prisma, uid } from "./utils";
import type { Prisma } from "@prisma/client";

export const createUser = async (
  input: Partial<Prisma.UserUncheckedCreateInput>
) => {
  const user = await prisma.user.create({
    data: {
      ...input,
      id: input.id ?? uid.rnd(),
      firstName: input.firstName ?? faker.person.firstName(),
      lastName: input.lastName ?? faker.person.lastName(),
      username: input.username ?? faker.internet.userName(),
      password: input.password ?? faker.internet.password(),
      email: input.email ?? faker.internet.email(),
      phoneNumber: input.phoneNumber ?? faker.phone.number(),
      avatar: input.avatar ?? faker.image.avatar(),
      defaultPrivacyLevel:
        input.defaultPrivacyLevel ??
        faker.helpers.arrayElement(defaultPrivacyLevelChoices),
    },
  });
  return user;
};

export const GET_USER = `#graphql
  query GetUser($id: ID!) {
    getUser(id: $id) {
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

export const SERACH_USERS = `#graphql
  query SearchUsers($q: String) {
    searchUsers(q: $q) {
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

export const CREATE_USER = `#graphql
  mutation CreateUser($payload: CreateUser!) {
    createUser(payload: $payload) {
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

export const UPDATE_USER = `#graphql
  mutation UpdateUser($payload: UpdateUser!) {
    updateUser(payload: $payload) {
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
