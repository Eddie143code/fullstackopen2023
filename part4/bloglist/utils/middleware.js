const user = require("../models/user");
const { SECRET } = require("./config");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (req, res, next) => {
  // console.log("in gettokenfrom");
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    //  console.log("in if stataement");

    req.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (req, res, next) => {
  // console.log("in userEx");
  const token = req.token;
  console.log(token);

  if (token) {
    const decodeToken = jwt.verify(token, SECRET);
    const user = await User.findById(decodeToken.id);
    req.user = user;
  }
  next();
};

module.exports = {
  getTokenFrom,
  userExtractor,
};
