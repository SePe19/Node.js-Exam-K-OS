import "dotenv/config";

import express from "express";
const app = express();
app.use(express.json());

import cookieParser from "cookie-parser"
app.use(cookieParser());

import cors from "cors";
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

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

io.on("connect", (socket) => {
    console.log("User Connected: ", socket.id);

    socket.on("join_chatroom", (data) => {
        socket.join(data);
        console.log("User with id: ", socket.id, " joined the chatroom", data);
    });

    socket.on("send_message", (data) => {
        socket.to(data.chatroom).emit("receive_message",data)
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected: ", socket.id);
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

import checkUser from "./middleware/authMiddleware.js"
app.post("/", checkUser);

server.listen(8080, () => {
    console.log("Server Running")
});