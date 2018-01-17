const BaseMapLayer = require('../dao/dao').baseMapLayer
const BaseLayerField = require('../dao/dao').baseLayerField
const Group = require('../dao/dao').group
const User = require('../dao/dao').user
const Op = require('sequelize').Op
const co = require('co')

let fieldRoute = function (app) {


    //根据权限组groupId，获取该权限组拥有的所有字段
    app.post('/fieldsForGroup', (req, res) => {

        co(function* () {

            let group = yield Group.find({
                where: {
                    id: {
                        [Op.eq]: req.body.groupId
                    }
                }
            })

            let fieldsForGroup = yield group.getBaseLayerFields()

            res.send(fieldsForGroup)

        }).catch(function (e) {
            console.log(e);
        });
    })


    //根据权限组groupId和图层id获取该图层在该当前权限组下所拥有的字段
    app.post('/fieldsForGroupInLayer', (req, res) => {

        co(function* () {

            let group = yield Group.find({
                where: {
                    id: {
                        [Op.eq]: req.body.groupId
                    }
                }
            })

            let fieldsForGroupInLayer = yield group.getBaseLayerFields({
                where: {
                    BaseMapLayerId: {
                        [Op.eq]: req.body.baseMapLayerId
                    }
                }
            })

            res.send(fieldsForGroupInLayer)

        }).catch(function (e) {
            console.log(e);
        });

    })


    //根据图层ID，获取该图层的所有字段
    app.post('/fieldsInLayer', (req, res) => {

        co(function* () {
            let baseMapLayer = yield BaseMapLayer.find({
                where: {
                    Id: {
                        [Op.eq]: req.body.baseMapLayerId
                    }
                }
            })

            let fieldsInLayer = yield baseMapLayer.getBaseLayerFields()

            res.send(fieldsInLayer)

        }).catch(function (e) {
            console.log(e);
        });

    })


    //添加一个图层的字段信息到数据库
    app.post('/addFields', (req, res) => {

        co(function* () {


            let fl = yield BaseMapLayer.find({
                where: {
                    Id: {
                        [Op.eq]: req.body.id
                    }
                }
            })

            let fields = yield fl.getBaseLayerFields()

            if (fields.length == 0) {
                fields = JSON.parse(req.body.fields)
                fields.forEach((element, index) => {
                    let ele = {}
                    ele.FieldName = element.name;
                    ele.Alias = element.alias;
                    ele.DisplayName = element.alias;
                    ele.SortCode = index + 1;
                    fl.createBaseLayerField(ele)
                });
            }
            res.send('ok')
        }).catch(function (e) {
            console.log(e);
        });



    })

    //根据图层id查询一个要素图层的所有字段
    app.get('/fields', (req, res) => {

        co(function* () {
            let fields = yield BaseLayerField.findAll({
                where: {
                    BaseMapLayerId: {
                        [Op.eq]: req.query.id
                    }
                }
            })
            res.send(fields)
        }).catch(function (e) {
            console.log(e);
        });
    })

    //修改一个字段
    app.post('/updateField', (req, res) => {



        co(function* () {
            let change = {}
            change[req.body.name] = req.body.value

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
                        [Op.eq]: req.body.pk
                    }
                }
            })

            res.send(oneField)
        }).catch(function (e) {
            console.log(e);
            res.send('err')
        });

    })



}

module.exports.fieldRoute = fieldRoute