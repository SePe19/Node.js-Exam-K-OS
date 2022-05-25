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
                    const token = jwt.sign(
                        {
                            username: user[0].username,
                            _id: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                        
                    );
                        console.log("this is our token", token)
                        
                        res.cookie("jwt",token,{
                            httpOnly: true,
                            
                    
                        })
                        .json({ message: "Login Success", status: true })

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

export default router;