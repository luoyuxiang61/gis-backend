let User = require('../dao/dao').user;
let Group = require('../dao/dao').group;
let Department = require('../dao/dao').department;
let md5 = require('blueimp-md5');
let co = require('co');
let Op = require('sequelize').Op;


co(function* () {


    // 新建10个部门
    // for (let i = 0; i < 10; i++) {
    //     Department.create({
    //         name: '部门' + i
    //     })
    // }


    // 10个部门分别新建自己的4个权限组
    // let bms = yield Department.findAll()
    // bms.forEach(element => {
    //     for (let i = 0; i < 4; i++) {
    //         element.createGroup({ name: "权限组" + i })
    //     }
    // });


    // 给用户分配第一个权限组
    // let u = yield User.findAll()

    // let g = yield Group.findAll()

    // g = g[0]

    // u.forEach(element => {
    //     element.setGroup(g)
    // });


}).catch(function(e) {
    console.log(e);
});
