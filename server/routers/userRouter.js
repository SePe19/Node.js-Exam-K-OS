import bcrypt from "bcrypt";
import { Router } from "express";
import User from "../database/createSchema.js";

const router = Router();

router.post("/signup", async (req, res) => {
    const body = req.body;

    if (!(body.username && body.password)) {
      return res.status(400).send({ error: "Data not formatted properly" });
    }

    const user = new User(body);

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc));
});

export default router;