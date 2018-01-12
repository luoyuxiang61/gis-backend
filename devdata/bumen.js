let User = require('../db').user
let Group = require('../db').group
let Department = require('../db').department
let md5 = require('blueimp-md5')
let co = require('co')
let Op = require('sequelize').Op


co(function* () {
    let bms = yield Department.findAll()

    bms.forEach(element => {
        for (let i = 0; i < 4; i++) {
            element.createGroup({ name: "权限组" + i })
        }
    });


}).catch(function (e) {
    console.log(e);
});