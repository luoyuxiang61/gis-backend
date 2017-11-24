const express = require('express')
var bodyParser = require('body-parser')
var app = express();

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })



app.post('/',urlencodedParser,function(req,res){



  if(!req.body) res.send(400);
  console.log("hahaha success!");
  console.log(req.body);

  res.header("Access-Control-Allow-Origin", "*");
  
  
  res.send("成功！");
})


app.put('/api',function(){

  res.header("Access-Control-Allow-Origin", "*");
  res.send("111111");
  console.log("hhhhhh");
})

app.listen(3000);
