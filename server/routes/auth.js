const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require('../keys')
const requireLogin =require('../middleware/requireLogin')

router.get("/", (req, res) => {
  res.send("hello from auth route base url");
});



router.post("/signup", (req, res) => {
  const { name, email, password , pic} = req.body;

  if (!email || !password || !name) {
    res.status(422).json({ error: "Please add all the fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        res.status(422).json({ error: "user already exists" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          name: name,
          email: email,
          password: hashedpassword,
          pic: pic
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "User saved successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => console.log(error));
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "please submit email || password" });
  }

  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    bcrypt.compare(password, savedUser.password)
    .then((doMatch) => {
      if (doMatch) {
        //res.json({ message: "signed in successfully" });
        const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
        const {_id, name, email, followers, following, pic}= savedUser
        res.json({token: token, user: {_id, name, email, followers, following, pic}})
      } else {
        return res.status(422).json({ error: "Invalid Email or password" });
      }
    })
    .catch(err=>{
        console.log(err, "error from my bcrypt")
    })
  });
});

module.exports = router;
