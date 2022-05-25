import jwt from "jsonwebtoken";
import User from "../database/createUserSchema.js";

 const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, async (error, decodedToken) => {
            if (error) {
                res.json({ status: false })
                next();
            } else {
                const user = await User.findById(decodedToken.id)
                if (user) {
                    res.json({ status: true, user: user.username });
                } else {
                    res.json({ status: false })
                    next();
                }
            }
        })

    } else {
        res.json({ status: false })
        next();
    }
}
export default checkUser;