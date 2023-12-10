const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto-js')
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../keys')
const requireLogin = require('../middleware/requireLogin')
const nodemailer = require('nodemailer')
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM } = require('../keys');
const Token = require('../models/Token');


const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

router.get('/protected', requireLogin, (req, res) => {
  res.send("hello")
})




router.post('/signup', (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!email || !password || !name) {
    return res.send({ error: "please add all the fields" });
  }

  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.send({ error: "user already exists with that email" })
      }
      bcrypt.hash(password, 12)
        .then(hashedpassword => {
          const user = new User({
            email,
            password: hashedpassword,
            name,
            pic: pic

          })
          user.save()
            .then(user => {
              transporter.sendMail({
                from: EMAIL_FROM,
                to: user.email,
                subject: "signup sucessfully",
                text: "regards:bhoomi agarwal",
                html: "<h2>WELCOME TO INSTAGRAM</h2>"

              })
              res.json({ message: "saved successfully" })
            })
            .catch(err => {
              console.log(err)
            })

        })


    })
    .catch(err => {
      console.log(err)
    })

})


router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.send({ error: "please add email or password" })
  }
  User.findOne({ email: email })
    .then(savedUser => {
      if (!savedUser) {
        return res.send({ error: "Invalid Email or password" })
      }
      bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
          if (doMatch) {
            // res.json({message:"successfully signed in"})
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
            const { _id, name, email, followers, following, pic } = savedUser
            res.json({ token, user: { _id, name, email, followers, following, pic } })
          }
          else {
            return res.send({ error: "Invalid Email or password" })
          }
        })
        .catch(err => {
          console.log(err)
        })
    })
})

router.post('/reset-password', async (req, res) => {
 

     const {email} = req.body;

     if(!email){
      return;
     }

      const user = await User.findOne({ email: email });

      if(!user){
        res.send({
          success:false,
          msg:"USER NOT FOUND"
        })
        return;
      }

      rand = function () {
        return Math.random().toString(36).substr(2); // remove `0.`
      };

      var tokenGen = function () {
        return rand() + rand() + rand(); // to make it longer
      };

      const token = tokenGen();
      console.log(token);
      
      const tokenResponse  = await Token.create({token,email});

      await transporter.sendMail({
        to: email,
        from: EMAIL_FROM,
        subject: "RESET_PASSWORD",
        html: `
          <p>You requested a password reset</p>
          <h5>Click on this <a href="http://localhost:3000/reset/${token}">link</a> to reset your password</h5>`
      });

      res.json({ message: "Check your email for password reset instructions" });
    }
  
  );


  router.post('/new-password', (req, res) => {
    const newPassword = req.body.password;
    const sentToken = req.body.token;
    console.log(newPassword,sentToken);
  
    User.findOne({
      resetToken: sentToken,
      expireToken: { $gt: Date.now()+360000 }
    })
      .then(user => {
        if (!user) {
          return res.json({ error: "Try again, session expired" });
        }
  
        
        bcrypt.hash(newPassword, 12)
          .then(hashedPassword => {
            
            user.password = hashedPassword;
            user.resetToken = undefined;
            user.expireToken = undefined;
  
            
            user.save()
              .then(savedUser => {
                res.json({ message: "Password updated successfully" });
              })
              .catch(saveError => {
                console.error(saveError);
                res.status(500).json({ error: "Error saving user details" });
              });
          })
          .catch(hashError => {
            console.error(hashError);
            res.status(500).json({ error: "Error hashing password" });
          });
      })
      .catch(findError => {
        console.error(findError);
        res.status(500).json({ error: "Error finding user" });
      });
  });
module.exports = router
