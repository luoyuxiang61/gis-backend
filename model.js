module.exports.baseLayerField = {
  Id:
  {
    type: 'INT',
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
  },
  FieldName:
  {
    type: 'NVARCHAR(255)',
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  Alias:
  {
    type: 'NVARCHAR(255)',
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  DisplayName:
  {
    type: 'NVARCHAR(255)',
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  IsDisplay:
  {
    type: 'INT',
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  IsSearch:
  {
    type: 'INT',
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  UnitName:
  {
    type: 'NVARCHAR(255)',
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  IsShowMuFormSquareMeters:
  {
    type: 'INT',
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  LayerId:
  {
    type: 'INT',
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  LayerName:
  {
    type: 'NVARCHAR(255)',
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
  IsLabel:
  {
    type: 'INT',
    allowNull: true,
    defaultValue: null,
    primaryKey: false,

  }
}

module.exports.baseMapLayer = {
  Id:
  {
    type: 'INT',
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
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
    type: 'NVARCHAR(255)',
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  DisplayName:
  {
    type: 'NVARCHAR(255)',
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  ServiceUrl:
  {
    type: 'NVARCHAR(255)',
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  LayerType:
  {
    type: 'NVARCHAR(255)',
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  TokenUserName:
  {
    type: 'NVARCHAR(255)',
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  TokenPassword:
  {
    type: 'NVARCHAR(255)',
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  TokenURL:
  {
    type: 'NVARCHAR(255)',
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  IsVisble:
  {
    type: 'NVARCHAR(255)',
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
    type: 'NVARCHAR(255)',
    allowNull: true,
    defaultValue: null,
    primaryKey: false
  },
  MobileServiceUrl:
  {
    type: 'NVARCHAR(255)',
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
}

module.exports.user = {
  Id: {
    type: 'INT',
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
  },
  UserName: {
    type: 'NVARCHAR(255)',
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
  },
  Password: {
    type: 'NVARCHAR(255)',
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
  }
}

module.exports.group = {
  Id: {
    type: 'INT',
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
  },
  name: {
    type: 'NVARCHAR(255)',
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
  }
}












// var SequelizeAuto = require('sequelize-auto')
// var auto = new SequelizeAuto('Silverlight_NETDA', 'sa', 'Luoyuxiang61.', {
//     host: 'localhost',
//     dialect: 'mssql',
//     directory: false, // prevents the program from writing to disk
//     port: '1433',
//     additional: {
//         timestamps: false
//     },
//     tables: ['BaseLayerField']
// })

// auto.run(function (err) {
//     if (err) throw err;

//     console.log(auto.tables); // table list
//     console.log(auto.foreignKeys); // foreign key list
// });