'use strict';

var express = require('express');
var config    = require(__dirname + '/config/default.json');
var bodyParser = require('body-parser');
var path = require('path');
var jwt= require("jsonwebtoken");
var app = express();
var logger = require('express-logger');
app.use(logger({path: "./logs/logfile.log"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to check login
app.use(function (req, res, next) {
    var excludedRoutes = config.excludedRoutes,
        token;
    if (excludedRoutes.indexOf(req.path) === -1) {
        token = req.headers.token || req.body.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config.JWTSECRET, function (err, decoded) {
                if (err) {
                    res.status(403).send({ error: "Looks like you are logged out, log in again." });
                } else {
                    req.decoded = decoded;
                    req.user = decoded;
                    next();
                }
            });
        } else {
            res.status(403).send({ error: "no token" });
        }
    } else {
        next();
    }
});

app.get('/', function(req, res) {
    res.status(200).send({Message: "Demo APIs"});
});

var controllers = require('./controllers');
var models = require('./models');
require('./routes')(app, controllers, models);

var server = app.listen(config.PORT, function(err) {
    if (err) throw err;
    console.log('App is listening on port %s', config.PORT);
});


