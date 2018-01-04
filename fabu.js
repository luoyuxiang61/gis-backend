const express = require('express')
let app = express()
const bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })
let moment = require('moment')

const Sequelize = require('sequelize');
const sequelize = new Sequelize('Silverlight_NETDA', 'sa', 'Luoyuxiang61.', {
    host: 'localhost',
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00'
});
const Op = Sequelize.Op;

let co = require('co')



sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });




const BaseMapLayer = sequelize.define('BaseMapLayer', {
    Id:
        {
            type: 'INT',
            allowNull: false,
            defaultValue: null,
            primaryKey: true,
            foreignKey: [Object]
        },
    ParentId:
        {
            type: 'INT',
            allowNull: true,
            defaultValue: null,
            primaryKey: false
        },
    LayerName:
        {
            type: 'NletCHAR',
            allowNull: true,
            defaultValue: null,
            primaryKey: false
        },
    DisplayName:
        {
            type: 'NletCHAR',
            allowNull: true,
            defaultValue: null,
            primaryKey: false
        },
    ServiceUrl:
        {
            type: 'NletCHAR',
            allowNull: true,
            defaultValue: null,
            primaryKey: false
        },
    LayerType:
        {
            type: 'NletCHAR',
            allowNull: true,
            defaultValue: null,
            primaryKey: false
        },
    TokenUserName:
        {
            type: 'NletCHAR',
            allowNull: true,
            defaultValue: null,
            primaryKey: false
        },
    TokenPassword:
        {
            type: 'NletCHAR',
            allowNull: true,
            defaultValue: null,
            primaryKey: false
        },
    TokenURL:
        {
            type: 'NletCHAR',
            allowNull: true,
            defaultValue: null,
            primaryKey: false
        },
    IsVisble:
        {
            type: 'NletCHAR',
            allowNull: true,
            defaultValue: null,
            primaryKey: false
        },
    Opacity:
        {
            type: 'DECIMAL',
            allowNull: true,
            defaultValue: null,
            primaryKey: false
        },
    SortCode:
        {
            type: 'INT',
            allowNull: true,
            defaultValue: null,
            primaryKey: false
        },
    IsLegend:
        {
            type: 'INT',
            allowNull: true,
            defaultValue: null,
            primaryKey: false
        },
    CacheName:
        {
            type: 'NletCHAR',
            allowNull: true,
            defaultValue: null,
            primaryKey: false
        },
    MobileServiceUrl:
        {
            type: 'NletCHAR',
            allowNull: true,
            defaultValue: null,
            primaryKey: false
        },
    IsShowInMobile:
        {
            type: 'INT',
            allowNull: true,
            defaultValue: null,
            primaryKey: false
        }
},
    {
        tableName: 'BaseMapLayer',
        paranoid: true,
        timestamps:false
    })


app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

//对所有的请求开启跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


//用于前台生成服务树状图
app.get('/layersForTree',(req,res) => {

    co(function* () {
        let layersForTree = [];
        let fathers = yield BaseMapLayer.findAll({
            where: {
                ParentId: {
                    [Op.eq]:0
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
                if(son.ParentId == father.Id) {
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
app.get('/oneLayer',function(req,res) {
    co(function* () {
        let oneLayer = yield BaseMapLayer.find({
            where: {
                Id: {
                    [Op.eq]:req.query.layerId
                }
            }
        })

        res.send(oneLayer)
    }).catch(function (e) {
        console.log(e);
    });

})


//修改图层属性
app.post('/updateLayer', (req,res) => {

    

    let change = {}
    change[req.body.name] = req.body.value
    
    console.log(change);

    if(req.body.name == 'LayerType') {
        switch(change[req.body.name]) {
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
                console.log('发生错误！')
        }
    }

    console.log(change);


    co(function* () {
        let oneLayer = yield BaseMapLayer.update(change,{
            where: {
                Id: {
                    [Op.eq]: req.body.pk
                }
            }
        })


        res.send(oneLayer)
    }).catch(function (e) {
        console.log(e);
    });

})



//表格编辑需要的数据源
app.get('/yesno',function(req,res) {
    res.send(JSON.stringify([
        {value: 1,text: '是'},
        {value: 0,text: '否'}
    ]))
})

app.get('/layerType',(req,res) => {
    res.send(JSON.stringify([
        { value: 0, text: 'GroupLayer' },
        { value: 1, text: 'TiledService' },
        { value: 2, text: 'FeatureLayer' },
        { value: 3, text: 'GeometryService' },
    ]))
})



app.listen(3000)
