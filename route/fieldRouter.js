const BaseMapLayer = require('../resource/resource').baseMapLayer;
const BaseLayerField = require('../resource/resource').baseLayerField;
const Group = require('../resource/resource').group;
const Op = require('sequelize').Op;
const co = require('co');

const express = require('express')

let fieldRouter = express.Router()


// 根据layerId获取字段
fieldRouter.get('/', (req, res) => {
    if (req.query.layerId)
        BaseMapLayer.findById(req.query.layerId).then(x => x.getBaseLayerFields().then(x => res.send(x))).catch(e => res.send('err' + e))
});



// 添加一个图层的字段信息到数据库（未使用）
fieldRouter.post('/', (req, res) => {
    async function addFields() {
        let fl = await BaseMapLayer.findById(req.body.layerId)
        let fields = await fl.getBaseLayerFields()
        if (fields.length === 0) {
            fields = JSON.parse(req.body.fields);
            fields.forEach((element, index) => {
                let ele = {};
                ele.FieldName = element.name;
                ele.Alias = element.alias;
                ele.DisplayName = element.alias;
                ele.SortCode = index + 1;
                fl.createBaseLayerField(ele);
            });
        }
        return 'ok'
    }
    addFields().then(x => res.send(x)).catch(e => res.send('err' + e))
});


// 修改一个字段
fieldRouter.post('/update', (req, res) => {
    let change = {};
    change[req.body.name] = req.body.value;

    if (req.body.name == 'UnitName') {
        switch (req.body.value) {
            case '0':
                change[req.body.name] = '米';
                break;
            case '1':
                change[req.body.name] = '千米';
                break;
            case '2':
                change[req.body.name] = '平方米';
                break;
            case '3':
                change[req.body.name] = '平方千米';
                break;
            case '4':
                change[req.body.name] = '--';
                break;
        }
    }

    BaseLayerField.update(change, {
        where: {
            id: req.body.pk
        }
    }).then(x => res.send(x)).catch(e => res.send('err'))

});

module.exports.fieldRouter = fieldRouter;
