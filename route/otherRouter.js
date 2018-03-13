const express = require('express')
let otherRouter = express.Router()


// 表格编辑需要的数据源
otherRouter.get('/yesno', function (req, res) {
    res.send(JSON.stringify([{
        value: 1,
        text: '是',
    },
    {
        value: 0,
        text: '--',
    },
    ]));
});

otherRouter.get('/layerType', (req, res) => {
    res.send(JSON.stringify([{
        value: 0,
        text: 'GroupLayer',
    },
    {
        value: 1,
        text: 'TiledService',
    },
    {
        value: 2,
        text: 'FeatureLayer',
    },
    {
        value: 3,
        text: 'GeometryService',
    },
    ]));
});

otherRouter.get('/unitName', (req, res) => {
    res.send(JSON.stringify([{
        value: 0,
        text: '米',
    },
    {
        value: 1,
        text: '千米',
    },
    {
        value: 2,
        text: '平方米',
    },
    {
        value: 3,
        text: '平方千米',
    },
    {
        value: 4,
        text: '--',
    },
    ]));
});


module.exports.otherRouter = otherRouter;
