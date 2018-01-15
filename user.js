let User = require('./db').user
let Group = require('./db').group
let Department = require('./db').department
let md5 = require('blueimp-md5')
let co = require('co')
let Op = require('sequelize').Op


co(function* () {
    let u = yield User.create({
        UserName: md5('admin'),
        Password: md5('666666')
    })





}).catch(function (e) {
    console.log(e);
});