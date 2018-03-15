const layerRouter = require('./route/layerRouter').layerRouter;
const authRouter = require('./route/authRouter').authRouter;
const bookmarkRouter = require('./route/bookmarkRouter').bookmarkRouter
const functionRouter = require('./route/functionRouter').functionRouter
const fieldRouter = require('./route/fieldRouter').fieldRouter;
const otherRouter = require('./route/otherRouter').otherRouter;
const quanxianRouter = require('./route/quanxianRouter').quanxianRouter;
const deviceRouter = require('./route/deviceRouter').deviceRouter

const sequelize = require('./resource/resource').sequelize;
const User = require('./resource/resource').user;
const jwt = require('jsonwebtoken')
const secret = require('./config').secret

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.set('secret', secret)

app.use(urlencodedParser);
app.use(bodyParser.json());

// 静态资源
app.use(express.static(__dirname + '/static'));

// 开启跨域
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
})

// 登录/授权
app.use('/auth', authRouter)

app.use(otherRouter)



//验证token
app.use(function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, app.get('secret'), function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
})
app.use('/bookmarks', bookmarkRouter)
app.use('/functions', functionRouter)
app.use('/quanxian', quanxianRouter)
app.use('/devices', deviceRouter)
app.use('/layers', layerRouter)
app.use('/fields', fieldRouter)





app.listen(3000);
