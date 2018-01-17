let User = require('../dao/dao').user
let Group = require('../dao/dao').group
let Department = require('../dao/dao').department
let md5 = require('blueimp-md5')
let co = require('co')
let Op = require('sequelize').Op


co(function* () {
    let u = yield User.create({
        UserName: md5('admin'),
        Password: md5('666666')
    })

    let u1 = yield User.create({
        UserName: md5('luoyx'),
        Password: md5('666666')
    })

}).catch(function (e) {
    console.log(e);
});