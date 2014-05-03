'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var angularUtils = require('../util.js');

var DirectiveGenerator = yeoman.generators.NamedBase.extend({
    generateDirective: function(){

        angularUtils.setupJSandTest(this, 'directive');

    }
});

module.exports = DirectiveGenerator;