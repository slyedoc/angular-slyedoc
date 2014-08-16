module.exports = function (grunt) {
    "use strict";
    grunt.initConfig({
        bump: {
            options: {
                files: ['package.json'],
                commit: false,
                push: false
            }
        },

        release: {
            options: {
                github: {
                    repo: 'slyedoc/angular-seed', //put your user/repo here
                    usernameVar: 'GITHUB_USERNAME', //ENVIRONMENT VARIABLE that contains Github username
                    passwordVar: 'GITHUB_PASSWORD' //ENVIRONMENT VARIABLE that contains Github password
                }
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
