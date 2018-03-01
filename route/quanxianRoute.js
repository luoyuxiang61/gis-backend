const BaseMapLayer = require('../resource/resource').baseMapLayer;
const BaseLayerField = require('../resource/resource').baseLayerField;
const Group = require('../resource/resource').group;
const User = require('../resource/resource').user;
const Bookmark = require('../resource/resource').bookmark;
const Department = require('../resource/resource').department;
const Op = require('sequelize').Op;
const co = require('co');

let quanxianRoute = function (app) {
    app.get('/departmentsForTree', (req, res) => {
        co(function* () {
            let departmentsForTree = [];

            let depas = yield Department.findAll();
            let grps = yield Group.findAll();

            depas.forEach((depa) => {
                let item = {};
                item.grps = [];

                item.depa = depa;
                grps.forEach((grp) => {
                    if (grp.DepartmentId == depa.id) item.grps.push(grp);
                });

                departmentsForTree.push(item);
            });

            res.send(departmentsForTree);
        }).catch(function (e) {
            console.log(e);
        });
    });


    // 获取一个部门的所有权限组
    app.post('/grpsInDepa', (req, res) => {
        Department.findById(req.body.depaId).then(depa => {
            depa.getGroups().then(grps => res.send(grps)).catch(e => res.send('err'))
        }).catch(e => res.send('err'))
    })

    //添加权限组
    app.post('/addGroup', (req, res) => {
        let grp = JSON.parse(req.body.newGrp)
        let depa = Department.findById(grp.nDepaId)
        depa.then(x => {
            console.log('depa', x)
            x.createGroup({ name: grp.name }).then(grp0 => {
                BaseMapLayer.findAll({
                    where: {
                        id: {
                            [Op.in]: grp.nLayers
                        }
                    }
                }).then(x => {
                    grp0.setBaseMapLayers(x).then(x => res.send('ok'))
                        .catch(e => res.send('err'))
                }).catch(e => res.send('err'))
            }).catch(e => res.send('err'))
        }).catch(e => res.send('err'))
    })

    //删除权限组
    app.post('/deleteGroup', (req, res) => {
        Group.findById(req.body.grpId).then(grp => grp.destroy().then(x => res.send(x)).catch(e => res.send('err'))).catch(e => res.send('err'))
    })

    //修改权限组
    app.post('/editGroup', (req, res) => {
        Group.findById(req.body.grpId).then(grp => grp.update(req.body.change).then(x => res.send(x)).catch(e => res.send('err'))).catch(e => res.send('err'))
    })

    //添加用户
    app.post('/addUser', (req, res) => {
        let user = {};
        user.UserName = req.body.userName;
        user.Password = req.body.password;

        let grp = Group.findById(req.body.grpId)
        grp.then(x => {
            x.createUser(user).then(x => res.send(x)).catch(e => res.send('err'))
        }).catch(e => res.send('err'))
    });

    //删除用户
    app.post('/deleteUser', (req, res) => {
        User.findById(req.body.userId).then(user => user.destroy().then(x => res.send(x)).catch(e => res.send('err'))).catch(e => res.send('err'))
    })

    //修改用户
    app.post('/editUser', (req, res) => {
        User.findById(req.body.userId).then(user => user.update(JSON.parse(req.body.change)).then(x => res.send(x)).catch(e => res.send('err'))).catch(e => res.send('err'))
    })


    //获取一个部门的所有用户
    app.post('/usersInDepa', (req, res) => {
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
    app.post('/usersInGroup', (req, res) => {
        Group.findById(req.body.grpId).then(grp => {
            grp.getUsers().then(users => res.send(users)).catch(e => res.send('err'))
        }).catch(e => res.send('err'))
    })

};


module.exports.quanxianRoute = quanxianRoute;
