const BaseMapLayer = require('../resource/resource').baseMapLayer;
const BaseLayerField = require('../resource/resource').baseLayerField;
const Group = require('../resource/resource').group;
const Op = require('sequelize').Op;
const co = require('co');

const express = require('express')

let fieldRouter = express.Router()


// 根据权限组groupId，获取该权限组拥有的所有字段
fieldRouter.post('/fieldsForGroup', (req, res) => {
    Group.findById(req.body.groupId).then(x => x.getBaseLayerFields().then(f => res.send(f)))
});

// 根据图层ID，获取该图层的所有字段
fieldRouter.post('/fieldsInLayer', (req, res) => {
    BaseMapLayer.findById(req.body.baseMapLayerId).then(x => x.getBaseLayerFields().then(x => res.send(x)))
});


// 添加一个图层的字段信息到数据库
fieldRouter.post('/addFields', (req, res) => {
    async function addFields() {
        let fl = await BaseMapLayer.findById(req.body.id)
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

// 根据图层id查询一个要素图层的所有字段
fieldRouter.get('/fields', (req, res) => {
    co(function* () {
        let fields = yield BaseLayerField.findAll({
            where: {
                BaseMapLayerId: {
                    [Op.eq]: req.query.id,
                },
            },
        });
        res.send(fields);
    }).catch(function (e) {
        console.log(e);
    });
});

// 修改一个字段
fieldRouter.post('/updateField', (req, res) => {
    co(function* () {
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

        let oneField = yield BaseLayerField.update(change, {
            where: {
                id: {
                    [Op.eq]: req.body.pk,
                },
            },
        });

        res.send(oneField);
    }).catch(function (e) {
        console.log(e);
        res.send('err');
    });
});

module.exports.fieldRouter = fieldRouter;
