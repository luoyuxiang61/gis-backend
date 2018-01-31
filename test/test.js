let http = require('http');
let assert = require('assert');


describe('*********layerRouter*********', function() {
    describe('#add', function() {
        it('should add a layer', function(done) {
            http.get({
                hostname: 'localhost',
                port: 3000,
                path: '/layer/1447',
                agent: false,
            }, (res) => {
                let data = '';
                res.on('data', function(chunk) {
                    data += chunk;
                }).on('end', function() {
                    assert.notEqual(JSON.parse(data).id, undefined);
                    done(); // 一定要加个done
                });
            });
        });
    });


    describe('#query', function() {
        it('should give me a layer', function(done) {
            const options = {
                hostname: 'localhost',
                port: 3000,
                path: '/layer/1447',
                method: 'GET',
            };


            http.request( options, (res) => {
                let data = '';
                res.on('data', function(chunk) {
                    console.log(chunk)
                    data += chunk;
                }).on('end', function() {
                    assert.notEqual(JSON.parse(data).id, undefined);
                    done(); // 一定要加个done
                });
            });
        });
    });
});
