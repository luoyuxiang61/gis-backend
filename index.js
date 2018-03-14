const layerRouter = require('./route/layerRouter').layerRouter;
const commonRouter = require('./route/commonRouter').commonRouter;
const bookmarkRouter = require('./route/bookmarkRouter').bookmarkRouter
const functionRouter = require('./route/functionRouter').functionRouter
const fieldRouter = require('./route/fieldRouter').fieldRouter;
const otherRouter = require('./route/otherRouter').otherRouter;
const quanxianRouter = require('./route/quanxianRouter').quanxianRouter;
const deviceRouter = require('./route/deviceRouter').deviceRouter
const sequelize = require('./resource/resource').sequelize;

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

app.use('/common', commonRouter)
app.use('/bookmarks', bookmarkRouter)
app.use('/functions', functionRouter)
app.use('/quanxian', quanxianRouter)
app.use(otherRouter)
app.use('/devices', deviceRouter)
app.use('/layers', layerRouter)
app.use('/fields', fieldRouter)



app.listen(3000);
