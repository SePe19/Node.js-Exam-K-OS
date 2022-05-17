import mongoose from "mongoose";

mongoose
    .connect("mongodb://localhost:27017/chatland", { useNewUrlParser: true })
    .then((_) => console.log("Connected to DB"))
    .catch((err) => console.error("error", err));

export default db;