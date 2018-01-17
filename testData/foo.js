let User = require('../db').user
let Group = require('../db').group
let Department = require('../db').department
let md5 = require('blueimp-md5')
let co = require('co')
let Op = require('sequelize').Op


co(function* () {
    let u = yield User.findAll({
        where: {
            id: {
                [Op.eq]: 1
            }
        }
    })

    let g = yield Group.create({
        name: '权限组1'
    })

    u[0].setGroup(g)



}).catch(function (e) {
    console.log(e);
});