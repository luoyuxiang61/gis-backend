const layerRoute = require('./route/layerRoute').layerRoute
const commonRoute = require('./route/commonRoute').commonRoute
const fieldRoute = require('./route/fieldRoute').fieldRoute
const resourceRoute = require('./route/resourceRoute').resourceRoute
const sequelize = require('./db').sequelize

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded()



sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())



commonRoute(app)
layerRoute(app)
fieldRoute(app)
resourceRoute(app)


app.listen(3000)