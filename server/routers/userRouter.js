import bcrypt from "bcrypt";
import { Router } from "express";
import User from "../database/createUserSchema.js";
import jwt from "jsonwebtoken";


const router = Router();

router.post("/register", (req, res) => {
  User.find({ username: req.body.username})
      .exec()
      .then(user => {
          if (user.length >= 1) {
              return res.status(409).json({
                  message: "Username exists"
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
                          password: hash
                      });
                      user
                          .save()
                          .then(result => {
                              res.redirect("/auth/login")
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

router.post("/login", (req, res, next) => {
  User.find({ username: req.body.username })
      .exec()
      .then(user => {
          if (user.length < 1) {
              return res.status(401).json({
                  message: "Username not found. Unable to Login"
              });
          }
          
          bcrypt.compare(req.body.password, user[0].password, (err, result) => {
              if (err) {
                  return res.status(401).json({
                      message: "Incorrect Password"
                  });
              }
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
                  res.status(200).json({ message: "Login Success"})
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