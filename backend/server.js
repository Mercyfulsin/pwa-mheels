require("dotenv").config();
const express = require('express');
const { join } = require('path');
const morgan = require('morgan');
const { Sequelize } = require('sequelize');
const routes = require('./utils');
const app = express();
const db = require("./models");
const { auth } = require('express-openid-connect');
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: 'http://localhost:3000',
    clientID: '2wgaguNK0lohyLIC4I7rRzlYWhVMHv3W',
    issuerBaseURL: 'https://mercyfulsin.us.auth0.com'
  };
app.use(morgan('dev'));
app.use(express.static(join(__dirname,'../frontend/client/build')))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});


// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use(routes);
// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
    res.locals.user = req.oidc.user;
    next();
  });
  
// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  console.log(req.oidc.isAuthenticated());
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);