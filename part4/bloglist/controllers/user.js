const bcrypt = require("bcryptjs");
const userRouter = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");

userRouter.post("/signup", async (req, res) => {
  const { username, name, password } = req.body;

  if (!username || !password) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }
  if (username.length < 3 || password.length < 3) {
    return res
      .status(401)
      .json({ error: "username or password length too short" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!user || !passwordCorrect) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = userRouter;
