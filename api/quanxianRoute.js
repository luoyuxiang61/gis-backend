const BaseMapLayer = require('../dao/db').baseMapLayer
const BaseLayerField = require('../dao/db').baseLayerField
const Group = require('../dao/db').group
const User = require('../dao/db').user
const Bookmark = require('../dao/db').bookmark
const Department = require('../dao/db').department
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