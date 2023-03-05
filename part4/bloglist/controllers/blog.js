const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");

blogRouter.get("/", async (req, res) => {
  const response = await Blog.find({}).populate("user");
  return res.json(response);
});

blogRouter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;
  const token = req.token;
  const decodeToken = jwt.verify(token, SECRET);

  if (!token || !decodeToken.id) {
    return res.status(401).json({ error: "invalid token" });
  }

  const user = await User.findOne({ username: decodeToken.username });

  const blog = await new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user._id,
  }).populate("user", {
    username: 1,
    name: 1,
  });

  if (!title) {
    return res.status(400).json({ error: "no title" });
  } else if (!url) {
    return res.status(400).json({ error: "no url" });
  }

  const response = await blog.save();

  return res.status(201).json(response);
});

blogRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const token = req.token;
  const user = req.user;

  console.log("type of id: ", typeof id);
  console.log("id: ", id);
  // console.log("token ", token);
  // console.log("user ", user);

  if (!user || !token) {
    return res.status(400).json({ error: "invalid token or user" });
  }

  const response = await Blog.findById(id);

  if (!response || !response.user) {
    return res.status(400).json({ error: "invalid id for delete" });
  }

  if (response.user.toString() === user.id.toString()) {
    await Blog.deleteOne({ _id: id });
    return res.status(204).json({ message: "blog deleted" });
  }
});

blogRouter.put("/:id", async (req, res) => {
  const id = req.params.id;

  const blogItem = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  };

  const response = await Blog.findByIdAndUpdate(id, blogItem, { new: true });

  return res.status(202).json(response);
});

module.exports = blogRouter;
