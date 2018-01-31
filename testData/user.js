let User = require('../resource/resource').user;
let md5 = require('blueimp-md5');

co(function* () {
    yield User.create({
        UserName: md5('admin'),
        Password: md5('666666'),
    });

    yield User.create({
        UserName: md5('luoyx'),
        Password: md5('666666'),
    });
}).catch(function(e) {
    console.log(e);
});
