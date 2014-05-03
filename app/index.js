'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var Generator = module.exports = function Generator(args, options) {
    yeoman.generators.Base.apply(this, arguments);

    this.pkg = require('../package.json');

    this.on('end', function () {

        console.log("\nEnd !!!\n");
        this.installDependencies({
            skipInstall: this.options['skip-install'],
            callback: function () {
                console.log("\nInstall Dependencies Done\n");
            }
        });
    });

    this.pkg = require('../package.json');
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.promptUser = function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    var prompts = [
        {
            name: 'appName',
            message: 'What is your app\'s name ?'
        }
    ];

    this.prompt(prompts, function (props) {

        this.appName = props.appName;

        done();
    }.bind(this));
};

Generator.prototype.scaffoldFolders = function () {

    var context = {
        dasherizeName: this._.dasherize(this.appName).trim('-'),
        cameledName: this._.camelize(this.appName),
        classedName: this.generator._.classify(this.appName),
        site_name: this.appName
    };

    this.mkdir("app");
    this.copy("app.css", "app/app.css");
    this.copy("app.js", "app/app.js");
    this.copy("app-controller.js", "app/app-controller.js");
    this.template("index.html", "app/index.html", context);

    this.mkdir("app/home");
    this.copy("home/home.html", "app/home/home.html");
    this.copy("home/home-controller.js", "app/home/home-controller.js");
    this.copy("home/home-controller-test.js", "app/home/home-controller-test.js");

    this.mkdir("app/components");
    this.mkdir("app/components/nav");
    this.template("components/nav/nav.html", "app/components/nav/nav.html", context);
    this.copy("components/nav/nav-controller.js", "app/components/nav/nav-controller.js");
    this.copy("components/nav/nav-controller-test.js", "app/components/nav/nav-controller-test.js");
    //this.mkdir("e2e-tests");


    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');

    this.template("package.json", "package.json", context);
    this.template("bower.json", "bower.json", context);
    this.template("Gruntfile.js", "Gruntfile.js", context);

    this.template('karma.conf.js', 'karma.conf.js');
};


Generator.prototype.runNpm = function () {
    var done = this.async();
    this.npmInstall("", function () {
        console.log("\nEverything Setup !!!\n");
        done();
    });
};