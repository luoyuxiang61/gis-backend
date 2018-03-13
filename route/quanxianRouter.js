const Fun = require('../resource/resource').fun
const BaseMapLayer = require('../resource/resource').baseMapLayer;
const BaseLayerField = require('../resource/resource').baseLayerField;
const Group = require('../resource/resource').group;
const User = require('../resource/resource').user;
const Bookmark = require('../resource/resource').bookmark;
const Department = require('../resource/resource').department;
const Op = require('sequelize').Op;



const express = require('express')
let quanxianRouter = express.Router()


quanxianRouter.get('/departmentsForTree', (req, res) => {
    async function departmentsForTree() {
        let departmentsForTree = []
        let depas = await Department.findAll()
        for (depa of depas) {
            let item = {}
            item.depa = depa
            item.grps = await depa.getGroups()
            departmentsForTree.push(item)
        }
        return departmentsForTree
    }

    departmentsForTree().then(x => res.send(x)).catch(e => res.send('err' + e))
});


// 获取一个部门的所有权限组
quanxianRouter.post('/grpsInDepa', (req, res) => {
    Department.findById(req.body.depaId).then(depa => {
        depa.getGroups().then(grps => res.send(grps)).catch(e => res.send('err'))
    }).catch(e => res.send('err'))
})

//添加权限组
quanxianRouter.post('/addGroup', (req, res) => {
    async function addGroup(grp) {
        let [depa, layers, fields, funs] = await Promise.all([
            Department.findById(grp.nDepaId),
            BaseMapLayer.findAll({ where: { id: { [Op.in]: grp.nLayers } } }),
            BaseLayerField.findAll({ where: { id: { [Op.in]: grp.nFields } } }),
            Fun.findAll({ where: { id: { [Op.in]: grp.nFunctions } } })
        ])

        let grp0 = await depa.createGroup({ name: grp.name })

        await Promise.all([
            grp0.setBaseLayerFields(fields),
            grp0.setBaseMapLayers(layers),
            grp0.setFun(funs)
        ])

        return 'ok'
    }

    addGroup(JSON.parse(req.body.newGrp)).then(x => res.send(x)).catch(e => res.send('err' + e))

})

//删除权限组
quanxianRouter.post('/deleteGroup', (req, res) => {
    Group.findById(req.body.grpId).then(grp => {
        grp.destroy().then(x => res.send('ok')).catch(e => res.send('err' + e))
        grp.getUsers().then(users => {
            if (users.length >= 1) {
                for (let u of users) {
                    u.destroy()
                }
            }
        })
    })
})

//修改权限组
quanxianRouter.post('/updateGroup', (req, res) => {
    let changedGrp = JSON.parse(req.body.newGrp)
    async function updateGroup(changedGrp) {
        let [grp, layers, fields, funs] = await Promise.all([
            Group.findById(changedGrp.id),
            BaseMapLayer.findAll({ where: { id: { [Op.in]: changedGrp.nLayers } } }),
            BaseLayerField.findAll({ where: { id: { [Op.in]: changedGrp.nFields } } }),
            Fun.findAll({ where: { id: { [Op.in]: changedGrp.nFunctions } } })
        ])

        await Promise.all([
            grp.update({ name: changedGrp.name }),
            grp.setBaseMapLayers(layers),
            grp.setBaseLayerFields(fields),
            grp.setFun(funs)
        ])
        return await Promise.resolve('ok')
    }

    updateGroup(changedGrp).then(x => res.send('ok')).catch(e => res.send('err' + e))
})


//获取一个权限组拥有的图层、字段、功能
quanxianRouter.post('/quanxianForGroup', (req, res) => {
    async function quanxianForGroup(grpId) {
        let grp = await Group.findById(req.body.grpId)
        let [layers, fields, functions] = await Promise.all([
            grp.getBaseMapLayers(),
            grp.getBaseLayerFields(),
            grp.getFun()
        ])
        return JSON.stringify({ layers, fields, functions })
    }

    quanxianForGroup(req.body.grpId).then(x => res.send(x)).catch(e => res.send('err' + e))
})




//添加用户
quanxianRouter.post('/addUser', (req, res) => {
    let user = {};
    user.UserName = req.body.userName;
    user.Password = req.body.password;

    Group.findById(req.body.grpId).then(x => {
        x.createUser(user).then(x => res.send('ok')).catch(e => res.send('err' + e))
    })
});

//删除用户
quanxianRouter.post('/deleteUser', (req, res) => {
    User.findById(req.body.userId).then(user => user.destroy().then(x => res.send('ok')).catch(e => res.send('err' + e)))
})

//修改用户
quanxianRouter.post('/editUser', (req, res) => {
    User.findById(req.body.userId).then(user => user.update(JSON.parse(req.body.change)).then(x => res.send('ok')).catch(e => res.send('err' + e)))
})


//获取一个部门的所有用户
quanxianRouter.post('/usersInDepa', (req, res) => {
    let usersInDepa = []

    Department.findById(req.body.depaId).then(x => {
        x.getGroups().then(grps => {
            let grpIds = []
            grps.forEach(grp => grpIds.push(grp.id))

            User.findAll({
                where: {
                    GroupId: {
                        [Op.in]: grpIds
                    }
                }
            }).then(users => res.send(users))
                .catch(e => res.send('err'))
        }).catch(e => res.send('err'))
    }).catch(e => res.send('err'))
})


//获取一个权限组的所有用户
quanxianRouter.post('/usersInGroup', (req, res) => {
    Group.findById(req.body.grpId).then(grp => {
        grp.getUsers().then(users => res.send(users)).catch(e => res.send('err'))
    }).catch(e => res.send('err'))
})

//删除一个部门
quanxianRouter.post('/deleteDepa', (req, res) => {
    Department.findById(req.body.depaId).then(depa => depa.destroy().then(x => res.send('ok')).catch(e => res.send('err' + e)))
})

// 添加一个部门
quanxianRouter.post('/addDepa', (req, res) => {
    Department.create({ name: req.body.depaName }).then(x => res.send('ok')).catch(e => res.send('err' + e))
})

// 修改一个部门
quanxianRouter.post('/editDepa', (req, res) => {
    Department.findById(req.body.depaId).then(depa => {
        depa.update({ name: req.body.depaName }).then(x => res.send('ok')).catch(e => res.send('err' + e))
    })
})




module.exports.quanxianRouter = quanxianRouter;
