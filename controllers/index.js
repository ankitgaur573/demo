'use strict';

var path        = require('path');
var Controllers = require('require-dir')();
var _           = require('lodash');
var controllers = {};

Object.keys(Controllers).forEach(function(controller) {
  var cntrlName = _.startCase(path.basename(controller)).replace(/\s/, '');
  controllers[cntrlName] = Controllers[controller];
});

module.exports = controllers;
