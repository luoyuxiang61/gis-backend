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

    let g = yield Group.findAll({
        where: {
            id: {
                [Op.eq]: 2
            }
        }
    })

    u[0].setGroup(g[0])



}).catch(function (e) {
    console.log(e);
});