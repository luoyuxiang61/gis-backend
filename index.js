const express = require('express')
var bodyParser = require('body-parser')
var app = express();

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
