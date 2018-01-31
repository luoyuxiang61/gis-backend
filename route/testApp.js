let app = require('express')();
let layerRouter = require('./layerRouter');

app.use('/test', layerRouter);

app.get('/', (req, res) => {
    res.send('1111111111111111111');
});

app.listen(3000);
