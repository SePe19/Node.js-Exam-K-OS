import bcrypt from "bcrypt";
import { Router } from "express";
import User from "../database/createUserSchema.js";
import jwt from "jsonwebtoken";



const router = Router();




router.post("/register", (req, res) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.json({
                    status: false,
                    message: "Username already exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            username: req.body.username,
                            password: hash,
                           

                        });
                        user
                            .save()
                            .then(result => {
                                res.json ({message: "User Registered",status: true})
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
});

router.post("/login",  (req, res, next) => {

    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.json({
                    status: false,
                    message: "Username not found. Unable to Login"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (error, result) => {
                if (result) {
                    
                    const token = jwt.sign({
                        user: user, 
                    }, 
                        process.env.JWT_KEY,
                    {
                        expiresIn: "10m",
                    }
                    );
                
                    console.log("Our JWT Token: ", token)
                    console.log("Our user data ", user)
                        
                    res.cookie("jwt", token, { httpOnly: false, withCredentials: true })
                    .json({ message: "Login Success", status: true, token: token, user: user})


                                                 
                } else {
                    return res.json({
                        message: "Incorrect Password",
                        status: false
                    });
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/allUsers/:id", async (req, res) => {
    try {
        //This method finds all users find() except the id on the user that is currently logged in $ne: _id
        const users = await User.find({_id: {$ne: req.params.id } }).select([
            "username",
            "avatarImage",
            "_id"
        ]);

        return res.json(users);

    } catch (error) {
        res.json({message: "Something went wrong fetching all users"});
        next(error);
    }
});



export default router;