const Fun = require('../resource/resource').fun;
const Group = require('../resource/resource').group;
const Op = require('sequelize').Op;

let funRoute = (app) => {

    app.post('/addFun', (req, res) => {
        Fun.create({ name: req.body.funName }).then((x) => res.send(x))
    })

    app.get('/allFunctions', (req, res) => {
        Fun.findAll().then(x => res.send(x))
    })

    app.post('/funsForGroup', (req, res) => {
        Fun.findAll({
            where: {
                id: {
                    [Op.in]: req.body.grpId
                }
            }
        }).then(funs => res.send(funs))
    })

}

module.exports.funRoute = funRoute