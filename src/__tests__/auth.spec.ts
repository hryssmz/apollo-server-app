// __tests__/auth.spec.ts
import assert from "node:assert/strict";
import { faker } from "@faker-js/faker";
import { createUser, testServer } from "./common";
import { LOGIN, LOGOUT } from "./common/auth";
import { logger, prisma, uid } from "../utils";
import type { User } from "../graphql";

beforeEach(async () => {
  jest.restoreAllMocks();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.user.deleteMany();
});

describe("login", () => {
  const username = faker.internet.userName();
  const password = faker.internet.password();

  beforeEach(async () => {
    await createUser({ username, password });
  });

  test("login successful", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const response = await testServer.executeOperation({
      query: LOGIN,
      variables: { payload: { username, password } },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data !== null && data !== undefined);
    expect(errors).toBeUndefined();

    const result = data.login as User;

    expect(result.username).toBe(username);
  });

  test("bad username", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const response = await testServer.executeOperation({
      query: LOGIN,
      variables: { payload: { username: username + "0", password } },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data === null);
    expect(errors).toHaveLength(1);
  });

  test("wrong password", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const response = await testServer.executeOperation({
      query: LOGIN,
      variables: { payload: { username, password: password + "0" } },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data === null);
    expect(errors).toHaveLength(1);
  });
});

describe("logout", () => {
  test("logout successful", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const id = uid.rnd();

    await createUser({ id });

    const response = await testServer.executeOperation({
      query: LOGOUT,
      variables: { payload: { id } },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data !== null && data !== undefined);
    expect(errors).toBeUndefined();

    const result = data.logout as User;

    expect(result.id).toBe(id);
  });

  test("logout user not found", async () => {
    jest.spyOn(logger, "info").mockImplementation(jest.fn());
    const response = await testServer.executeOperation({
      query: LOGOUT,
      variables: { payload: { id: uid.rnd() } },
    });

    // Assert response
    assert(response.body.kind === "single");

    const { data, errors } = response.body.singleResult;

    assert(data === null);
    expect(errors).toHaveLength(1);
  });
});
