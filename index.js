import { setTimeout } from 'timers';

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

app.get('/test',urlencodedParser,function(req,res){


  


  res.header("Access-Control-Allow-Origin", "*");
  res.send("test");


})



app.listen(3000);
