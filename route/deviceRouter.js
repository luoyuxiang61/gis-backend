const Device = require('../resource/resource').device
const User = require('../resource/resource').user


const express = require('express')
let deviceRouter = express.Router()


deviceRouter.post('/allDevices', (req, res) => {
    let { os, type } = req.body
    if (os) {
        Device.findAll({
            where: {
                deviceType: type,
                os: os
            },
            include: [User]
        }).then(devices => res.send(devices))
    } else {
        Device.findAll({
            include: [User]
        }).then(devices => res.send(devices))
    }
})


deviceRouter.post('/bindUser', (req, res) => {
    async function bindUser() {
        let [user, device] = await Promise.all([User.findById(req.body.userId), Device.findById(req.body.deviceId)])
        device.addUser(user)
        res.send(JSON.stringify({ user, device }))
    }

    bindUser()
})

deviceRouter.post('/changeDevice', (req, res) => {
    res.send(req.body.change)
})

deviceRouter.post('/addDevice', (req, res) => {
    Device.create(req.body.newDevice).then(v => res.send('ok'))
        .catch(e => res.send('err' + e))
})



module.exports.deviceRouter = deviceRouter