const BaseMapLayer = require('../dao/db').baseMapLayer
const BaseLayerField = require('../dao/db').baseLayerField
const Group = require('../dao/db').group
const User = require('../dao/db').user
const Bookmark = require('../dao/db').bookmark
const Op = require('sequelize').Op
const co = require('co')

let commonRoute = function (app) {
  //对所有的请求开启跨域访问
  app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });


  //登录
  app.post('/login', (req, res) => {

    co(function* () {
      let user = yield User.find({
        where: {
          UserName: {
            [Op.eq]: req.body.userName
          },
          Password: {
            [Op.eq]: req.body.password
          }
        },
        include: [Group]
      })

      res.send(JSON.stringify(user))


    }).catch(function (e) {
      console.log(e);
    });

  })


  //新建用户
  app.post('/register', (req, res) => {
    let user = {}
    user.UserName = req.body.userName
    user.Password = req.body.password

    User.create(user)
    res.send('ok')
  })


  //增加书签
  app.post('/addBookmark', (req, res) => {

    let mark = req.body
    mark.wkid = parseInt(mark.wkid)
    mark.xmin = parseFloat(mark.xmin)
    mark.ymin = parseFloat(mark.ymin)
    mark.xmax = parseFloat(mark.xmax)
    mark.ymax = parseFloat(mark.ymax)

    co(function* () {
      let bookmark = yield Bookmark.create(mark)

      res.send(bookmark)

    }).catch(function (e) {
      console.log(e);
    });

  })


  //获取某用户的所有书签
  app.get('/bookmarks', (req, res) => {

    console.log(req.query.userId);

    co(function* () {
      let bookmarks = yield Bookmark.findAll()

      res.send(bookmarks)

    }).catch(function (e) {
      console.log(e);
    });

  })

}

module.exports.commonRoute = commonRoute