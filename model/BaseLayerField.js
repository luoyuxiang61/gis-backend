const Sequelize = require('sequelize')
module.exports = {
    FieldName: {
        type: Sequelize.STRING
    },
    Alias: {
        type: Sequelize.STRING
    },
    DisplayName: {
        type: Sequelize.STRING
    },
    IsDisplay: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    IsSearch: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    UnitName: {
        type: Sequelize.STRING
    },
    IsShowMuFormSquareMeters: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    LayerId: {
        type: Sequelize.INTEGER
    },
    LayerName: {
        type: Sequelize.STRING
    },
    SortCode: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    IsLabel: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}