const baseLayerField = require('./model').baseLayerField
const baseMapLayer = require('./model').baseMapLayer
const user = require('./model').user
const group = require('./model').group

const Sequelize = require('sequelize')
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
})

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

// const User = sequelize.define('User', user, {
//   tableName: 'User',
//   timestamps: false,
//   paranoid: true
// })

// const Group = sequelize.define('Group', group, {
//   tableName: 'Group',
//   timestamps: false,
//   paranoid: true
// })
// User.belongsTo(Group)
// Group.hasMany(User)
// Group.hasMany(BaseMapLayer)
// BaseMapLayer.hasMany(Group)
// sequelize.sync({ force: true })
module.exports.bm = BaseMapLayer
module.exports.bf = BaseLayerField
// module.exports.user = User
// module.exports.group = Group
module.exports.sql = sequelize