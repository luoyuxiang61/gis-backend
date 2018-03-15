const Group = require('../resource/resource').group;
const User = require('../resource/resource').user;

const jwt = require('jsonwebtoken')
const secret = require('../config').secret

const express = require('express');
let authRouter = express.Router({ caseSensitive: true });


// 登录并返回token
authRouter.post('/authenticate', function (req, res) {
  User.findOne({
    where: {
      UserName: req.body.userName,
      Password: req.body.password
    },
    include: [Group]
  }).then(user => {
    if (user !== null) {
      var token = jwt.sign(user.get({ plain: true }), secret, {
        expiresIn: 60 * 60 * 24
      })

      res.json({
        success: true,
        user: JSON.stringify(user.get({ plain: true })),
        token: token
      })
    } else {
      res.json({ success: false, message: 'Authenticate failed. Wrong password' })
    }
  })
})

module.exports.authRouter = authRouter;
