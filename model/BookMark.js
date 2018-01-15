const Sequelize = require('sequelize')
module.exports = {
    name: {
        type: Sequelize.STRING
    },
    xmin: {
        type: Sequelize.FLOAT
    },
    ymin: {
        type: Sequelize.FLOAT
    },
    xmax: {
        type: Sequelize.FLOAT
    },
    ymax: {
        type: Sequelize.FLOAT
    },
    wkid: {
        type: Sequelize.INTEGER
    }

}