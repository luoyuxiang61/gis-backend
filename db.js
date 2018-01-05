const baseLayerField = require('./model').baseLayerField
const baseMapLayer = require('./model').baseMapLayer

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



const BaseMapLayer = sequelize.define('BaseMapLayer', baseMapLayer,
    {
        tableName: 'BaseMapLayer',
        paranoid: true,
        timestamps: false
    })

const BaseLayerField = sequelize.define('BaseLayerField', baseLayerField,
    {
        tableName: 'BaseLayerField',
        timestamps: false
    })

module.exports.bm = BaseMapLayer
module.exports.bf = BaseLayerField
module.exports.sql = sequelize