const express = require('express')
var bodyParser = require('body-parser')
var app = express();
var Connection = require('tedious').Connection;
var config = {
  userName:'sa',
  password:'Luoyuxiang61.',
  server:'localhost',
  options:{database:'Silverlight_NETDA'} 
}
var connection = new Connection(config);
connection.on('connect',function(err){
  if(err) console.log('err!');
  console.log("connected");
  executeStatement();
})

var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  

function executeStatement() {  
    request = new Request("SELECT * FROM  dbo.BaseDictionary;", function(err) {  
    if (err) {  
        console.log(err);}  
    });  
    var result = "";  
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {  
            console.log('NULL');  
          } else {  
            result+= column.value + " ";  
          }  
        });  
        console.log(result);  
        result ="";  
    });  

    request.on('done', function(rowCount, more) {  
    console.log(rowCount + ' rows returned');  
    });  
    connection.execSql(request);  
} 


















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



app.listen(3000);
