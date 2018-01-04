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





//对所有的请求开启跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


//用于前台生成服务树状图
app.get('/layersForTree',(req,res) => {

    co(function* () {
        let layersForTree = yield BaseMapLayer.findAll();
        let xx = [];

        layersForTree.forEach(element => {
            element = element.get({plain:true});
            if(element.ParentId == 0) {
                xx.push(element)
            }
        });
        res.send(xx);
    }).catch(function (e) {
        console.log(e);
    });






})



app.listen(3000)
