


const Sequelize = require('sequelize');
const sequelize = new Sequelize('ContractManagement', 'sa', 'Luoyuxiang61.', {
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


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


//用户Model
const User = sequelize.define('User',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    UserName: Sequelize.STRING,
    Password: Sequelize.STRING,
    RealName: Sequelize.STRING,
    Department: Sequelize.STRING
},
{
    timestamps: false,
    tableName:'User'
})

//合同Model
const Contract = sequelize.define('Contract',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    SGDWID: Sequelize.INTEGER,
    ProjectName: Sequelize.STRING,
    JSDWID: Sequelize.INTEGER,
    Sign_Date:Sequelize.DATEONLY,
    ContractNO: Sequelize.STRING,
    ContractAmount:Sequelize.DECIMAL(10,4),
    AmountPaid: Sequelize.DECIMAL(10, 4),
    Remark:Sequelize.STRING,
    Operator:Sequelize.STRING,
    WayOfEntrusting:Sequelize.STRING,
    RelatedMaterials:Sequelize.STRING,
    ContractType:Sequelize.STRING,
    Start_Date:Sequelize.DATEONLY,
    End_Date:Sequelize.DATEONLY,
    Create_Date:Sequelize.DATEONLY,
    Create_User:Sequelize.STRING,
    Modify_Date:Sequelize.DATEONLY,
    Modify_User:Sequelize.STRING,
    DeleteFlag:Sequelize.INTEGER,
    Status:Sequelize.STRING
},
{
    timestamps: false,
    tableName:'Contract'
})


//建设单位Model
const JSDW = sequelize.define('JSDW',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    Name: Sequelize.STRING,
    Address: Sequelize.STRING,
    Email: Sequelize.STRING,
    LinkMan: Sequelize.STRING,
    PhoneNumber:Sequelize.STRING
},
{
    timestamps: false,
    tableName:'JSDW'
})

//施工单位Model
const SGDW = sequelize.define('SGDW',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    Name: Sequelize.STRING,
    Address: Sequelize.STRING,
    Email: Sequelize.STRING,
    LinkMan: Sequelize.STRING,
    PhoneNumber:Sequelize.STRING
},
{
    timestamps: false,
    tableName:'SGDW'
})

//付款计划Model
const PlanningOfPayment = sequelize.define('PlanningOfPayment',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    ContractId: Sequelize.INTEGER,
    PlanningDate: Sequelize.DATEONLY,
    PlanningAmount: Sequelize.NUMERIC(10,4),
    LinkMan: Sequelize.STRING,
    PhoneNumber:Sequelize.STRING
},
{
    timestamps: false,
    tableName:'PlanningOfPayment'
})


//付款记录Model
const RecordOfPayment = sequelize.define('RecordOfPayment',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    ContractId: Sequelize.INTEGER,
    RecordDate: Sequelize.DATEONLY,
    RecordAmount: Sequelize.NUMERIC(10,4),
    Operator: Sequelize.STRING
},
{
    timestamps: false,
    tableName:'RecordOfPayment'
})







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




// JSDW.findAll().then(users => {
    
//     for(var i=0;i<users.length;i++){
//         console.log(users[i].dataValues)
//     }
// })






