'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var angularUtils = require('../util.js');

var FactoryGenerator = yeoman.generators.NamedBase.extend({
    generateService: function(){

        angularUtils.setupJS(this, 'factory');
    }
});

module.exports = FactoryGenerator;