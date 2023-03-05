const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const { getToken } = require("../utils/api_test_helpers");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const user = {
    username: "John Johnson",
    name: "John",
    password: "123456789",
  };
  await api.post("/api/users/signup").send(user);
});

describe("creating users", () => {
  test("successfully created a user", async () => {
    const user = {
      username: "Peter Johnson",
      name: "Peter",
      password: "123456",
    };
    await api.post("/api/users/signup").send(user).expect(201);
  });

  test("with invalid input results in errors", async () => {
    const noUsername = {
      name: "Peter",
      password: "123456",
    };

    const noPassword = {
      username: "Peter Johnson",
      name: "Peter",
    };

    await api.post("/api/users/signup").send(noUsername).expect(401);

    await api.post("/api/users/signup").send(noPassword).expect(401);
  });
});

describe("logging in", () => {
  test("log in returns a token", async () => {
    const user = {
      username: "John Johnson",
      password: "123456789",
    };
    const res = await api.post("/api/users/login").send(user);

    expect(res.text).toContain("token");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
