const BaseMapLayer = require('../resource/resource').baseMapLayer;
const Group = require('../resource/resource').group;
const Op = require('sequelize').Op;
const express = require('express');
let layerRouter = express.Router({ caseSensitive: true });

// 根据groupId获取该权限组拥有的所有图层
layerRouter.post('/layersForGroup', (req, res) => {
    let fun = async function (groupId) {
        let grp = await Group.findById(groupId);
        let layers = await grp.getBaseMapLayers();
        let fathers = layers.filter((element) => element.ParentId === 0);
        let layersForGroup = [];
        fathers.forEach((element) => {
            layersForGroup.push({
                father: element,
                sons: layers.filter((lyr) => lyr.ParentId === element.id),
            });
        });
        return layersForGroup;
    };

    fun(req.body.groupId).then((value) => res.send(JSON.stringify(value)))
        .catch((err) => res.send(err.toString()));
});


// 获取所有要素图层
layerRouter.get('/featureLayers', (req, res) => {
    BaseMapLayer.findAll({
        where: {
            LayerType: {
                [Op.eq]: 'FeatureLayer',
            },
        },
    }).then((value) => res.send(JSON.stringify(value)))
        .catch((err) => res.send(err.toString()));
});


// 获取所有图层(树状图）
layerRouter.get('/layersForTree', (req, res) => {
    let fun = async function () {
        let lyrs = await BaseMapLayer.findAll();
        let fathers = lyrs.filter((element) => element.ParentId === 0);
        let layersForTree = [];
        fathers.forEach((element) => {
            layersForTree.push({
                father: element,
                sons: lyrs.filter((lyr) => lyr.ParentId === element.id),
            });
        });
        return layersForTree;
    };

    fun().then((value) => res.send(JSON.stringify(value)))
        .catch((err) => res.send(err.toString()));
});


/* 增删改查*/
//  增加一个新图层
layerRouter.post('/', (req, res) => {
    console.log(req.body);
    BaseMapLayer.create(req.body)
        .then((value) => res.send(JSON.stringify(value)))
        .catch((err) => res.send(err.toString()));
});


// 根据id删除一个图层
layerRouter.delete('/:id', (req, res) => {
    BaseMapLayer.destroy({
        where: {
            id: {
                [Op.eq]: req.params.id,
            },
        },
    }).then((value) => res.send(JSON.stringify(value)))
        .catch((err) => res.send(err.toString()));
});


// 根据id和要修改的内容,修改一个图层
layerRouter.put('/:id', (req, res) => {
    let fun = async function () {
        let toChange = await BaseMapLayer.findById(req.params.id);
        return await toChange.update(req.body);
    };

    fun().then((value) => res.send(JSON.stringify(value)))
        .catch((err) => res.send(err.toString()));
});

//  根据id获取一个图层
layerRouter.get('/:id', (req, res) => {
    BaseMapLayer.findById(req.params.id)
        .then((value) => res.send(JSON.stringify(value)))
        .catch((err) => res.send(err.toString()));
});


module.exports = layerRouter;

