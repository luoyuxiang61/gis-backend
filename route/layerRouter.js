const BaseMapLayer = require('../resource/resource').baseMapLayer;
const Group = require('../resource/resource').group;
const Op = require('sequelize').Op;
const co = require('co');
const EventEmitter = require('events').EventEmitter

const express = require('express')
let layerRouter = express.Router()


// 根据条件获取图层
layerRouter.get('/', (req, res) => {

  if (req.query.groupId) {
    layersForGroup(req.query.groupId).then(x => res.send(x)).catch(e => res.send('err' + e))
  }
  else if (req.query.type) {
    getLayersByType(req.query.type).then(x => res.send(x)).catch(e => res.send('err' + e))
  }
  else if (req.query.id) {
    getLayerById(req.query.id).then(x => res.send(x))
  }
  else {
    layersForTree().then(x => res.send(x)).catch(e => res.send('err' + e))
  }


  async function layersForGroup(groupId) {
    let layersForGroup = []
    let grp = await Group.findById(groupId)
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

  function getLayersByType(layerType) {
    return BaseMapLayer.findAll({
      where: {
        LayerType: layerType
      }
    })
  }

  function getLayerById(id) {
    return BaseMapLayer.findById(id)
  }

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


});


// 根据图层组ID获取它的子图层
layerRouter.get('/:id/sons', (req, res) => {
  BaseMapLayer.findAll({
    where: {
      ParentId: req.params.id
    },
    order: [
      ['SortCode', 'ASC']
    ]
  }).then(x => res.send(x))
    .catch(e => res.send('err' + e))
})





//改变子图层的顺序
layerRouter.post('/sort', (req, res) => {
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
layerRouter.post('/update', (req, res) => {
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

  BaseMapLayer.findById(req.body.pk)
    .then(x => x.update(change))
    .then(x => res.send(x))
    .catch(e => res.send('err'))
});


// 测试用：初始化所有图层
layerRouter.post('/', (req, res) => {
  req.body.forEach((e) => {
    BaseMapLayer.create(e);
  });
});


module.exports.layerRouter = layerRouter;
