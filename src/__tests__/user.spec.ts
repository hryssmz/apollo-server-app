// __tests__/user.spec.ts
import assert from "node:assert/strict";
import { faker } from "@faker-js/faker";
import { createUser, testServer } from "./common";
import {
  CREATE_USER,
  GET_USER,
  SERACH_USERS,
  UPDATE_USER,
} from "./common/user";
import { logger, prisma, uid } from "../utils";
import type { User } from "../graphql";

beforeEach(async () => {
  jest.restoreAllMocks();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.user.deleteMany();
});

describe("getUser", () => {
  test("user found", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const id = uid.rnd();

    await createUser({ id });

    const response = await testServer.executeOperation({
      query: GET_USER,
      variables: { id },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data !== null && data !== undefined);
    expect(errors).toBeUndefined();

    const result = data.getUser as User;

    expect(result.id).toBe(id);
  });

  test("user not found", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const response = await testServer.executeOperation({
      query: GET_USER,
      variables: { id: uid.rnd() },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data === null);
    expect(errors).toHaveLength(1);
  });
});

describe("searchUser", () => {
  test("With query", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const q = "test";
    await createUser({ firstName: "AtestB" });
    await createUser({ lastName: "CtestD" });
    await createUser({ username: "EtestF" });
    await createUser({ email: "gtest@gmail.com" });
    await createUser({ phoneNumber: "000 test abc" });
    await createUser({});

    const response = await testServer.executeOperation({
      query: SERACH_USERS,
      variables: { q },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data !== null && data !== undefined);
    expect(errors).toBeUndefined();

    const users = data.searchUsers as User[];

    expect(users).toHaveLength(5);
  });
});

describe("createUser", () => {
  test("user created", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const username = faker.internet.userName();
    const response = await testServer.executeOperation({
      query: CREATE_USER,
      variables: {
        payload: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          username,
          password: faker.internet.password(),
        },
      },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data !== null && data !== undefined);
    expect(errors).toBeUndefined();

    const result = data.createUser as User;

    expect(result.username).toBe(username);

    // Assert database
    const users = await prisma.user.findMany();

    expect(users).toHaveLength(1);
    expect(users[0].username).toBe(username);
  });
});

describe("updateUser", () => {
  test("user updated", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const id = uid.rnd();
    const original = {
      id,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      defaultPrivacyLevel: "private",
    };
    await createUser({ ...original });

    const updates = {
      id,
      firstName: faker.person.firstName(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
    };
    const response = await testServer.executeOperation({
      query: UPDATE_USER,
      variables: { payload: updates },
    });

    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data !== null && data !== undefined);
    expect(errors).toBeUndefined();

    const result = data.updateUser as User;

    expect(result.lastName).toBe(original.lastName);
    expect(result.username).toBe(updates.username);

    // Assert database
    const user = await prisma.user.findUnique({
      where: { id },
    });

    assert(user !== null);
    expect(user.lastName).toBe(original.lastName);
    expect(user.username).toBe(updates.username);
  });

  test("update user not found", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const updates = {
      id: uid.rnd(),
      firstName: faker.person.firstName(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
    };
    const response = await testServer.executeOperation({
      query: UPDATE_USER,
      variables: { payload: updates },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data === null);
    expect(errors).toHaveLength(1);
  });

  test("bad update enum", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const id = uid.rnd();
    const original = {
      id,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    await createUser({ ...original });

    const updates = {
      id,
      firstName: faker.person.firstName(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      defaultPrivacyLevel: uid.rnd(),
    };
    const response = await testServer.executeOperation({
      query: UPDATE_USER,
      variables: { payload: updates },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data === null);
    expect(errors).toHaveLength(1);
  });
});
