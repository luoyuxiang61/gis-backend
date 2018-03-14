const Device = require('../resource/resource').device
const User = require('../resource/resource').user


const express = require('express')
let deviceRouter = express.Router()


deviceRouter.get('/', (req, res) => {
    let { os, type } = req.query
    if (os !== 'undefined') {
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


deviceRouter.post('/:id/users/', (req, res) => {
    async function bindUser() {
        let [user, device] = await Promise.all([User.findById(req.body.userId), Device.findById(req.params.id)])
        await device.addUser(user)
        return 'ok'
    }
    bindUser().then(x => res.send(x)).catch(e => res.send('err' + e))
})


deviceRouter.put('/:id', (req, res) => {
    Device.update(req.body.change, {
        where: {
            id: req.params.id
        }
    }).then(x => res.send('ok'))
})

deviceRouter.post('/', (req, res) => {
    Device.create(req.body.newDevice).then(v => res.send('ok'))
        .catch(e => res.send('err' + e))
})



module.exports.deviceRouter = deviceRouter