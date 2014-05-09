module.exports = function (grunt) {
    "use strict";
    grunt.initConfig({
        bump: {
            options: {
                files: ['package.json'],
                commit: false,
                push: false
            }
        }
    });
    grunt.loadNpmTasks('grunt-bump');

}
