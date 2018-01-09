let {
  baseMapLayer,
  baseLayerField,
  user,
  group,
  bookmark
} = require('./model')

const Sequelize = require('sequelize')
const sequelize = new Sequelize('Fabu', 'sa', 'Luoyuxiang61.', {
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


let BaseMapLayer = sequelize.define('BaseMapLayer', baseMapLayer)
let BaseLayerField = sequelize.define('BaseLayerField', baseLayerField)

let Group = sequelize.define('Group', group)

let LayerGroup = sequelize.define('LayerGroup')

let FieldGroup = sequelize.define('FieldGroup')

let User = sequelize.define('User', user)

let Bookmark = sequelize.define('Bookmark', bookmark)






BaseMapLayer.belongsToMany(Group, {
  through: LayerGroup
})
Group.belongsToMany(BaseMapLayer, {
  through: LayerGroup
})

BaseLayerField.belongsToMany(Group, {
  through: FieldGroup
})

Group.belongsToMany(BaseLayerField, {
  through: FieldGroup
})


Group.hasMany(User)
User.belongsTo(Group)


BaseMapLayer.hasMany(BaseLayerField)
BaseLayerField.belongsTo(BaseMapLayer)


User.hasMany(Bookmark)
Bookmark.belongsTo(User)

// sequelize.sync({
//   force: true
// })



module.exports.baseMapLayer = BaseMapLayer
module.exports.baseLayerField = BaseLayerField
module.exports.group = Group
module.exports.user = User
module.exports.sql = sequelize