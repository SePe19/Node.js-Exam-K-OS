import express from "express";
const app = express();
app.use(express.json());

import userRouter from "./routers/userRouter.js";
app.use("/auth", userRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Starting server on port:", PORT);
});