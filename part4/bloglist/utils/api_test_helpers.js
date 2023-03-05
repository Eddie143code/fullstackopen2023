const Blog = require("../models/blog");

const blogsInDb = async () => {
  return await Blog.find({});
};

const getToken = async (api) => {};

module.exports = {
  blogsInDb,
  getToken,
};
