const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  createUser,
  getCurrentUser,
  checkUserExist,
} = require("../services/userServices");

const signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExist = await checkUserExist(username);

    if (userExist) {
      const passwordMatch = await bcrypt.compare(password, userExist.password);

      if (!passwordMatch) {
        return res.status(400).json({ error: "invalid login credentials" });
      }

      const token = jwt.sign({ userId: userExist._id }, "MY_SECRET_KEY");

      return res
        .cookie("authToken", token, {
          expires: 59 * 60 * 60 * 1000,
          maxAge: 59 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .json({ token });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const user = await createUser({ username, password: hashedPassword });

      if (!user) {
        return res.status(400).json({ error: "something went wrong" });
      }

      const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");

      return res
        .cookie("authToken", token, {
          expires: 59 * 60 * 60 * 1000,
          maxAge: 59 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .json({ token });
    }
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

const getMe = async (req, res) => {
  const { userId } = req.user;
  try {
    const currentUser = await getCurrentUser(userId);

    if (!currentUser) {
      return res.status(400).json({ error: "user does not exist" });
    }

    return res.status(200).json({ currentUser });
  } catch (error) {
    return res.status(400).json({ error: "something went wrong" });
  }
};

module.exports = { signUp, getMe };
