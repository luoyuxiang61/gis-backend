const Sequelize = require('sequelize')
module.exports = {
    name: {
        type: Sequelize.STRING
    },
    xmin: {
        type: Sequelize.DECIMAL(11, 3)
    },
    ymin: {
        type: Sequelize.DECIMAL(11, 3)
    },
    xmax: {
        type: Sequelize.DECIMAL(11, 3)
    },
    ymax: {
        type: Sequelize.DECIMAL(11, 3)
    },
    wkid: {
        type: Sequelize.INTEGER
    }

}