const BaseMapLayer = require('../resource/resource').baseMapLayer;
const Group = require('../resource/resource').group;
const Op = require('sequelize').Op;
const co = require('co');
const EventEmitter = require('events').EventEmitter

const express = require('express')
let layerRouter = express.Router()


// 根据权限组groupId，返回该权限组拥有的所有图层，以及在相应图层拥有的字段
layerRouter.post('/layersForGroup', (req, res) => {

  async function layersForGroup() {
    let layersForGroup = []
    let grp = await Group.findById(req.body.groupId)
    let [fathers, fields] = await Promise.all([
      grp.getBaseMapLayers({
        where: {
          ParentId: 0
        }
      }),
      grp.getBaseLayerFields()
    ])

    for (let fa of fathers) {
      let item = {}
      item.father = fa
      item.sons = await grp.getBaseMapLayers({
        where: {
          ParentId: fa.id
        }
      })
      item.sons = item.sons.map(x => x.get({ plain: true })).sort((a, b) => {
        if (a.SortCode < b.SortCode) {
          return -1
        } else {
          return 1
        }
      })
      for (let son of item.sons) {
        son.fields = fields.filter(x => x.BaseMapLayerId === son.id)
      }

      layersForGroup.push(item)
    }
    return layersForGroup
  }

  layersForGroup().then(x => res.send(x)).catch(e => res.send('err' + e))
});


// 获取所有要素图层
layerRouter.get('/featureLayers', (req, res) => {
  BaseMapLayer.findAll({
    where: {
      LayerType: 'FeatureLayer'
    }
  }).then(x => res.send(x))
    .catch(e => res.send('err' + e))
});



// 获取树状的所有图层，用于生成服务管理页面的服务目录
layerRouter.get('/layersForTree', (req, res) => {
  async function layersForTree() {
    let layersForTree = []
    let [fathers, sons] = await Promise.all([
      BaseMapLayer.findAll({ where: { ParentId: 0 } }),
      BaseMapLayer.findAll({
        where: {
          ParentId: {
            [Op.not]: 0
          }
        }
      })
    ])
    for (let fa of fathers) {
      let item = {}
      item.father = fa
      item.sons = sons.filter(x => x.ParentId === fa.id)
      layersForTree.push(item)
    }
    return layersForTree
  }

  layersForTree().then(x => res.send(x)).catch(e => res.send('err' + e))
});


// 根据图层组ID获取所有子图层
layerRouter.get('/layersInLyrGrp', (req, res) => {
  BaseMapLayer.findAll({
    where: {
      ParentId: req.query.lyrGrpId
    },
    order: [
      ['SortCode', 'ASC']
    ]
  }).then(x => {
    res.send(x)
  }).catch(e => res.send('err' + e))
})


// 根据id获取一个图层
layerRouter.get('/oneLayer', function (req, res) {
  BaseMapLayer.findById(req.query.layerId).then(x => res.send(x)).catch(e => res.send('err' + e))
});


// 测试用：初始化所有图层
layerRouter.post('/addLayer', (req, res) => {
  req.body.forEach((e) => {
    BaseMapLayer.create(e);
  });
});


//改变子图层的顺序
layerRouter.post('/changeSort', (req, res) => {

  let sort = JSON.parse(req.body.sort)
  sort.forEach((s, index) => {
    BaseMapLayer.update({ SortCode: index + 1000 }, {
      where: {
        id: s
      }
    })
  })
  res.send('ok')
})


// 修改图层属性
layerRouter.post('/updateLayer', (req, res) => {
  let change = {};
  change[req.body.name] = req.body.value;

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

  BaseMapLayer.findById(req.body.pk).then(x => x.update(change).then((x) => res.send(x)).catch(e => res.send('err')))
    .catch(e => res.send('err'))
});


module.exports.layerRouter = layerRouter;
