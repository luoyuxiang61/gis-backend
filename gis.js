const express = require('express')
var bodyParser = require('body-parser')
var app = express();

var Connection = require('tedious').Connection;  
var config = {  
    userName: 'sa',  
    password: 'Luoyuxiang61.',  
    server: 'localhost',  
    // When you connect to Azure SQL Database, you need these next options.  
    options: {database: 'Silverlight_SND'}  
};  
var connection = new Connection(config);  
connection.on('connect', function(err) {  
    // If no error, then good to proceed.  
    console.log("Connected");  
     
});  

var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  


// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })



app.post('/',urlencodedParser,function(req,res){



  if(!req.body) res.sendStatus(400);
  console.log("hahaha success!");
  console.log(req.body);

  res.header("Access-Control-Allow-Origin", "*");
  
  
  res.sendStatus(200);
})

app.post('/test',urlencodedParser,function(req,res){
  res.header("Access-Control-Allow-Origin", "*");

  var username = req.body.username;
  var password = req.body.password;
  console.log(req.body);

  res.send("test");

})


app.get('/myLayers',urlencodedParser,function(req,res){

  res.header("Access-Control-Allow-Origin", "*");

  request = new Request("SELECT * FROM BaseMapLayer;", function(err) {  
    if (err) {  
        console.log(err);}  
    });

    var myLayers = [];
    



    request.on('row', function(columns) { 
        var layer = {}; 
        columns.forEach(function(column) { 
           
          // if (column.value === null) {  
          //   console.log('NULL');  
          // } else {  
          //   result+= column.value + " ";  
          // }
          layer[column.metadata.colName] = column.value; 
          
          
        });  
        // console.log(layer);
        myLayers[myLayers.length] = layer;
    });

    
    
    request.on('doneProc', function (rowCount, more, rows) { 
      
      
            // console.log(myLayers);
            res.send(myLayers);
          });



    connection.execSql(request);


    
    // res.sendStatus(200);

})


app.listen(3000);
