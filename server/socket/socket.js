const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const getUserDetailFrmToken = require("../helpers/getUserDetailFrmToken");

const app = express();

// socket connection
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

// online user
const onlineUser = new Set();

io.on("connection", async (socket) => {
  console.log("User connected ", socket.id);

  const token = socket.handshake.auth.token;

  // getting current user
  const user = await getUserDetailFrmToken(token);

  // create a room
  socket.join(user?._id);
  onlineUser.add(user?._id);

  io.emit("onlineUser", Array.from(onlineUser));

  socket.on("message-page", async (userId) => {
    const userDetail = await UserModel.findById(userId).select("-password");

    const payload = {
      _id: userDetail?._id,
      name: userDetail?.name,
      email: userDetail?.email,
      online: onlineUser.has(userId),
    };

    socket.emit("message-user", payload);
  });

  // disconnect
  socket.on("disconnect", () => {
    onlineUser.delete(user?._id);
    console.log("User disconnected", socket.id);
  });
});

module.exports = { app, server };
