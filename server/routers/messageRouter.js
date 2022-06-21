import { Router } from "express";
import Messages from "../database/createMessageSchema.js";

const router = Router();

router.post("/getMessages", async (req, res, next) => {

    try {
        const { from, to } = req.body;
        const messages = await Messages.find({
            users: {
                $all: [from, to]
            },
        }).sort({ updatedAt: 1 });
        const recievedMessages = messages.map((message) => {
            return {
                fromSelf: message.sender.toString() === from,
                message: message.message.text
            };
        });
        return res.json(recievedMessages);

    } catch (exception) {
        next(exception);

    }
});

router.post("/addMessage", async (req, res, next) => {

    try {
        const { from, to, message } = req.body;
        const data = await Messages.create({
            message: { text: message },
            users: [from, to],
            sender: from
        });

        console.log()

        if (data) {
            return res.json({ message: "Message sent to Database", status: true });
        }

        else {
            return res.json({ message: "Unable to send message to Database", status: false });
        }

    } catch (exception) {
        next(exception)

    }
});

export default router;