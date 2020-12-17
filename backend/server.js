require("dotenv").config();
const express = require('express');
const { join } = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const sequelize = require('sequelize');
const routes = require('./utils');
const app = express();

app.use(morgan('dev'));
app.use(express.static(join(__dirname,'../frontend/client/build')))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(routes);

mon