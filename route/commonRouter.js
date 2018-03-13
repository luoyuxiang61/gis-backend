const Group = require('../resource/resource').group;
const User = require('../resource/resource').user;
const express = require('express');

let commonRouter = express.Router({ caseSensitive: true });

// 登录
commonRouter.post('/login', (req, res) => {
  User.findOne({
    where: {
      UserName: req.body.userName,
      Password: req.body.password
    },
    include: [Group]
  }).then(u => res.send(JSON.stringify(u)))
    .catch(e => res.send('err' + e))
})

module.exports.commonRouter = commonRouter;
