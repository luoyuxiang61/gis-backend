let User = require('../resource/resource').user;
let Group = require('../resource/resource').group;
let Department = require('../resource/resource').department;
let BaseMapLayer = require('../resource/resource').baseMapLayer;
let BaseLayerField = require('../resource/resource').baseLayerField;
let md5 = require('blueimp-md5');
let co = require('co');
let Op = require('sequelize').Op;


co(function* () {
    // 给每个权限组都分配所有的图层和字段

    let layers = yield BaseMapLayer.findAll();

    let fields = yield BaseLayerField.findAll();


    let grps = yield Group.findAll();


    grps.forEach((grp) => {
        grp.setBaseMapLayers(layers);
        grp.setBaseLayerFields(fields);
    });
}).catch(function(e) {
    console.log(e);
});
