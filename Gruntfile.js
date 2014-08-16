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
    grunt.loadNpmTasks('grunt-release');

    // Default task(s).
    grunt.registerTask('default', [
        'release:patch'
    ]);
}
