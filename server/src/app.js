const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sanitizer = require("perfect-express-sanitizer");

const authRoutes = require("./routes/authRoutes");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, HEAD, POST",
  preflightContinue: false,
  optionSuccessStatus: 204,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(
  sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true,
  })
);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send({ response: "Server is live and running" });
});

module.exports = app;
