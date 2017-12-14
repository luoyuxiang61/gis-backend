const express = require('express')
var app = express()
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const Sequelize = require('sequelize');
const sequelize = new Sequelize('Contract', 'sa', 'Luoyuxiang61.', {
    host: 'localhost',
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
const { gt, lte, ne, in: opIn } = Sequelize.Op;
const Op = Sequelize.Op;


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
        type:Sequelize.DATEONLY,
        allowNull:false
    },
    PlanningAmount: {
        type: Sequelize.NUMERIC(10, 4),
        allowNull:false
    },
    LinkMan: {
        type: Sequelize.STRING,
        allowNull:false
    },
    PhoneNumber: {
        type: Sequelize.STRING,
        allowNull:false
    }
},
    {
        tableName: 'PlanningOfPayment',
        paranoid: true
    })


//付款记录Model
const RecordOfPayment = sequelize.define('RecordOfPayment', {
    RecordDate: {
        type:Sequelize.DATEONLY,
        allowNull:false
    },
    RecordAmount: {
        type: Sequelize.NUMERIC(10, 4),
        allowNull:false
    },
    Operator: {
        type: Sequelize.STRING,
        allowNull:false
    }
},
    {
        tableName: 'RecordOfPayment',
        paranoid: true
    })



sequelize.sync({force:true}).then(() => {
    console.log("艰苦成功")
})




// Contract.update({ProjectName:"太湖新城一个工程一个工程一个工程"},{
//     where:{
//         id:{
//             [gt]:0
//         }
//     }
// })















// app.get("/contracts", urlencodedParser, function (req, res) {
//     res.header("Access-Control-Allow-Origin", "*");


//     var contracts = [];
//     Contract.findAll().then(results => {
//         for (var i = 0; i < results.length; i++) {

//             contracts[i] = results[i].dataValues;
//             contracts[i].SGDWID = "苏州市某个某个某个施工单位";
//             contracts[i].JSDWID = "苏州市一个一个一个一个建设单位";
//             contracts[i].ProjectName = "苏州轨道交通四号线支线溪霞路站配套地下空间1、2号出入口坡道及友翔路综合管廊K1+185~K1+360段基坑围护设计";
//             if (i < 50) {
//                 contracts[i].JSDWID = "苏州市一个一个一个一个建设单位苏州市一个一个一个一个建设单位苏州市一个一个一个一个建设单位";
//             }

//             contracts[i].ContractNO = "H044(G17-239)";
//         }
//         res.send(contracts)
//     })
// })

// app.listen(3000)






// for(var i = 0;i<100;i++){
//     Contract.create({
//         SGDWID:i,
//         ProjectName:"工程"+i,
//         JSDWID:i,
//         Sign_Date:new Date(),
//         ContractNO:"合同编号"+i,
//         ContractAmount:213.2343+i*33.7,
//         AmountPaid:34.653+i*22.6,
//         Remark:"备注xxx",
//         Operator:"经办人"+i,
//         WayOfEntrusting:"上会直接委托",
//         RelatedMaterials:"合同预审表，吴太办纪（2017）9号",
//         ContractType:"G类型合同",
//         Start_Date:new Date(),
//         End_Date:new Date(),
//         Create_Date:new Date(),
//         Create_User:"用户"+i,
//         Modify_Date:new Date(),
//         Modify_User:"用户"+i,
//         DeleteFlag:0,
//         Status:"进行中"
//     })
// }