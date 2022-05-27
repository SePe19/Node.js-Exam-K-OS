import jwt from "jsonwebtoken";
import User from "../database/createUserSchema.js";

 const checkUser = (req, res, next) => {
    
    const token = req.cookies.jwt;
    
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, async (error, decodedToken) => {
            console.log("What is inside middleWare token? ", token);
            
            if (error) {
                res.json({ message: "First false res: ", status: false })
                next();
            
            } else {
                
                console.log("DECODEDTOKEN: ", decodedToken);
                
                const user = await User.findById(decodedToken.user);
                console.log("This is the user after decodedToken: ", user);
                
                if (user) {
                    console.log("Middleware decoded user: ", user);
                    res.json({ status: true, user: user.username });
                    
                } else {
                    res.json({ message: "This is second false res: ", status: false })
                    next();
                }
            }
        })

    } else {
        res.json({ message: "This is the final false res: ", status: false })
        next();
    }


}
export default checkUser;