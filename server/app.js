import "dotenv/config";

import express from "express";
const app = express();
app.use(express.json());

import cookieParser from "cookie-parser";
app.use(cookieParser());

import cors from "cors";
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log("User Connected: ", socket.id);

    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-message", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("receive-message", data.message);
        }
    });

});


import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/chatland", {
    useNewUrlParser: true
})
    .then((_) => console.log("Connected to DB"))
    .catch((err) => console.error("error", err));


import userRouter from "./routers/userRouter.js";
app.use("/auth", userRouter);

import checkUser from "./middleware/authMiddleware.js";
app.post("/", checkUser);

import setAvatarRouter from "./routers/setAvatarRouter.js";
app.use("/auth", setAvatarRouter);

import messageRouter from "./routers/messageRouter.js";
app.use("/auth", messageRouter);

server.listen(8080, () => {
    console.log("Server Running");
});