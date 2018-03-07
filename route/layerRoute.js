const BaseMapLayer = require('../resource/resource').baseMapLayer;
const Group = require('../resource/resource').group;
const Op = require('sequelize').Op;
const co = require('co');
const EventEmitter = require('events').EventEmitter

let layerRoute = function (app) {
  // 根据权限组groupId，返回该权限组拥有的所有图层
  app.post('/layersForGroup', (req, res) => {
    co(function* () {
      let group = yield Group.find({
        where: {
          id: {
            [Op.eq]: req.body.groupId,
          },
        },
      });

      let layersForGroup = [];

      let fathers = yield group.getBaseMapLayers({
        where: {
          ParentId: {
            [Op.eq]: 0,
          },
        },
      });

      let sons = yield group.getBaseMapLayers({
        where: {
          ParentId: {
            [Op.not]: 0,
          },
        },
      });


      let sons0 = [];


      sons.forEach((element) => {
        sons0.push(element.get({ plain: true }));
      });

      let groupFields = yield group.getBaseLayerFields();


      fathers.forEach((father) => {
        let item = {
          father: {},
          sons: [],
        };
        item.father = father;
        sons0.forEach((son) => {
          son.fields = [];
          groupFields.forEach((element) => {
            if (element.BaseMapLayerId == son.id) {
              son.fields.push(element);
            }
          });

          if (son.ParentId == father.id) {
            item.sons.push(son);
          }
        });
        item.sons.sort((a, b) => {
          if (a.SortCode < b.SortCode) {
            return -1
          } else {
            return 1
          }
        })
        layersForGroup.push(item);
      });

      res.send(layersForGroup);
    }).catch(function (e) {
      console.log(e);
    });
  });


  // 获取所有要素图层
  app.get('/featureLayers', (req, res) => {
    co(function* () {
      let featureLayers = yield BaseMapLayer.findAll({
        where: {
          LayerType: {
            [Op.eq]: 'FeatureLayer',
          },
        },
      });

      res.send(featureLayers);
    }).catch(function (e) {
      console.log(e);
    });
  });


  // 获取树状的所有图层，用于生成服务管理页面的服务目录
  app.post('/layersForTree', (req, res) => {
    co(function* () {
      let layersForTree = [];
      let fathers = yield BaseMapLayer.findAll({
        where: {
          ParentId: {
            [Op.eq]: 0,
          },
        },
      });
      let sons = yield BaseMapLayer.findAll({
        where: {
          ParentId: {
            [Op.not]: 0,
          },
        },
      });

      fathers.forEach((father) => {
        let item = {
          father: {},
          sons: [],
        };
        item.father = father;
        sons.forEach((son) => {
          if (son.ParentId == father.id) {
            item.sons.push(son);
          }
        });
        layersForTree.push(item);
      });

      res.send(layersForTree);
    }).catch(function (e) {
      console.log(e);
    });
  });


  // 根据图层组ID获取所有子图层
  app.get('/layersInLyrGrp', (req, res) => {
    BaseMapLayer.findAll({
      where: {
        ParentId: {
          [Op.eq]: req.query.lyrGrpId
        }
      },
      order: [
        ['SortCode', 'ASC']
      ]
    }).then(x => {
      res.send(x)
    }).catch(e => res.send(e.toString()))
  })

  // 根据id获取一个图层
  app.get('/oneLayer', function (req, res) {
    co(function* () {
      let oneLayer = yield BaseMapLayer.find({
        where: {
          id: {
            [Op.eq]: req.query.layerId,
          },
        },
      });

      res.send(oneLayer);
    }).catch(function (e) {
      console.log(e);
    });
  });

  app.post('/addLayer', (req, res) => {
    req.body.forEach((e) => {
      BaseMapLayer.create(e);
    });
  });


  //改变子图层的顺序
  app.post('/changeSort', (req, res) => {
    let emit = new EventEmitter()
    emit.once('over', () => console.log('over!!!'))

    let sort = JSON.parse(req.body.sort)
    sort.forEach((s, index) => {
      BaseMapLayer.update({ SortCode: index + 1000 }, {
        where: {
          id: {
            [Op.eq]: s
          }
        }
      })
    })

    res.send('ok')
  })


  // 修改图层属性
  app.post('/updateLayer', (req, res) => {
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


    co(function* () {
      let oneLayer = yield BaseMapLayer.update(change, {
        where: {
          id: {
            [Op.eq]: req.body.pk,
          },
        },
      });


      res.send(oneLayer);
    }).catch(function (e) {
      console.log(e);
      res.send(['err']);
    });
  });
};

module.exports.layerRoute = layerRoute;
