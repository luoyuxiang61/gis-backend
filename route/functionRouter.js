const Fun = require('../resource/resource').fun;
const Group = require('../resource/resource').group;

const express = require('express')
let functionRouter = express.Router()

// 添加功能
functionRouter.post('/addFun', (req, res) => {
    Fun.create({ name: req.body.funName }).then((x) => res.send('ok')).catch(e => res.send('err' + e))
})

// 所有功能
functionRouter.get('/allFunctions', (req, res) => {
    Fun.findAll().then(x => res.send(x)).catch(e => res.send('err' + e))
})

module.exports.functionRouter = functionRouter