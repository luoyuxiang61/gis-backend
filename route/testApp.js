let app = require('express')();
let layerRouter = require('./layerRouter');
let bodyParserJson = require('body-parser').json();

app.use(bodyParserJson);
app.use('/layer', layerRouter);

app.get('/', (req, res) => {
    res.send('1111111111111111111');
});

app.listen(3000);
