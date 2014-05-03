'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var angularUtils = require('../util.js');


var ServiceGenerator = yeoman.generators.NamedBase.extend({
    generateService: function(){

        angularUtils.setupJSandTest(this, 'service');
    }
});

module.exports = ServiceGenerator;