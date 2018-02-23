const BaseMapLayer = require('../resource/resource').baseMapLayer;
const BaseLayerField = require('../resource/resource').baseLayerField;
const Group = require('../resource/resource').group;
const User = require('../resource/resource').user;
const Bookmark = require('../resource/resource').bookmark;
const Department = require('../resource/resource').department;
const Op = require('sequelize').Op;
const co = require('co');

let quanxianRoute = function (app) {
    app.get('/departmentsForTree', (req, res) => {
        co(function* () {
            let departmentsForTree = [];

            let depas = yield Department.findAll();
            let grps = yield Group.findAll();

            depas.forEach((depa) => {
                let item = {};
                item.grps = [];

                item.depa = depa;
                grps.forEach((grp) => {
                    if (grp.DepartmentId == depa.id) item.grps.push(grp);
                });

                departmentsForTree.push(item);
            });

            res.send(departmentsForTree);
        }).catch(function (e) {
            console.log(e);
        });
    });


    app.post('/addGroup', (req, res) => {
        let depa = Department.findById(req.body.depaId)
        depa.then(x => {
            x.createGroup({ name: req.body.grpName }).then(x => res.send(x)).catch(e => res.send('err'))
        }).catch(e => res.send('err'))
    })

};


module.exports.quanxianRoute = quanxianRoute;
