const jwt = require("jsonwebtoken");

const requireAuthentication = (req, res, next) => {
  const { authToken } = req.cookies;

  jwt.verify(authToken, "MY_SECRET_KEY", (error, payload) => {
    if (error) {
      return res.status(400).json({ error: "invalid token" });
    }

    req.user = payload;
    next();
  });
};

module.exports = requireAuthentication;
