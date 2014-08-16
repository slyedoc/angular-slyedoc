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
        classedName: this._.classify(this.appName),
        site_name: this.appName
    };

    this.mkdir("app");
    this.copy("app/app.css", "app/app.css");
    this.copy("app/app.js", "app/app.js");
    this.copy("app/app-controller.js", "app/app-controller.js");
    this.template("app/favicon.ico", "app/favicon.ico", context);
    this.template("app/index.html", "app/index.html", context);

    this.mkdir("app/home");
    this.copy("app/home/home.html", "app/home/home.html");
    this.copy("app/home/home-controller.js", "app/home/home-controller.js");
    this.copy("app/home/home-controller-test.js", "app/home/home-controller-test.js");

    this.mkdir("app/components");
    this.mkdir("app/components/nav");
    this.template("app/components/nav/nav.html", "app/components/nav/nav.html", context);
    this.copy("app/components/nav/nav-controller.js", "app/components/nav/nav-controller.js");
    this.copy("app/components/nav/nav-controller-test.js", "app/components/nav/nav-controller-test.js");

    this.mkdir("test");
    this.template('test/karma.conf.js', 'test/karma.conf.js', context);
    this.template('test/protractor-conf.js', 'test/protractor-conf.js', context);

    this.mkdir("test/e2e");

    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('bowerrc', '.bowerrc');

    this.template("package.json", "package.json", context);
    this.template("bower.json", "bower.json", context);
    this.template("Gruntfile.js", "Gruntfile.js", context);


};


Generator.prototype.runNpm = function () {
    var done = this.async();
    this.npmInstall("", function () {
        console.log("\nEverything Setup !!!\n");
        done();
    });
};