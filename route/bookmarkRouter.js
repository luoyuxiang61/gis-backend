const User = require('../resource/resource').user;
const Bookmark = require('../resource/resource').bookmark;

const express = require('express');
let bookmarkRouter = express.Router({ caseSensitive: true });

// 增加书签
bookmarkRouter.post('/addBookmark', (req, res) => {
    let mark = JSON.parse(req.body.mark)
    for (let i of Object.keys(mark)) {
        mark[i] = i === 'wkid' ? parseInt(mark[i]) : parseFloat(mark[i])
    }
    mark.name = req.body.name
    User.findById(req.body.userId).then(user => user.createBookmark(mark).then(() => res.send('ok')))
})

// 获取用户所有书签
bookmarkRouter.post('/bookmarks', (req, res) => {
    User.findById(req.body.userId).then(user => user.getBookmarks().then(bookmarks => res.send(bookmarks)))
})

// 删除书签
bookmarkRouter.post('/removeBookmark', (req, res) => {
    async function removeBookmark({ userId, bookmarkId }) {
        let [u, b] = await Promise.all([User.findById(userId), Bookmark.findById(bookmarkId)])
        await u.removeBookmark(b)
        return Promise.resolve('ok')
    }
    removeBookmark(req.body).then(x => res.send(x)).catch(e => res.send('err' + e))
})

// 修改书签名
bookmarkRouter.post('/editBookmark', (req, res) => {
    Bookmark.findById(req.body.bookmarkId).then(b => b.update({ name: req.body.newName }).then(x => res.send('ok')).catch(e => res.send('err' + e)))
})

module.exports.bookmarkRouter = bookmarkRouter;