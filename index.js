const express = require('express')
var app = express()
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var moment = require('moment')

const multer = require('multer')
var storage = multer.diskStorage({
    destination:function(req,file,cb){

        cb(null,'./public')
    },

    filename:function(req,file,cb){
        var fileFormat = (file.originalname).split('.');
        cb(null, file.originalname);
    }
})


var upload = multer({storage:storage}).single('pdf')




const Sequelize = require('sequelize');
const sequelize = new Sequelize('Contract', 'sa', 'Luoyuxiang61.', {
    host: 'localhost',
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00'
});
const { gt, lte, ne, in: opIn } = Sequelize.Op;
const Op = Sequelize.Op;

var co = require('co')



sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });





//用户Model（用户名，密码，真实姓名，角色）
const User = sequelize.define('User', {
    UserName: {
        type:Sequelize.STRING,
        allowNull:false
    },
    Password: {
        type: Sequelize.STRING,
        allowNull:false
    },
    RealName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Role: {
        type: Sequelize.STRING,
        allowNull:false
    }
},
    {
        tableName: 'User',
        paranoid: true
    })


//建设单位Model
const JSDW = sequelize.define('JSDW', {
    Name: {
        type: Sequelize.STRING,
        allowNull:false
    },
    Address: {
        type: Sequelize.STRING,
        allowNull:true
    },
    Email: {
        type: Sequelize.STRING,
        allowNull:true
    },
    LinkMan: {
        type: Sequelize.STRING,
        allowNull:true
    },
    PhoneNumber: {
        type: Sequelize.STRING,
        allowNull:true
    }
},
    {
        tableName: 'JSDW',
        paranoid: true
    })

//施工单位Model
const SGDW = sequelize.define('SGDW', {
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    LinkMan: {
        type: Sequelize.STRING,
        allowNull: true
    },
    PhoneNumber: {
        type: Sequelize.STRING,
        allowNull: true
    }
},
    {
        tableName: 'SGDW',
        paranoid: true
    })






//合同Model(创建日期、修改日期和删除日期字段是sequelize自动的)
const Contract = sequelize.define('Contract', {
    ProjectName: {
        type: Sequelize.STRING,
        allowNull:false
    },
    Sign_Date: {
        type:Sequelize.DATEONLY,
        allowNull:false,
        get() {
            return moment(this.getDataValue('Sign_Date')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    ContractNO: {
        type: Sequelize.STRING,
        allowNull:false
    },
    ContractAmount: {
        type: Sequelize.DECIMAL(10, 4),
        allowNull:false
    },
    AmountPaid: {
        type: Sequelize.DECIMAL(10, 4),
        allowNull:false,
        defaultValue:0
    },
    Remark: {
        type: Sequelize.STRING,
        allowNull:true
    },
    Operator: {
        type: Sequelize.STRING,
        allowNull:true
    },
    WayOfEntrusting: {
        type: Sequelize.STRING,
        allowNull:true
    },
    RelatedMaterials: {
        type: Sequelize.STRING,
        allowNull:true
    },
    ContractType: {
        type: Sequelize.STRING,
        allowNull:true
    },
    Create_User: {
        type: Sequelize.STRING,
        allowNull:false,
        defaultValue:"admin"
    },
    Modify_User: {
        type: Sequelize.STRING,
        allowNull:true
    },
    Status: {
        type:Sequelize.STRING
    },
    HasPDF: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
},
    {
        tableName: 'Contract',
        paranoid:true
    })


//付款计划Model
const PlanningOfPayment = sequelize.define('PlanningOfPayment', {
    PlanningDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        get() {
            return moment(this.getDataValue('PlanningDate')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    PlanningAmount: {
        type: Sequelize.NUMERIC(10, 4),
        allowNull: false
    },
    LinkMan: {
        type: Sequelize.STRING,
        allowNull: false
    },
    PhoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
    {
        tableName: 'PlanningOfPayment',
        paranoid: true
    })


//付款记录Model
const RecordOfPayment = sequelize.define('RecordOfPayment', {
    RecordDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        get() {
            return moment(this.getDataValue('RecordDate')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    RecordAmount: {
        type: Sequelize.NUMERIC(10, 4),
        allowNull: false
    },
    Operator: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
    {
        tableName: 'RecordOfPayment',
        paranoid: true
    })


//已上传的pdf文件
const Pdf = sequelize.define('Pdf', {
    FileName: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
    {
        tableName: 'Pdf',
        paranoid: true
    })

JSDW.hasMany(Contract);
SGDW.hasMany(Contract);
Contract.belongsTo(JSDW);
Contract.belongsTo(SGDW);

Contract.hasMany(PlanningOfPayment);
Contract.hasMany(RecordOfPayment);
PlanningOfPayment.belongsTo(Contract);
RecordOfPayment.belongsTo(Contract);

// sequelize.sync({force:true})










// co(function* () {

//     yield Contract.destroy({
//         where:{
//             id:{
//                 [Op.gt]:300
//             }
//         }
//     })


// }).catch(function (e) {
//     console.log(e);
// });









// co(function* () {





//     var sgdw = yield SGDW.create({
//         Name:"苏州市5号施工单位",
//         Address:"高新区科锐路2号",
//         Email:"sgdw@163.com",
//         LinkMan:"张连发",
//         PhoneNumber:"123232322"
//     })

//     var jsdw = yield JSDW.create({
//         Name: "苏州市5号建设单位",
//         Address: "虎丘区科锐路2号",
//         Email: "jsdw@163.com",
//         LinkMan: "李发财",
//         PhoneNumber: "123232322"
//     })





//     for(var i=0;i<50;i++){

//         var statusx="完成";
//         if(i%2==0)statusx="进行中";
//         if(i%3==0)statusx="超时未完成";
//         if(i%5==0)statusx="暂停";


//         var typex = "G";
//         if (i % 2 == 0)typex="H";
//         if (i % 5 == 0)typex="A";



//         var con = yield Contract.create({
//             ProjectName: "苏州吴中太湖新城市政基础设施工程中一路（中六路~塔韵路）、中二路（中六路~塔韵路）、中六路（友翔路~中二路）、中八路（友翔路~中三路）施工图设计",
//             Sign_Date: new Date(2018, 0, 12),
//             ContractNO: "G13-176-"+(i+150),
//             ContractAmount: 454.2342+i*44.5,
//             AmountPaid: 254.4523+i*44.321,
//             Remark: "这是一个备注xxxxx",
//             Operator: "经办人",
//             WayOfEntrusting: "上会直接委托",
//             RelatedMaterials: "合同预审表，吴太办纪（2017）9号",
//             ContractType: typex,
//             Create_User: "一个用户",
//             Modify_User: '一个用户',
//             Status: statusx
//         })
//         yield con.setSGDW(sgdw);
//         yield con.setJSDW(jsdw);
//     }
// }).catch(function (e) {
//     console.log(e);
// });



function isEmptyObject(obj){
    for(var key in obj){
        return false;
    }
    return true;
}



//对所有的请求开启跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


//去空格函数
function removeAllSpace(str) {
    return str.replace(/\s+/g, "");
}


//根据表单数据创建一个新合同
app.post('/addContract', urlencodedParser, function (req, res){

    console.log(req.body)

    var con = {};

    con.ContractNO = req.body.aContractNO;
    con.ProjectName = req.body.aProjectName;
    con.Sign_Date = new Date(req.body.aSign_Date);
    con.ContractAmount = req.body.aContractAmount;
    con.Remark = req.body.aRemark;
    con.Operator = req.body.aOperator;
    con.WayOfEntrusting = req.body.aWayOfEntrusting;
    con.RelatedMaterials = req.body.aRelatedMaterials;
    con.Status = req.body.aContractStatus;
    con.Create_User = req.body.aCreate_User;

    var js = removeAllSpace(req.body.aJSDW);
    var sg = removeAllSpace(req.body.aSGDW);
    co(function* () {
        var jsdw = yield JSDW.find({
            where:{
                Name:{
                    [Op.eq]: js
                }
            }
        })

        var sgdw = yield SGDW.find({
            where: {
                Name: {
                    [Op.eq]: sg
                }
            }
        })

        if(jsdw == null) {
            jsdw = yield JSDW.create({ Name: js})
        }

        if(sgdw == null) {
            sgdw = yield SGDW.create({ Name: sg})
        }

        var con0 = yield Contract.create(con);

        console.log(con0)

        yield con0.setSGDW(sgdw);
        yield con0.setJSDW(jsdw);

        res.send('ok')


    }).catch(function (e) {
        console.log(e);
        res.send("发生错误！")
    });

})


//根据表单数据修改一个合同
app.post('/editContract',urlencodedParser,function(req,res){



    var con = {};
    con.ContractNO = req.body.eContractNO;
    con.ProjectName = req.body.eProjectName;
    con.Sign_Date = new Date(req.body.eSign_Date);
    con.ContractAmount = req.body.eContractAmount;
    con.Remark = req.body.eRemark;
    con.Operator = req.body.eOperator;
    con.WayOfEntrusting = req.body.eWayOfEntrusting;
    con.RelatedMaterials = req.body.eRelatedMaterials;
    con.Status = req.body.eContractStatus;
    con.Modify_User = req.body.Modify_User;


    var eId = parseInt(req.body.eId);
    var js = removeAllSpace(req.body.eJSDW);
    var sg = removeAllSpace(req.body.eSGDW);


    co(function* () {
        var jsdw = yield JSDW.find({
            where: {
                Name: {
                    [Op.eq]: js
                }
            }
        })

        var sgdw = yield SGDW.find({
            where: {
                Name: {
                    [Op.eq]: sg
                }
            }
        })

        if (jsdw == null) {
            jsdw = yield JSDW.create({ Name: js })
        }

        if (sgdw == null) {
            sgdw = yield SGDW.create({ Name: sg })
        }

        yield Contract.update(con,{
            where:{
                id:{
                    [Op.eq]:eId
                }
            }
        })

        var newC = yield Contract.find({
            where:{
                id:{
                    [Op.eq]:eId
                }
            }
        })

        yield newC.setSGDW(sgdw);
        yield newC.setJSDW(jsdw);
        res.send('ok');
    }).catch(function (e) {
        res.send("发生错误！")
    });

})




//获取一个合同的详细信息，用于合同详情页面
app.post('/contract',function(req,res){

    var cId = req.query.cId;

    co(function* () {

        var c = yield Contract.find({
            where:{
                id:{
                    [Op.eq]: parseInt(cId)
                }
            },
            include:[JSDW,SGDW,PlanningOfPayment,RecordOfPayment]
        })

        c =  yield c.get({plain:true});

        c.createdAt = c.createdAt.toLocaleString();
        c.updatedAt = c.updatedAt.toLocaleString();

        res.send(c);

    }).catch(function (e) {
        console.log(e);
    });

})


//获取所有合同
app.get('/allContracts',function(req,res){

    co(function* () {

        var cons = yield Contract.findAll({
            order: [
                ['id', 'desc']
            ],
            include:[SGDW,JSDW,PlanningOfPayment,RecordOfPayment]
        });
        var cs = [];
        for (var i = 0; i < cons.length; i++) {
            cs[i] = yield cons[i].get({ plain: true });
            cs[i].Sign_Date = cs[i].Sign_Date.toLocaleString();
            cs[i].createdAt = cs[i].createdAt.toLocaleString();
            cs[i].updatedAt = cs[i].updatedAt.toLocaleString();

        }
        res.send(cs)

    }).catch(function (e) {
        console.log(e);
    });

})






//搜索所有满足条件的合同
app.post("/contracts", urlencodedParser, function (req, res){
    res.header("Access-Control-Allow-Origin", "*");

    var keys = req.body;


    if (!isEmptyObject(keys)){

        var sContractNO = keys.sContractNO;
        var sProjectName = keys.sProjectName;
        var sSGDW = keys.sSGDW;
        var sJSDW = keys.sJSDW;
        var sStatus = keys.sStatus;


        co(function* () {
            var cons = yield Contract.findAll({
                order:[
                    ['id','desc']
                ],
                include:
                [{
                    model: SGDW,
                    where: {
                        Name: {
                            [Op.like]: "%" + sSGDW + "%"
                        }
                    }
                },
                {
                    model:JSDW,
                    where:{
                        Name:{
                            [Op.like]: "%"+sJSDW+"%"
                        }
                    }
                },
                PlanningOfPayment,
                RecordOfPayment
                ],
                where: {
                    ContractNO: {
                        [Op.like]:"%"+sContractNO+"%"
                    },
                    ProjectName: {
                        [Op.like]: "%"+sProjectName+"%"
                    }

                }

            })

            var cs = [];

            for (var i = 0; i < cons.length; i++) {
                cs[i] = yield cons[i].get({ plain: true });
                cs[i].Sign_Date = cs[i].Sign_Date.toLocaleString();
                cs[i].createdAt = cs[i].createdAt.toLocaleString();
                cs[i].updatedAt = cs[i].updatedAt.toLocaleString();

            }
            res.send(cs)

        }).catch(function (e) {
            console.log(e);
        });

    }else{
        co(function* () {

            var cons = yield Contract.findAll({
                order: [
                    ['id', 'desc']
                ],
                include: [SGDW, JSDW,PlanningOfPayment,RecordOfPayment]
            });

            var cs = [];

            for (var i = 0; i < cons.length; i++) {
                cs[i] = yield cons[i].get({ plain: true })
            }

            res.send(cs);
        }).catch(function (e) {
            console.log(e);
        });
    }
})


//根据分类返回合同
app.post('/typeContracts', urlencodedParser ,function(req,res) {

    var type = req.body.type;
    var typev =  req.body.typev;



    if(type == 'status') {
        co(function* () {
            var cons = yield Contract.findAll({
                order: [
                    ['id', 'desc']
                ],
                include:
                    [{
                        model: SGDW
                    },
                    {
                        model: JSDW
                    },
                        PlanningOfPayment,
                        RecordOfPayment
                    ],
                where: {
                    Status: {
                        [Op.eq]: typev
                    }
                }

            })

            var cs = [];

            for (var i = 0; i < cons.length; i++) {
                cs[i] = yield cons[i].get({ plain: true });
                cs[i].Sign_Date = cs[i].Sign_Date.toLocaleString();
                cs[i].createdAt = cs[i].createdAt.toLocaleString();
                cs[i].updatedAt = cs[i].updatedAt.toLocaleString();

            }
            res.send(cs)

        }).catch(function (e) {
            console.log(e);
        });

    }

    if(type == 'year') {
        co(function* () {

            var year1 = new Date(req.body.year1);
            var year2 = new Date(req.body.year2);

            var cons = yield Contract.findAll({
                order: [
                    ['id', 'desc']
                ],
                include:
                    [{
                        model: SGDW
                    },
                    {
                        model: JSDW
                    },
                        PlanningOfPayment,
                        RecordOfPayment
                    ],
                where: {
                    Sign_Date: {
                        [Op.between]:[year1,year2]
                    }
                }

            })

            var cs = [];

            for (var i = 0; i < cons.length; i++) {
                cs[i] = yield cons[i].get({ plain: true });
                cs[i].Sign_Date = cs[i].Sign_Date.toLocaleString();
                cs[i].createdAt = cs[i].createdAt.toLocaleString();
                cs[i].updatedAt = cs[i].updatedAt.toLocaleString();

            }
            res.send(cs)

        }).catch(function (e) {
            console.log(e);
        });
    }

})



//删除合同
app.post("/delete",function (req, res){
    res.header("Access-Control-Allow-Origin", "*");


    var cID = req.query.cID;
    co(function* () {

            var deletedNum = yield Contract.destroy({
            where:{
                id:{
                    [Op.eq]: cID
                }
            }
            })

        if (deletedNum == 0 || deletedNum == undefined) {
            res.send("没有删除任何记录")
        } else {
            res.send("删除了该记录！");
        }
        }).catch(function (e) {
            console.log(e);
        });
})


//新增付款计划
app.post('/addPP',urlencodedParser,function(req,res){


    var p = req.body;
    var pp0 = {};
    var cId = p.cId;

    pp0.PlanningDate = new Date(p.aPlanningDate);
    pp0.PlanningAmount = parseFloat(p.aPlanningAmount);
    pp0.LinkMan = p.aPPLinkMan;
    pp0.PhoneNumber = p.aPPPhoneNumber;


    co(function* () {

        var pp1 = yield PlanningOfPayment.create(pp0);

        var pc = yield Contract.find({
            where:{
                id:{
                    [Op.eq]:cId
                }
            }
        })

        yield pc.update({Modify_User:req.body.user})




        yield pp1.setContract(pc);

        res.send("ok")



    }).catch(function (e) {
        console.log(e);
    });

})


//修改付款计划
app.post('/editPP',urlencodedParser,function(req,res){


  var ePP = req.body;
  var pId = req.query.id;
  ePP.PlanningDate = new Date(ePP.PlanningDate);

  co(function* () {

    var u = yield PlanningOfPayment.update(ePP,{
      where:{
        id:{
          [Op.eq]:pId
        }
      }
    })

    yield Contract.update({Modify_User:req.body.user},{
      where:{
        id:{
          [Op.eq]:req.query.cId
        }
      }
    })


    res.send('ok');

    }).catch(function (e) {
        console.log(e);
        res.send("修改失败！");
    });

})

//删除付款计划
app.post('/dropPP',urlencodedParser,function(req,res) {
  var pId = req.query.id;
  co(function* () {

    var d = yield PlanningOfPayment.destroy({
      where:{
        id:{
          [Op.eq]:pId
        }
      }
    })

    yield Contract.update({Modify_User:req.body.user},{
      where:{
        id:{
          [Op.eq]:req.query.cId
        }
      }
    })

    if(d != 0){
      res.send('ok');
    }else{
      res.send('error')
    }

    }).catch(function (e) {
        console.log(e);
        res.send("删除失败！");
    });

})



//新增付款记录
app.post('/addRP',urlencodedParser,function(req,res){

  console.log(req.body);

  var rp0 = {};
  rp0.RecordDate = new Date(req.body.aRecordDate);
  rp0.RecordAmount = parseFloat(req.body.aRecordAmount);
  rp0.Operator = req.body.aRPOperator;

  var cId = req.body.cId;

  co(function* () {

    var r = yield RecordOfPayment.create(rp0);

    var c = yield Contract.find({
      where:{
        id:{
          [Op.eq]:cId
        }
      }
    })

    yield r.setContract(c);

    console.log("******************************"+req.query.user)
    console.log(req.body)

    yield Contract.update({Modify_User:req.body.user},{
      where:{
        id:{
          [Op.eq]:req.query.cId
        }
      }
    })



    res.send('ok');

  }).catch(function (e) {
      console.log(e);
      res.send("添加失败！");
  });

})

//修改付款记录
app.post('/editRP',urlencodedParser,function(req,res){

  var eRP = req.body;
  var pId = req.query.id;
  eRP.RecordDate = new Date(eRP.RecordDate);

  co(function* () {

    var u = yield RecordOfPayment.update(eRP,{
      where:{
        id:{
          [Op.eq]:pId
        }
      }
    })

    yield Contract.update({Modify_User:req.body.user},{
      where:{
        id:{
          [Op.eq]:req.query.cId
        }
      }
    })

    res.send('ok');

    }).catch(function (e) {
        console.log(e);
        res.send("修改失败！");
    });



})


//删除付款记录
app.post('/dropRP',urlencodedParser,function(req,res){

  var pId = req.query.id;
  co(function* () {

    var d = yield RecordOfPayment.destroy({
      where:{
        id:{
          [Op.eq]:pId
        }
      }
    })

    yield Contract.update({Modify_User:req.body.user},{
      where:{
        id:{
          [Op.eq]:req.query.cId
        }
      }
    })

    if(d != 0){
      res.send('ok');
    }else{
      res.send('error')
    }

    }).catch(function (e) {
        console.log(e);
        res.send("删除失败！");
    });
})




//获取所有施工单位的名字，用于输入提示
app.get('/sgdw', function (req, res) {

    co(function* () {

        var sgdws = yield SGDW.findAll();
        var names = "";

        for (var i = 0; i < sgdws.length; i++) {
            var sg = yield sgdws[i].get({ plain: true });
            names += sg.Name+",";
        }

        names = names.substring(0,names.length-1)

        console.log(names)
        console.log(typeof (names))
        res.send(names)

    }).catch(function (e) {
        console.log(e);
    });
})

//获取所有建设单位的名字，用于输入提示
app.get('/jsdw', function (req, res) {

    co(function* () {

        var jsdws = yield JSDW.findAll();
        var names = "";

        for (var i = 0; i < jsdws.length; i++) {
            var sg = yield jsdws[i].get({ plain: true });
            names += sg.Name+",";
        }
        names = names.substring(0, names.length - 1)

        console.log(names)
        console.log(typeof(names))
        res.send(names)

    }).catch(function (e) {
        console.log(e);
    });
})






//用express托管public文件下的pdf文件，供前端调用显示pdf
app.use(express.static('public'))


//上传pdf文件
app.post('/uploadPdf',function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            res.send("怎么回事？pdf文件上传失败！");
        }else{
            res.send("太棒了！pdf文件上传成功！")

            co(function* () {

              yield Contract.update({HasPDF:1},{
                where:{
                  ContractNO:{
                    [Op.eq]:req.file.filename.split(".")[0]
                  }
                }
              })

              yield Pdf.create({ FileName: req.file.filename.split(".")[0]})


            }).catch(function (e) {
                console.log(e);
            });

        }

    })


})

//检查与合同编号对应的pdf文件是否已经上传
app.post('/getPDF',function(req,res) {

    var FileName = req.query.FileName;

    co(function* () {

        var n = yield Pdf.count({
            where:{
                FileName:{
                    [Op.eq]:FileName
                }
            }
        })

        if(n == 0) {
            res.send('no');
        }else{
            res.send('yes');
        }

    }).catch(function (e) {
        console.log(e);
    });
    

})


app.post('/login',function(req,res){


    var UserName = req.query.userName;
    var Password = req.query.password;
    
    co(function* () {

        yield User.create({UserName:UserName,Password:Password,RealName:"周乃翔",Role:"admin"})


       var user = yield User.find({
            where:{
                UserName:{
                    [Op.eq]:UserName
                },
                Password:{
                    [Op.eq]:Password
                }
            }
        })

        res.send(user);


    }).catch(function (e) {
        console.log(e);
    });
    



})


app.listen(3000)
