const http = require("http");
const app = require("./app");
const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const socketServer = require("./socketServer");
const cors = require("cors");
const connectDb = require("./helpers/dbConnet");
require("dotenv").config();

const PORT = process.env.PORT;

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const startServer = async () => {
  await connectDb();
  httpServer.listen(PORT, () =>
    console.log(`Server has started on PORT:${PORT}`)
  );
  socketServer.listen(io);
};

startServer();
