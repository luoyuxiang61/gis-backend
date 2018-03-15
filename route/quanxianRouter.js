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


quanxianRouter.get('/departments', (req, res) => {
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
quanxianRouter.get('/groups', (req, res) => {
    Department.findById(req.query.depaId).then(x => x.getGroups()).then(x => res.send(x)).catch(e => res.send('err' + e))
})


//添加权限组
quanxianRouter.post('/groups', (req, res) => {
    async function addGroup(grp) {
        let [depa, layers, fields, funs] = await Promise.all([
            Department.findById(grp.nDepaId),
            BaseMapLayer.findAll({ where: { id: { [Op.in]: grp.nLayers } } }),
            BaseLayerField.findAll({ where: { id: { [Op.in]: grp.nFields } } }),
            Fun.findAll({ where: { id: { [Op.in]: grp.nFunctions } } })
        ])
        let g = await depa.createGroup({ name: grp.name })
        await Promise.all([
            g.setBaseLayerFields(fields),
            g.setBaseMapLayers(layers),
            g.setFun(funs)
        ])
        return 'ok'
    }
    addGroup(JSON.parse(req.body.newGrp)).then(x => res.send(x)).catch(e => res.send('err' + e))
})



//删除权限组
quanxianRouter.delete('/groups/:id', (req, res) => {
    Group.findById(req.params.id).then(grp => {
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
quanxianRouter.put('/groups/:id', (req, res) => {
    let changedGrp = JSON.parse(req.body.newGrp)
    async function updateGroup(changedGrp, grpId) {
        let [grp, layers, fields, funs] = await Promise.all([
            Group.findById(grpId),
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

    updateGroup(changedGrp, req.params.id).then(x => res.send(x)).catch(e => res.send('err' + e))
})


//获取一个权限组拥有的图层、字段、功能
quanxianRouter.get('/', (req, res) => {
    async function quanxianForGroup(grpId) {
        let grp = await Group.findById(grpId)
        let [layers, fields, functions] = await Promise.all([
            grp.getBaseMapLayers(),
            grp.getBaseLayerFields(),
            grp.getFun()
        ])
        return JSON.stringify({ layers, fields, functions })
    }

    quanxianForGroup(req.query.groupId).then(x => res.send(x)).catch(e => res.send('err' + e))
})




//添加用户
quanxianRouter.post('/users', (req, res) => {
    let user = {};
    user.UserName = req.body.userName;
    user.Password = req.body.password;

    Group.findById(req.body.grpId).then(x => x.createUser(user)).then(x => res.send('ok')).catch(e => res.send('err' + e))
});

//删除用户
quanxianRouter.delete('/users/:id', (req, res) => {
    User.findById(req.params.id).then(x => x.destroy()).then(x => res.send('ok')).catch(e => res.send('err' + e))
})

//修改用户
quanxianRouter.put('/users/:id', (req, res) => {
    User.findById(req.params.id).then(x => x.update(JSON.parse(req.body.change))).then(x => res.send('ok')).catch(e => res.send('err' + e))
})


//获取一个部门或权限组的所有用户
quanxianRouter.get('/users', (req, res) => {
    if (req.query.depaId !== undefined) {
        let usersInDepa = []
        Department.findById(req.query.depaId)
            .then(x => x.getGroups())
            .then(x => User.findAll({
                where: {
                    GroupId: {
                        [Op.in]: x.map(x => x.id)
                    }
                },
                include: [Group]
            }))
            .then(x => res.send(x))
    }
    else if (req.query.groupId !== undefined) {
        Group.findById(req.query.groupId).then(x => x.getUsers({ include: [Group] })).then(x => res.send(x))
    }
    else {
        User.findAll().then(x => res.send(x))
    }
})


//删除一个部门
quanxianRouter.delete('/departments/:id', (req, res) => {
    Department.findById(req.params.id).then(x => x.destroy()).then(x => res.send('ok')).catch(e => res.send('err' + e))
})

// 添加一个部门
quanxianRouter.post('/departments', (req, res) => {
    Department.create({ name: req.body.depaName }).then(x => res.send('ok')).catch(e => res.send('err' + e))
})

// 修改一个部门
quanxianRouter.put('/departments/:id', (req, res) => {
    Department.findById(req.params.id)
        .then(x => x.update({ name: req.body.depaName }))
        .then(x => res.send('ok'))
        .catch(e => res.send('err' + e))
})




module.exports.quanxianRouter = quanxianRouter;
