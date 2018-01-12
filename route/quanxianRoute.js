const BaseMapLayer = require('../db').baseMapLayer
const BaseLayerField = require('../db').baseLayerField
const Group = require('../db').group
const User = require('../db').user
const Bookmark = require('../db').bookmark
const Department = require('../db').department
const Op = require('sequelize').Op
const co = require('co')

let quanxianRoute = function (app) {


    app.get('/departmentsForTree', (req, res) => {
        co(function* () {

            let departmentsForTree = []

            let depas = yield Department.findAll()
            let grps = yield Group.findAll()

            depas.forEach(depa => {
                let item = {}
                item.grps = []

                item.depa = depa
                grps.forEach(grp => {
                    if (grp.DepartmentId == depa.id) item.grps.push(grp)
                });

                departmentsForTree.push(item)
            });

            res.send(departmentsForTree)

        }).catch(function (e) {
            console.log(e);
        });
    })

}



module.exports.quanxianRoute = quanxianRoute