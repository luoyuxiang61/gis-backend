const Device = require('../resource/resource').device
const User = require('../resource/resource').user
const Op = require('sequelize').Op
const EventEmitter = require('events').EventEmitter

let deviceRoute = (app) => {

    app.post('/allDevices', (req, res) => {

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


    app.post('/bindUser', (req, res) => {
        async function bindUser() {
            var [user, device] = await Promise.all([User.findById(req.body.userId), Device.findById(req.body.deviceId)])
            device.addUser(user)
            res.send(JSON.stringify({ user, device }))
        }

        bindUser()
    })

    app.post('/changeDevice', (req, res) => {

        res.send(req.body.change)
    })

    app.post('/addDevice', (req, res) => {

        console.log(req.body.newDevice)

        Device.create(req.body.newDevice).then(v => res.send(v))
            .catch(e => res.send(e.toString()))
    })

}

module.exports.deviceRoute = deviceRoute