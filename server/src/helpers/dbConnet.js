const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("db connected"))
    .catch((error) => console.log(error));
};

module.exports = connectDb;
