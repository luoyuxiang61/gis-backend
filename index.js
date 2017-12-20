const express = require('express')
var app = express()
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

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
        allowNull:false
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
        allowNull: false
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
        allowNull: false
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








// }).catch(function (e) {
//     console.log(e);
// });









// co(function* () {





//     var sgdw = yield SGDW.create({
//         Name:"苏州市2号施工单位",
//         Address:"高新区科锐路2号",
//         Email:"sgdw@163.com",
//         LinkMan:"张连发",
//         PhoneNumber:"123232322"
//     })

//     var jsdw = yield JSDW.create({
//         Name: "苏州市2号建设单位",
//         Address: "虎丘区科锐路2号",
//         Email: "jsdw@163.com",
//         LinkMan: "李发财",
//         PhoneNumber: "123232322"
//     })





//     for(var i=0;i<150;i++){

//         var statusx="完成";
//         if(i%2==0)statusx="进行中";
//         if(i%3==0)statusx="超时未完成";
//         if(i%5==0)statusx="暂停";


//         var typex = "G";
//         if (i % 2 == 0)typex="H";
//         if (i % 5 == 0)typex="A";



//         var con = yield Contract.create({
//             ProjectName: "苏州吴中太湖新城市政基础设施工程中一路（中六路~塔韵路）、中二路（中六路~塔韵路）、中六路（友翔路~中二路）、中八路（友翔路~中三路）施工图设计",
//             Sign_Date: new Date(2006, 0, 12),
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


//根据表单数据创建一个新合同
app.post('/addContract', urlencodedParser, function (req, res){

    console.log(req.body)




})


//获取一个合同的详细信息，用于合同详情页面
app.post('/contract',function(req,res){

    var cNO = req.query.cNO;

    co(function* () {

        var c = yield Contract.findOne({
            where:{
                ContractNO:{
                    [Op.eq]:cNO
                }
            },
            include:[JSDW,SGDW]
        })

        c = c.get({plain:true});
        
        c.createdAt = c.createdAt.toLocaleString();
        c.updatedAt = c.updatedAt.toLocaleString();

        res.send(c);

    }).catch(function (e) {
        console.log(e);
    });

})





//获取所有合同
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
                }
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
                cs[i] = yield cons[i].get({ plain: true })
            }
            res.send(cs)

        }).catch(function (e) {
            console.log(e);
        });

    }else{
        co(function* () {

            var cons = yield Contract.findAll({
                include: [SGDW, JSDW]
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




//用express托管public文件下的pdf文件，供前端调用显示pdf
app.use(express.static('public'))


//上传pdf文件
app.post('/uploadPdf',  function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            res.send("怎么回事？pdf文件上传失败！");
        }else{

            res.send("太棒了！pdf文件上传成功！")
        }
       
    })


})


app.listen(3000)







