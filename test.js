let User = require('./db').user
let Group = require('./db').group
let md5 = require('blueimp-md5')
let co = require('co')
let Op = require('sequelize').Op


co(function* () {
    let users = yield User.findAll({
        include: [Group]
    })



    console.log(JSON.stringify(users));


    let group = yield Group.find({
        where: {
            name: {
                [Op.eq]: '部门1领导组'
            }
        }
    })






}).catch(function (e) {
    console.log(e);
});




console.log(md5('admin'))