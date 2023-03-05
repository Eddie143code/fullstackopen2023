const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const { blogList } = require("../utils/Bloglist");
const Blog = require("../models/blog");
const { blogsInDb, getToken } = require("../utils/api_test_helpers");
const User = require("../models/user");
const { SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");

const api = supertest(app);
let token = null;
let userTest = null;

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let i = 0; i < blogList.length; i++) {
    let blog = new Blog(blogList[i]);
    await blog.save();
  }

  userTest = {
    username: "Peter Johnson",
    name: "Peter",
    password: "123456",
  };
  await api.post("/api/users/signup").send(userTest).expect(201);

  const user = await User.findOne({ username: userTest.username });

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  token = jwt.sign(userForToken, SECRET);
  console.log(typeof token);
});

describe("Blog get request tests", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("id's exist on blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("Blog api post requests", () => {
  test("successfuly posting a blog", async () => {
    const blog = {
      title: "new title",
      author: "new author",
      url: "https://reactpatterns.com/",
      likes: 7,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blog);
    const allBlogs = await blogsInDb();

    expect(allBlogs.length).toBe(blogList.length + 1);
  });

  test("no likes in blog defaults to 0", async () => {
    const blog = {
      title: "new title",
      author: "new author",
      url: "https://reactpatterns.com/",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blog);

    const allBlogs = await blogsInDb();
    expect(allBlogs.length).toBe(blogList.length + 1);

    const likes = allBlogs.map((blog) => blog.likes);
    expect(likes).toContain(0);
  });

  test("no title results in error", async () => {
    const blogNoTitle = {
      author: "new author",
      url: "https://reactpatterns.com/",
      likes: 7,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blogNoTitle)
      .expect(400);
  });

  test("no url results in error", async () => {
    const blogNoUrl = {
      title: "new title",
      author: "new author",
      likes: 7,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blogNoUrl)
      .expect(400);
  });
});

describe("Blog api delete requests", () => {
  test("returns id of delete request", async () => {
    await Blog.deleteMany({});

    const blogInsert = {
      title: "new title",
      author: "new author",
      url: "new title",
      likes: 7,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blogInsert)
      .expect(201);
    const allBlogs = await Blog.find({}).populate("user");
    const blog = allBlogs[0];

    await api
      .delete(`/api/blogs/${blog.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(userTest)
      .expect(204);
  });
  /* test("returns 400 when request contains invalid or empty id", async () => {
    const id = "5a422bc61b54a676234d17kl";
    await api.delete(`/api/blogs/${id}`).expect(400);

    const idEmpty = "";

    await api.delete(`/api/blogs/${idEmpty}`).expect(400);
  });
  */
});

describe("Blog api put requests", () => {
  test("returns id of update request", async () => {
    await Blog.deleteMany({});
    for (let i = 0; i < blogList.length; i++) {
      let blog = new Blog(blogList[i]);
      await blog.save();
    }
    const blogItem = {
      _id: "5a422bc61b54a676234d17fc",
      title: "New not typing wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    };

    await api.put(`/api/blogs/${blogItem._id}`).send(blogItem).expect(202);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
