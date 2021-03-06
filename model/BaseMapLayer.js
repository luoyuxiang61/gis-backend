const Sequelize = require('sequelize');
module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },

    ParentId: {
        type: Sequelize.INTEGER,
    },
    LayerName: {
        type: Sequelize.STRING,
    },
    DisplayName: {
        type: Sequelize.STRING,
    },
    ServiceUrl: {
        type: Sequelize.STRING,
    },
    LayerType: {
        type: Sequelize.STRING,
    },
    TokenUserName: {
        type: Sequelize.STRING,
    },
    TokenPassword: {
        type: Sequelize.STRING,
    },
    TokenURL: {
        type: Sequelize.STRING,
    },
    IsVisible: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    Opacity: {
        type: Sequelize.FLOAT,
        defaultValue: 1.0,
    },
    SortCode: {
        type: Sequelize.INTEGER,
    },
    IsLegend: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    CacheName: {
        type: Sequelize.STRING,
    },
    MobileServiceUrl: {
        type: Sequelize.STRING,
    },
    IsShowInMobile: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
    },
};
