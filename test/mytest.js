let http = require('http');

http.get({
    hostname: 'localhost',
    port: 3000,
    path: '/layer/featureLayers',
}, (res) => {
    let data = '';

    res.on('data', function(chunk) {
        data += chunk;
    });

    res.on('end', function() {
        console.log(data.toString());
    });
});
