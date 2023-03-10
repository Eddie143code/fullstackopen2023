const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const testingRouter = require("./controllers/testing");
const { getTokenFrom, userExtractor } = require("./utils/middleware");

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(getTokenFrom);

app.use("/api/blogs", userExtractor, blogRouter);
app.use("/api/users", userRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

module.exports = app;
