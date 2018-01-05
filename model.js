var SequelizeAuto = require('sequelize-auto')
var auto = new SequelizeAuto('Silverlight_NETDA', 'sa', 'Luoyuxiang61.', {
    host: 'localhost',
    dialect: 'mssql',
    directory: false, // prevents the program from writing to disk
    port: '1433',
    additional: {
        timestamps: false
    },
    tables: ['BaseLayerField']
})

auto.run(function (err) {
    if (err) throw err;

    console.log(auto.tables); // table list
    console.log(auto.foreignKeys); // foreign key list
});


