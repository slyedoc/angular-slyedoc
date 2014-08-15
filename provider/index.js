'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var angularUtils = require('../util.js');

var ProviderGenerator = yeoman.generators.NamedBase.extend({
    generateProvider: function(){

        angularUtils.setupJS(this, 'provider');
    }
});

module.exports = ProviderGenerator;