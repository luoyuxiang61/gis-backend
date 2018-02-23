const Group = require('../resource/resource').group;
const User = require('../resource/resource').user;
const Bookmark = require('../resource/resource').bookmark;
const Op = require('sequelize').Op;
const co = require('co');

let commonRoute = function (app) {
  // 对所有的请求开启跨域访问
  app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });


  // 登录
  app.post('/login', (req, res) => {
    co(function* () {
      let user = yield User.find({
        where: {
          UserName: {
            [Op.eq]: req.body.userName,
          },
          Password: {
            [Op.eq]: req.body.password,
          },
        },
        include: [Group],
      });

      res.send(JSON.stringify(user));
    }).catch(function (e) {
      console.log(e);
    });
  });



  // 增加书签
  app.post('/addBookmark', (req, res) => {
    let mark = req.body;
    mark.wkid = parseInt(mark.wkid);
    mark.xmin = parseFloat(mark.xmin);
    mark.ymin = parseFloat(mark.ymin);
    mark.xmax = parseFloat(mark.xmax);
    mark.ymax = parseFloat(mark.ymax);

    let userId = req.body.userId;

    co(function* () {
      let user = yield User.find({
        where: {
          id: {
            [Op.eq]: userId,
          },
        },
      });

      let bookmark = yield user.createBookmark(mark);

      res.send(bookmark);
    }).catch(function (e) {
      console.log(e);
    });
  });


  // 获取某用户的所有书签
  app.post('/bookmarks', (req, res) => {
    co(function* () {
      let user = yield User.find({
        where: {
          id: {
            [Op.eq]: req.body.userId,
          },
        },
      });
      let bookmarks = yield user.getBookmarks();

      res.send(bookmarks);
    }).catch(function (e) {
      console.log(e);
    });
  });

  // 删除书签
  app.post('/removeBookmark', (req, res) => {
    co(function* () {
      let bookmark = yield Bookmark.find({
        where: {
          id: {
            [Op.eq]: req.body.bookmarkId,
          },
        },
      });

      let user = yield User.find({
        where: {
          id: {
            [Op.eq]: req.body.userId,
          },
        },
      });

      user.removeBookmark(bookmark);
      res.send('ok');
    }).catch(function (e) {
      console.log(e);
    });
  });


  // 修改书签名
  app.post('/editBookmark', (req, res) => {
    co(function* () {
      let bookmark = yield Bookmark.find({
        where: {
          id: {
            [Op.eq]: req.body.bookmarkId,
          },
        },
      });

      let change = { name: req.body.newName };

      yield bookmark.update(change);

      res.send('ok');
    }).catch(function (e) {
      console.log(e);
    });
  });
};

module.exports.commonRoute = commonRoute;
