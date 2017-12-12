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
    tableName:'User'
})




for(var i = 0;i<20;i++){
    User.create({
        UserName:"skt"+i,
        Password:"kkk"+i,
        RealName:"faker"+i,
        Department:"department"+i
    })
}

// User.findAll().then(users => {
    
//     for(var i=0;i<users.length;i++){
//         console.log(users[i].dataValues)
//     }
// })






