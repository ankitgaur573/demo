'use strict';

var path   = require('path');
var Routes = require('require-dir')();

module.exports = function(app, cntrls, models) {
  Object.keys(Routes).forEach(function(route) {
    app.use('/' + route, Routes[route](cntrls, models));
  });
};
