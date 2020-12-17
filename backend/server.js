require("dotenv").config();
const express = require('express');
const { join } = require('path');
const morgan = require('morgan');
const { Sequelize } = require('sequelize');
const routes = require('./utils');
const app = express();

app.use(morgan('dev'));
app.use(express.static(join(__dirname,'../frontend/client/build')))
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);
const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

// // Method 1
// const sequelize = new Sequelize(process.env.MYSQL);
// // Method 2
// const sequelize2 = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
//     host: process.env.HOST,
//     dialect: 'mysql'
// });
// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }
// try {
//     await sequelize2.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }