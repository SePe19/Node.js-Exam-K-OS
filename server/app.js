import "dotenv/config";


import express from "express";

const app = express();
app.use(express.json());

import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/chatland", { 
    useNewUrlParser: true })
    .then((_) => console.log("Connected to DB"))
    .catch((err) => console.error("error", err));


import userRouter from "./routers/userRouter.js";
app.use("/auth", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Starting server on port:", PORT);
});