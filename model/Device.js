const Sequelize = require('sequelize');
module.exports = {
    uuid: {
        type: Sequelize.STRING
    },
    deviceType: {
        type: Sequelize.INTEGER
    },
    model: {
        type: Sequelize.STRING
    },
    os: {
        type: Sequelize.STRING
    },
    osVersion: {
        type: Sequelize.STRING
    },
    online: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    offline: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}