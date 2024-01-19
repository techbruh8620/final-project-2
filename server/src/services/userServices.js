const User = require("../models/user");

const createUser = async (userData) => {
  const newUser = new User(userData);

  await newUser.save();

  if (newUser) {
    return newUser;
  }
};

const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  if (user) {
    return user;
  }
};

const checkUserExist = async (username) => {
  const user = await User.findOne({ username });
  if (user) {
    return user;
  }
};

module.exports = { getCurrentUser, createUser, checkUserExist };
