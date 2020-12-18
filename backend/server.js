require("dotenv").config();
const express = require('express');
const { join } = require('path');
const morgan = require('morgan');
const { Sequelize } = require('sequelize');
const routes = require('./utils');
const app = express();
const db = require("./models");

app.use(morgan('dev'));
app.use(express.static(join(__dirname,'../frontend/client/build')))
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);