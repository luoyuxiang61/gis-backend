const BaseMapLayer = require('../db').baseMapLayer
const BaseLayerField = require('../db').baseLayerField
const Group = require('../db').group
const User = require('../db').user
const Op = require('sequelize').Op
const co = require('co')

let layerRoute = function (app) {

  //根据权限组名称获取所拥有图层
  app.get('/myLayers', (req, res) => {

    co(function* () {
      let myLayers = yield BaseMapLayer.findAll()
      myLayers.forEach(element => {
        element = element.get({
          plain: true
        })
      });
      res.send(myLayers)
    }).catch(function (e) {
      console.log(e);
    });

  })


  //获取所有要素图层
  app.get('/featureLayers', (req, res) => {

    co(function* () {
      let featureLayers = yield BaseMapLayer.findAll({
        where: {
          LayerType: {
            [Op.eq]: 'FeatureLayer'
          }
        }
      })

      res.send(featureLayers)
    }).catch(function (e) {
      console.log(e);
    });
  })






  //用于前台生成服务树状图
  app.post('/layersForTree', (req, res) => {


    let group = req.body.group
    console.log(group)

    co(function* () {
      let layersForTree = [];
      let fathers = yield BaseMapLayer.findAll({
        where: {
          ParentId: {
            [Op.eq]: 0
          }
        }
      });
      let sons = yield BaseMapLayer.findAll({
        where: {
          ParentId: {
            [Op.not]: 0
          }
        }
      })

      fathers.forEach(father => {
        let item = {
          father: {},
          sons: []
        }
        item.father = father
        sons.forEach(son => {
          if (son.ParentId == father.Id) {
            item.sons.push(son)
          }
        });
        layersForTree.push(item)
      });

      res.send(layersForTree)

    }).catch(function (e) {
      console.log(e);
    });

  })

  //根据id获取一个图层
  app.get('/oneLayer', function (req, res) {
    co(function* () {
      let oneLayer = yield BaseMapLayer.find({
        where: {
          Id: {
            [Op.eq]: req.query.layerId
          }
        }
      })

      res.send(oneLayer)
    }).catch(function (e) {
      console.log(e);
    });

  })

  app.post('/addLayer', (req, res) => {

    req.body.forEach(e => {
      BaseMapLayer.create(e)
    })

  })


  //修改图层属性
  app.post('/updateLayer', (req, res) => {

    let change = {}
    change[req.body.name] = req.body.value

    if (req.body.name == 'LayerType') {
      switch (change[req.body.name]) {
        case '0':
          change[req.body.name] = 'GroupLayer';
          break;
        case '1':
          change[req.body.name] = 'TiledService';
          break;
        case '2':
          change[req.body.name] = 'FeatureLayer';
          break;
        case '3':
          change[req.body.name] = 'GeometryService';
          break;
        default:
          console.log('发生错误！');
          break;
      }
    }


    co(function* () {
      let oneLayer = yield BaseMapLayer.update(change, {
        where: {
          Id: {
            [Op.eq]: req.body.pk
          }
        }
      })


      res.send(oneLayer)
    }).catch(function (e) {
      console.log(e);
      res.send(['err'])
    });

  })



}

module.exports.layerRoute = layerRoute