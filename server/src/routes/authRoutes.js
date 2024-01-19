const express = require("express");
const { signUp, getMe } = require("../controllers/authControllers");
const requireAuthentication = require("../middlewares/requireAuthentication");
const validateAuthData = require("../middlewares/dataValidator");
const router = express.Router();

router.post("/login", validateAuthData, signUp);
router.get("/me", requireAuthentication, getMe);

module.exports = router;
