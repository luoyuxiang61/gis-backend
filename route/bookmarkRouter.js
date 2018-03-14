const User = require('../resource/resource').user;
const Bookmark = require('../resource/resource').bookmark;

const express = require('express');
let bookmarkRouter = express.Router({ caseSensitive: true });

// 增加书签
bookmarkRouter.post('/', (req, res) => {
    let mark = JSON.parse(req.body.mark)
    for (let i of Object.keys(mark)) {
        mark[i] = i === 'wkid' ? parseInt(mark[i]) : parseFloat(mark[i])
    }
    mark.name = req.body.name
    User.findById(req.body.userId).then(x => x.createBookmark(mark)).then(x => res.send('ok')).catch(e => res.send('err' + e))
})

// 获取用户所有书签
bookmarkRouter.get('/', (req, res) => {
    User.findById(req.query.userId).then(u => u.getBookmarks()).then(x => res.send(x)).catch(e => res.send('err' + e))
})

// 删除书签
bookmarkRouter.delete('/:id', (req, res) => {
    Bookmark.findById(req.params.id).then(x => x.destroy()).then(x => res.send('ok')).catch(e => res.send('err' + e))
})

// 修改书签名
bookmarkRouter.put('/:id', (req, res) => {
    Bookmark.findById(req.params.id).then(x => x.update({ name: req.body.newName })).then(x => res.send('ok')).catch(e => res.send('err' + e))
})

module.exports.bookmarkRouter = bookmarkRouter;