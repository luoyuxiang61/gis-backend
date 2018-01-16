let User = require('../db').user
let Group = require('../db').group
let Department = require('../db').department
let md5 = require('blueimp-md5')
let co = require('co')
let Op = require('sequelize').Op


co(function* () {

    // for (let i = 0; i < 10; i++) {
    //     Department.create({
    //         name: '部门' + i
    //     })
    // }




    // let bms = yield Department.findAll()

    // bms.forEach(element => {
    //     for (let i = 0; i < 4; i++) {
    //         element.createGroup({ name: "权限组" + i })
    //     }
    // });

    let bm = yield Department.find({ where: { id: { [Op.eq]: 1 } } })

    let grp = yield Group.find({ where: { id: { [Op.eq]: 1 } } })

    console.log(grp);
    bm.addGroup(grp)
    // console.log(bm);


}).catch(function (e) {
    console.log(e);
});