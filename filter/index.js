'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var angularUtils = require('../util.js');

var FilterGenerator = yeoman.generators.NamedBase.extend({
    generateFilter: function(){
        angularUtils.setupJSandTest(this, 'filter');
    }


});

module.exports = FilterGenerator;