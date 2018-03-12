const Device = require('../resource/resource').device
const User = require('../resource/resource').user
const Op = require('sequelize').Op
const EventEmitter = require('events').EventEmitter

let deviceRoute = (app) => {

    app.get('/allDevices', (req, res) => {
        Device.findAll({
            include: [User]
        }).then(devices => res.send(devices))

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

        Device.create({
            uuid: 'advcjnhklwcjkwhdlciasdc',
            deviceType: 0,
            model: 'NOKIA 6',
            os: 'Android',
            osVersion: '8.0.1',
            online: 1,
            offline: 0
        }).then(v => res.send(v))
            .catch(e => res.send(e.toString()))
    })

}

module.exports.deviceRoute = deviceRoute