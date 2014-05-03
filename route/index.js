'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var angularUtils = require('../util.js');

var RouteGenerator = yeoman.generators.NamedBase.extend({
    generateRoute: function(){
        angularUtils.setupRoute(this, 'route');
    }
});

module.exports = RouteGenerator;