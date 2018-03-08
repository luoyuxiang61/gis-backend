const Sequelize = require('sequelize');
module.exports = {
    uuid: {
        type: Sequelize.STRING
    },
    model: {
        type: Sequelize.STRING
    },
    os: {
        type: Sequelize.STRING
    },
    disabled: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}