'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var angularUtils = require('../util.js');

var ControllerGenerator = yeoman.generators.NamedBase.extend({
    generateController: function(){

        console.log(this.name);
        angularUtils.setupJSandTest(this, 'controller');
        angularUtils.setupHtml(this, 'controller');

    }
});

module.exports = ControllerGenerator;