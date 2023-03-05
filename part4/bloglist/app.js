const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const { getTokenFrom, userExtractor } = require("./utils/middleware");

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(getTokenFrom);

app.use("/api/blogs", userExtractor, blogRouter);
app.use("/api/users", userRouter);

module.exports = app;
