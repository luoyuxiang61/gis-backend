let http = require('http');

let req = http.request({
    hostname: 'localhost',
    port: 3000,
    path: '/layer/featureLayers',
    method: 'GET',
}, (res) => {
    let data = '';

    res.on('data', function(chunk) {
        data += chunk;
    });

    res.on('end', function() {
        console.log(data.toString());
    });
});

req.end();


