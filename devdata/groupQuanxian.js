let User = require('../db').user
let Group = require('../db').group
let Department = require('../db').department
let BaseMapLayer = require('../db').baseMapLayer
let BaseLayerField = require('../db').baseLayerField
let md5 = require('blueimp-md5')
let co = require('co')
let Op = require('sequelize').Op


co(function* () {


    let layers = yield BaseMapLayer.findAll()

    let fields = yield BaseLayerField.findAll()



    let grps = yield Group.findAll()


    grps.forEach(grp => {

        // grp.setBaseMapLayers(layers)
        // grp.setBaseLayerFields(fields)
        // grp.addBaseMapLayers(gls)
        // grp.addBaseMapLayers(lyrs)
        // grp.addBaseLayerFields(fields)

    });





}).catch(function (e) {
    console.log(e);
});