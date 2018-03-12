const funRoute = require('./route/FunRoute').funRoute;
const layerRoute = require('./route/layerRoute').layerRoute;
const commonRoute = require('./route/commonRoute').commonRoute;
const fieldRoute = require('./route/fieldRoute').fieldRoute;
const otherRoute = require('./route/otherRoute').resourceRoute;
const quanxianRoute = require('./route/quanxianRoute').quanxianRoute;
const deviceRoute = require('./route/deviceRoute').deviceRoute
const sequelize = require('./resource/resource').sequelize;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));


commonRoute(app);
layerRoute(app);
fieldRoute(app);
otherRoute(app);
quanxianRoute(app);
funRoute(app);
deviceRoute(app);


app.listen(3000);
