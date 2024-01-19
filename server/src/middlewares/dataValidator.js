const validateAuthData = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username or password is required" });
  }

  if (username.trim().length > 10) {
    return res
      .status(400)
      .json({ error: "username should not be longer than 10 characters" });
  }

  next();
};

module.exports = validateAuthData;
