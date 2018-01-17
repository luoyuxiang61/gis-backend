let User = require('../dao/dao').user
let Group = require('../dao/dao').group
let Department = require('../dao/dao').department
let BaseMapLayer = require('../dao/dao').baseMapLayer
let BaseLayerField = require('../dao/dao').baseLayerField
let md5 = require('blueimp-md5')
let co = require('co')
let Op = require('sequelize').Op


co(function* () {


    //给每个权限组都分配所有的图层和字段

    let layers = yield BaseMapLayer.findAll()

    let fields = yield BaseLayerField.findAll()



    let grps = yield Group.findAll()


    grps.forEach(grp => {
        grp.setBaseMapLayers(layers)
        grp.setBaseLayerFields(fields)
    });


}).catch(function (e) {
    console.log(e);
});