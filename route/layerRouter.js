// const BaseMapLayer = require('../resource/resource').baseMapLayer;
const Group = require('../resource/resource').group;
// const Op = require('sequelize').Op;

const express = require('express');
let layerRouter = express.Router({caseSensitive: true});
layerRouter.use((req, res, next) => {
    // console.log(req.body, res, 'layerRouter start!!!');
    console.log('layerRouter start!!!');
    next();
});




// 根据groupId返回该权限组拥有的所有图层
layerRouter.get('/layersForGroup/:groupId', (req, res) => {
    let fun = async function(groupId) {
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

    let layersForGroup = fun(req.params.groupId);
    layersForGroup.then((value) => res.send(value))
        .catch((err) => res.send(err.toString()));
});

module.exports = layerRouter;

